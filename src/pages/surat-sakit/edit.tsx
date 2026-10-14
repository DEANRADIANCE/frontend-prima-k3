import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Row, Col, Card, Image, InputNumber, Typography, theme } from "antd";
import type { ISuratSakit } from "../../providers/mock-data";

const { Text } = Typography;
const { useToken } = theme;

export const SuratSakitEdit: React.FC = () => {
  const { token } = useToken();
  const { formProps, saveButtonProps, query } = useForm<ISuratSakit>();
  const record = query?.data?.data;

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      title="Verifikasi & Edit Surat Sakit Karyawan"
    >
      <Form {...formProps} layout="vertical">
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={14}>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item label="Nomor Surat" name="nomor_surat">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Nama Karyawan" name="nama_pasien">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Faskes Penerbit" name="faskes_penerbit">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item label="Nama Dokter" name="nama_dokter">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item label="Mulai Tanggal" name="tanggal_mulai">
                  <Input type="date" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item label="Sampai Tanggal" name="tanggal_selesai">
                  <Input type="date" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item label="Jumlah Hari" name="jumlah_hari">
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item label="Diagnosa" name="diagnosa">
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  label="Status Verifikasi HR & Tim K3"
                  name="status_verifikasi"
                  rules={[{ required: true }]}
                >
                  <Select
                    options={[
                      { value: "Disetujui", label: "Disetujui (Sah)" },
                      { value: "Menunggu Review", label: "Menunggu Review" },
                      { value: "Ditolak", label: "Ditolak (Tidak Memenuhi Syarat)" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item label="Catatan Verifikator K3" name="catatan">
                  <Input.TextArea rows={3} placeholder="Alasan persetujuan / penolakan..." />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col xs={24} lg={10}>
            <Card title="Berkas Surat Sakit yang Diunggah" size="small">
              {record?.file_url ? (
                <div style={{ textAlign: "center" }}>
                  <Image
                    src={record?.file_url}
                    alt="Berkas Surat Sakit"
                    style={{
                      maxHeight: 300,
                      objectFit: "contain",
                      borderRadius: 8,
                      border: `1px solid ${token.colorBorderSecondary}`,
                    }}
                  />
                </div>
              ) : (
                <Text type="secondary">Tidak ada berkas yang diunggah.</Text>
              )}
            </Card>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
