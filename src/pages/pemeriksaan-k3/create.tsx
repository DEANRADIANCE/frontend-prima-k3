import React from "react";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, Row, Col } from "antd";
import { useList } from "@refinedev/core";
import type { IPasien } from "../../providers/mock-data";

export const PemeriksaanK3Create: React.FC = () => {
  const { formProps, saveButtonProps } = useForm();
  const { result } = useList<IPasien>({
    resource: "pasien",
  });

  const pasienList = result?.data || [];

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title="Input Pemeriksaan MCU & Kebugaran Kerja (Fit to Work)"
    >
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          kode_mcu: `MCU-2026-${Math.floor(100 + Math.random() * 900)}`,
          tanggal_pemeriksaan: new Date().toISOString().split("T")[0],
          jenis_pemeriksaan: "MCU Berkala Tahunan",
          hasil_kebugaran: "Fit",
          dokter_penguji: "dr. Hendra Pratama, Sp.Ok",
        }}
        onValuesChange={(changed: any) => {
          if (changed.pasien_id) {
            const selected = pasienList.find((p: IPasien) => p.id === changed.pasien_id);
            if (selected) {
              formProps.form?.setFieldsValue({
                nama_pasien: selected.nama_lengkap || selected.nama || "",
                departemen: selected.departemen || selected.unit_kerja || "",
              });
            }
          }
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Kode Pemeriksaan MCU"
              name="kode_mcu"
              rules={[{ required: true }]}
            >
              <Input placeholder="Contoh: MCU-2026-090" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Tanggal Pemeriksaan"
              name="tanggal_pemeriksaan"
              rules={[{ required: true }]}
            >
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Dokter Penguji K3"
              name="dokter_penguji"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { value: "dr. Hendra Pratama, Sp.Ok", label: "dr. Hendra Pratama, Sp.Ok" },
                  { value: "dr. Nurul Aisyah", label: "dr. Nurul Aisyah" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Pilih Karyawan"
              name="pasien_id"
              rules={[{ required: true, message: "Pilih karyawan" }]}
            >
              <Select
                placeholder="Pilih nama karyawan..."
                options={pasienList.map((p: IPasien) => {
                  const nama = p.nama_lengkap || p.nama || "";
                  const dept = p.departemen || p.unit_kerja || "";
                  return {
                    value: p.id,
                    label: `${nama} (${p.nip})${dept ? ` - ${dept}` : ""}`,
                  };
                })}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Nama Lengkap" name="nama_pasien" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Departemen" name="departemen" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Jenis Pemeriksaan K3"
              name="jenis_pemeriksaan"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { value: "MCU Berkala Tahunan", label: "MCU Berkala Tahunan" },
                  { value: "Pemeriksaan Fit to Work", label: "Pemeriksaan Fit to Work (Kelayakan Tugas)" },
                  { value: "Pemeriksaan Khusus Hazard", label: "Pemeriksaan Khusus Hazard (Bising, Kimia, Ergonomi)" },
                  { value: "Pemeriksaan Pra-Kerja", label: "Pemeriksaan Pra-Kerja (Pre-Employment)" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Status Kebugaran Kerja (Fitness Status)"
              name="hasil_kebugaran"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { value: "Fit", label: "Fit to Work (Sehat Layak Kerja Tanpa Catatan)" },
                  { value: "Fit With Note", label: "Fit With Note (Layak Kerja dengan Penyesuaian/APD Khusus)" },
                  { value: "Temporary Unfit", label: "Temporary Unfit (Tidak Layak Sementara, Perlu Terapi/Istirahat)" },
                  { value: "Unfit", label: "Unfit (Tidak Layak untuk Pekerjaan Ini)" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label="Catatan Rekomendasi Medis & K3 Perusahaan"
              name="catatan_rekomendasi"
              rules={[{ required: true, message: "Rekomendasi wajib diisi" }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Rekomendasi teknis APD, batas angkat beban, lingkungan kerja, atau jadwal kontrol ulang..."
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Create>
  );
};
