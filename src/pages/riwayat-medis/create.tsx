import React from "react";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, Row, Col, Card } from "antd";
import { useList } from "@refinedev/core";
import type { IPasien } from "../../providers/mock-data";

export const RiwayatMedisCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm();
  const { result } = useList<IPasien>({
    resource: "pasien",
  });

  const pasienList = result?.data || [];

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title="Catat Riwayat Kunjungan Medis Baru"
    >
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          no_rm: `RM-2026-${Math.floor(100 + Math.random() * 900)}`,
          tanggal_periksa: new Date().toISOString().split("T")[0],
          dokter: "dr. Hendra Pratama, Sp.Ok",
          status: "Selesai",
        }}
        onValuesChange={(changedValues: any) => {
          if (changedValues.pasien_id) {
            const selected = pasienList.find((p: IPasien) => p.id === changedValues.pasien_id);
            if (selected) {
              formProps.form?.setFieldsValue({
                nama_pasien: selected.nama_lengkap,
                nip: selected.nip,
                departemen: selected.departemen,
              });
            }
          }
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Nomor Rekam Medis (No RM)"
              name="no_rm"
              rules={[{ required: true, message: "Nomor RM wajib diisi" }]}
            >
              <Input placeholder="Contoh: RM-2026-006" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Tanggal Pemeriksaan"
              name="tanggal_periksa"
              rules={[{ required: true, message: "Pilih tanggal pemeriksaan" }]}
            >
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Dokter Pemeriksa"
              name="dokter"
              rules={[{ required: true, message: "Nama dokter wajib diisi" }]}
            >
              <Select
                options={[
                  { value: "dr. Hendra Pratama, Sp.Ok", label: "dr. Hendra Pratama, Sp.Ok" },
                  { value: "dr. Nurul Aisyah", label: "dr. Nurul Aisyah" },
                  { value: "dr. Wijaya Kusuma, Sp.PD", label: "dr. Wijaya Kusuma, Sp.PD" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Card title="Identitas Pasien Karyawan" size="small" style={{ marginBottom: 16 }}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Pilih Pasien / Karyawan"
                name="pasien_id"
                rules={[{ required: true, message: "Pilih pasien" }]}
              >
                <Select
                  placeholder="Cari nama karyawan atau NIP"
                  options={pasienList.map((p: IPasien) => ({
                    value: p.id,
                    label: `${p.nama_lengkap} (${p.nip}) - ${p.departemen}`,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="Nama Lengkap"
                name="nama_pasien"
                rules={[{ required: true, message: "Nama wajib diisi" }]}
              >
                <Input placeholder="Nama Pasien" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="Departemen / Divisi"
                name="departemen"
                rules={[{ required: true, message: "Departemen wajib diisi" }]}
              >
                <Input placeholder="Departemen" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="nip" hidden>
            <Input />
          </Form.Item>
        </Card>

        <Card title="Pemeriksaan Klinis & Tanda Vital" size="small" style={{ marginBottom: 16 }}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Tekanan Darah"
                name="tekanan_darah"
                rules={[{ required: true, message: "Tensi wajib diisi" }]}
              >
                <Input placeholder="Contoh: 120/80 mmHg" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Suhu Tubuh"
                name="suhu_tubuh"
                rules={[{ required: true, message: "Suhu wajib diisi" }]}
              >
                <Input placeholder="Contoh: 36.6 °C" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                label="Keluhan Utama / Anamnesa"
                name="keluhan"
                rules={[{ required: true, message: "Keluhan wajib diisi" }]}
              >
                <Input.TextArea rows={2} placeholder="Keluhan yang dirasakan saat tiba di klinik..." />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                label="Diagnosa Medis / Okupasi K3"
                name="diagnosa"
                rules={[{ required: true, message: "Diagnosa wajib diisi" }]}
              >
                <Input placeholder="Contoh: Hipotensi & Kelelahan Fisik, Dispepsia, LBP, dll" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Tindakan, Resep & Status" size="small">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Tindakan Medis / Perawatan" name="tindakan">
                <Input.TextArea rows={2} placeholder="Tindakan yang diberikan di klinik..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Resep Obat & Terapi" name="resep_obat">
                <Input.TextArea rows={2} placeholder="Resep obat dan instruksi konsumsi..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Status Akhir Kunjungan"
                name="status"
                rules={[{ required: true, message: "Pilih status" }]}
              >
                <Select
                  options={[
                    { value: "Selesai", label: "Selesai (Dapat Kembali Bekerja)" },
                    { value: "Istirahat Dokter", label: "Istirahat Dokter (Diberikan Surat Sakit)" },
                    { value: "Observasi", label: "Observasi Klinik (Pantau 1-3 Jam)" },
                    { value: "Rujukan", label: "Rujukan ke Rumah Sakit" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Create>
  );
};
