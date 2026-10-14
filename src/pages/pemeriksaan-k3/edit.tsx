import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Row, Col } from "antd";

export const PemeriksaanK3Edit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      title="Edit Hasil Pemeriksaan Kebugaran (MCU)"
    >
      <Form {...formProps} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="Kode MCU" name="kode_mcu">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Nama Karyawan" name="nama_pasien">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Departemen" name="departemen">
              <Input disabled />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Tanggal Pemeriksaan" name="tanggal_pemeriksaan">
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Dokter Penguji" name="dokter_penguji">
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Jenis Pemeriksaan" name="jenis_pemeriksaan">
              <Select
                options={[
                  { value: "MCU Berkala Tahunan", label: "MCU Berkala Tahunan" },
                  { value: "Pemeriksaan Fit to Work", label: "Pemeriksaan Fit to Work" },
                  { value: "Pemeriksaan Khusus Hazard", label: "Pemeriksaan Khusus Hazard" },
                  { value: "Pemeriksaan Pra-Kerja", label: "Pemeriksaan Pra-Kerja" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Hasil Evaluasi Kebugaran"
              name="hasil_kebugaran"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { value: "Fit", label: "Fit to Work" },
                  { value: "Fit With Note", label: "Fit With Note" },
                  { value: "Temporary Unfit", label: "Temporary Unfit" },
                  { value: "Unfit", label: "Unfit" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label="Catatan & Rekomendasi K3"
              name="catatan_rekomendasi"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
