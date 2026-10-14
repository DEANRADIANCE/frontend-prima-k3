import React from "react";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, Row, Col } from "antd";

export const PasienCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create
      saveButtonProps={saveButtonProps}
      title="Registrasi Karyawan / Pasien Baru"
    >
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          nip: `EMP-${Math.floor(202400 + Math.random() * 900)}`,
          status_kerja: "Aktif",
          jenis_kelamin: "Laki-laki",
          golongan_darah: "O",
          riwayat_alergi: "Tidak ada",
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Nomor Induk Karyawan (NIP)"
              name="nip"
              rules={[{ required: true, message: "NIP wajib diisi" }]}
            >
              <Input placeholder="Contoh: EMP-202406" />
            </Form.Item>
          </Col>
          <Col xs={24} md={16}>
            <Form.Item
              label="Nama Lengkap Karyawan"
              name="nama_lengkap"
              rules={[{ required: true, message: "Nama lengkap wajib diisi" }]}
            >
              <Input placeholder="Nama lengkap..." />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Departemen / Divisi"
              name="departemen"
              rules={[{ required: true, message: "Departemen wajib diisi" }]}
            >
              <Select
                options={[
                  { value: "Produksi Lapangan", label: "Produksi Lapangan" },
                  { value: "Quality Control", label: "Quality Control" },
                  { value: "Gudang & Logistik", label: "Gudang & Logistik" },
                  { value: "Maintenance & K3", label: "Maintenance & K3" },
                  { value: "Human Resources", label: "Human Resources" },
                  { value: "Engineering & IT", label: "Engineering & IT" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Posisi / Jabatan"
              name="posisi"
              rules={[{ required: true, message: "Posisi wajib diisi" }]}
            >
              <Input placeholder="Contoh: Operator, Teknisi, Staff..." />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Jenis Kelamin"
              name="jenis_kelamin"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { value: "Laki-laki", label: "Laki-laki" },
                  { value: "Perempuan", label: "Perempuan" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Tanggal Lahir"
              name="tanggal_lahir"
              rules={[{ required: true, message: "Tanggal lahir wajib diisi" }]}
            >
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Golongan Darah" name="golongan_darah">
              <Select
                options={[
                  { value: "A", label: "Golongan Darah A" },
                  { value: "B", label: "Golongan Darah B" },
                  { value: "AB", label: "Golongan Darah AB" },
                  { value: "O", label: "Golongan Darah O" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Kontak Telepon / WhatsApp" name="nomor_telepon">
              <Input placeholder="08xxxxxxxxxx" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Status Karyawan" name="status_kerja">
              <Select
                options={[
                  { value: "Aktif", label: "Aktif Bekerja" },
                  { value: "Cuti", label: "Sedang Cuti" },
                  { value: "Off", label: "Non-Aktif" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label="Riwayat Alergi Obat / Makanan / Lingkungan"
              name="riwayat_alergi"
            >
              <Input.TextArea
                rows={2}
                placeholder="Tuliskan riwayat alergi seperti obat penisilin, dingin, debu, dll..."
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Create>
  );
};
