import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Row, Col, Card } from "antd";

export const RiwayatMedisEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps} title="Edit Catatan Riwayat Medis">
      <Form {...formProps} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="No. RM" name="no_rm">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Nama Pasien" name="nama_pasien">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Tanggal Periksa" name="tanggal_periksa">
              <Input type="date" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Tekanan Darah" name="tekanan_darah">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Suhu Tubuh" name="suhu_tubuh">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Keluhan Pasien" name="keluhan">
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Diagnosa Medis" name="diagnosa">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Tindakan Medis" name="tindakan">
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Resep Obat" name="resep_obat">
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Dokter Pemeriksa" name="dokter">
              <Select
                options={[
                  { value: "dr. Hendra Pratama, Sp.Ok", label: "dr. Hendra Pratama, Sp.Ok" },
                  { value: "dr. Nurul Aisyah", label: "dr. Nurul Aisyah" },
                  { value: "dr. Wijaya Kusuma, Sp.PD", label: "dr. Wijaya Kusuma, Sp.PD" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Status Kunjungan" name="status">
              <Select
                options={[
                  { value: "Selesai", label: "Selesai" },
                  { value: "Istirahat Dokter", label: "Istirahat Dokter" },
                  { value: "Observasi", label: "Observasi" },
                  { value: "Rujukan", label: "Rujukan" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
