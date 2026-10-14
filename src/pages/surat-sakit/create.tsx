import React, { useState } from "react";
import { Create, useForm } from "@refinedev/antd";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Card,
  Upload,
  Image,
  InputNumber,
  Typography,
  message,
  theme,
} from "antd";
import {
  InboxOutlined,
} from "@ant-design/icons";
import { useList } from "@refinedev/core";
import type { IPasien } from "../../providers/mock-data";

const { Text } = Typography;
const { useToken } = theme;

const SAMPLE_IMAGES = [
  {
    label: "Contoh Foto Surat Sakit Klinik (Format 1)",
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Contoh Foto Surat Sakit Rumah Sakit (Format 2)",
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    label: "Contoh Foto Surat Keterangan Dokter (Format 3)",
    url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
  },
];

export const SuratSakitCreate: React.FC = () => {
  const { token } = useToken();
  const { formProps, saveButtonProps } = useForm();
  const { result } = useList<IPasien>({
    resource: "pasien",
  });

  const [uploadedPreview, setUploadedPreview] = useState<string>(
    SAMPLE_IMAGES[0].url
  );

  const pasienList = result?.data || [];

  const handleCustomUpload = (info: any) => {
    const file = info.file;
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setUploadedPreview(base64);
      formProps.form?.setFieldsValue({ file_url: base64 });
      message.success(`${file.name} berhasil diunggah.`);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const calculateDays = (startStr: string, endStr: string) => {
    if (!startStr || !endStr) return 1;
    const start = new Date(startStr);
    const end = new Date(endStr);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return isNaN(diffDays) ? 1 : diffDays;
  };

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title="Upload Surat Keterangan Sakit Karyawan"
    >
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          nomor_surat: `SKD/K3/2026/${Math.floor(100 + Math.random() * 900)}`,
          faskes_penerbit: "Klinik Prima K3",
          nama_dokter: "dr. Hendra Pratama, Sp.Ok",
          tanggal_mulai: new Date().toISOString().split("T")[0],
          tanggal_selesai: new Date().toISOString().split("T")[0],
          jumlah_hari: 1,
          status_verifikasi: "Menunggu Review",
          file_url: SAMPLE_IMAGES[0].url,
          uploaded_at: new Date().toLocaleString("id-ID"),
        }}
        onValuesChange={(changed: any, all: any) => {
          if (changed.pasien_id) {
            const selected = pasienList.find((p: IPasien) => p.id === changed.pasien_id);
            if (selected) {
              formProps.form?.setFieldsValue({
                nama_pasien: selected.nama_lengkap,
                nip: selected.nip,
                departemen: selected.departemen,
              });
            }
          }
          if (changed.tanggal_mulai || changed.tanggal_selesai) {
            const days = calculateDays(
              all?.tanggal_mulai || changed.tanggal_mulai,
              all?.tanggal_selesai || changed.tanggal_selesai
            );
            formProps.form?.setFieldsValue({ jumlah_hari: days });
          }
        }}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={14}>
            <Card title="Informasi Dokumen & Karyawan" size="small" style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Nomor Surat Keterangan Sakit"
                    name="nomor_surat"
                    rules={[{ required: true, message: "Nomor surat wajib diisi" }]}
                  >
                    <Input placeholder="Contoh: SKD/2026/045" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Pilih Karyawan"
                    name="pasien_id"
                    rules={[{ required: true, message: "Pilih nama karyawan" }]}
                  >
                    <Select
                      placeholder="Cari karyawan..."
                      options={pasienList.map((p: IPasien) => ({
                        value: p.id,
                        label: `${p.nama_lengkap} (${p.nip})`,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Nama Karyawan"
                    name="nama_pasien"
                    rules={[{ required: true, message: "Nama wajib diisi" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Departemen"
                    name="departemen"
                    rules={[{ required: true, message: "Departemen wajib diisi" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="nip" hidden>
                <Input />
              </Form.Item>
              <Form.Item name="uploaded_at" hidden>
                <Input />
              </Form.Item>
            </Card>

            <Card title="Fasilitas Kesehatan & Masa Istirahat" size="small">
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Faskes / Klinik / RS Penerbit"
                    name="faskes_penerbit"
                    rules={[{ required: true, message: "Faskes wajib diisi" }]}
                  >
                    <Input placeholder="Contoh: Klinik Prima K3 / RSUD" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Nama Dokter Penerbit"
                    name="nama_dokter"
                    rules={[{ required: true, message: "Dokter wajib diisi" }]}
                  >
                    <Input placeholder="Contoh: dr. Hendra Pratama, Sp.Ok" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    label="Mulai Tanggal"
                    name="tanggal_mulai"
                    rules={[{ required: true, message: "Tentukan tanggal mulai" }]}
                  >
                    <Input type="date" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    label="Sampai Tanggal"
                    name="tanggal_selesai"
                    rules={[{ required: true, message: "Tentukan tanggal selesai" }]}
                  >
                    <Input type="date" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    label="Durasi (Hari)"
                    name="jumlah_hari"
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={1} max={30} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label="Diagnosa Sakit"
                    name="diagnosa"
                    rules={[{ required: true, message: "Diagnosa wajib diisi" }]}
                  >
                    <Input placeholder="Contoh: Febris H-2 ec Susp Viral Infection" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Catatan Tambahan / Rekomendasi" name="catatan">
                    <Input.TextArea rows={2} placeholder="Keterangan tambahan atau anjuran istirahat..." />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Status Verifikasi K3/HR"
                    name="status_verifikasi"
                    rules={[{ required: true }]}
                  >
                    <Select
                      options={[
                        { value: "Menunggu Review", label: "Menunggu Review" },
                        { value: "Disetujui", label: "Disetujui (Sah)" },
                        { value: "Ditolak", label: "Ditolak (Tidak Sah)" },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Kolom Upload & Preview Dokumen */}
          <Col xs={24} lg={10}>
            <Card
              title="Unggah Berkas Fisik / Foto Surat Sakit"
              size="small"
              style={{ textAlign: "center" }}
            >
              <Upload.Dragger
                name="file"
                multiple={false}
                beforeUpload={handleCustomUpload}
                showUploadList={false}
                style={{ padding: 16, marginBottom: 16 }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ fontSize: 36, color: token.colorPrimary }} />
                </p>
                <p className="ant-upload-text" style={{ fontSize: 14 }}>
                  Klik atau Tarik file foto / scan surat sakit ke sini
                </p>
                <p className="ant-upload-hint" style={{ fontSize: 12 }}>
                  Mendukung file JPG, PNG, atau scan PDF. Maks 5MB.
                </p>
              </Upload.Dragger>

              <div style={{ marginBottom: 12, textAlign: "left" }}>
                <Text strong style={{ fontSize: 12, display: "block", marginBottom: 6 }}>
                  Atau gunakan template sampel untuk pengujian:
                </Text>
                <Select
                  style={{ width: "100%" }}
                  defaultValue={SAMPLE_IMAGES[0].url}
                  onChange={(val) => {
                    setUploadedPreview(val);
                    formProps.form?.setFieldsValue({ file_url: val });
                  }}
                  options={SAMPLE_IMAGES.map((img) => ({
                    value: img.url,
                    label: img.label,
                  }))}
                />
              </div>

              <Form.Item name="file_url" hidden>
                <Input />
              </Form.Item>

              <div style={{ marginTop: 16 }}>
                <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 8 }}>
                  Pratinjau Dokumen Terunggah:
                </Text>
                <Image
                  src={uploadedPreview}
                  alt="Preview Surat Sakit"
                  style={{
                    maxHeight: 260,
                    objectFit: "contain",
                    borderRadius: 8,
                    border: `1px solid ${token.colorBorderSecondary}`,
                  }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </Form>
    </Create>
  );
};
