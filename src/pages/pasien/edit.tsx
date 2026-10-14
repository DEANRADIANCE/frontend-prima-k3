import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Row, Col } from "antd";

export const PasienEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps} title="Edit Data Karyawan / Pasien">
      <Form {...formProps} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="NIP" name="nip">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={16}>
            <Form.Item
              label="Nama Lengkap"
              name="nama_lengkap"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Departemen" name="departemen">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Posisi / Jabatan" name="posisi">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Jenis Kelamin" name="jenis_kelamin">
              <Select
                options={[
                  { value: "Laki-laki", label: "Laki-laki" },
                  { value: "Perempuan", label: "Perempuan" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Tanggal Lahir" name="tanggal_lahir">
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
            <Form.Item label="Kontak Telepon" name="nomor_telepon">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Status Karyawan" name="status_kerja">
              <Select
                options={[
                  { value: "Aktif", label: "Aktif" },
                  { value: "Cuti", label: "Cuti" },
                  { value: "Off", label: "Off" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Riwayat Alergi" name="riwayat_alergi">
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
