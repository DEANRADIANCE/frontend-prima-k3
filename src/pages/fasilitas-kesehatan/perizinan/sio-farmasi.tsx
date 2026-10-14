import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Tag,
  Button,
  Space,
  Descriptions,
  Image,
  Modal,
  Form,
  Input,
  Upload,
  message,
  theme,
} from "antd";
import {
  FileProtectOutlined,
  EditOutlined,
  UploadOutlined,
  DownloadOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";
import { mockPerizinan } from "../../../providers/mock-data";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

export const SioFarmasiPage: React.FC = () => {
  const { token } = useToken();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [form] = Form.useForm();
  const izin = mockPerizinan.find((p) => p.id === "sio-farmasi")!;

  const handleSave = (_values: any) => {
    message.success("Dokumen SIO Farmasi Klinik Pratama ANRI berhasil diperbarui!");
    setIsUpdateOpen(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Space>
        <Link to="/fasilitas-kesehatan/perizinan">
          <Button icon={<ArrowLeftOutlined />}>Kembali ke Menu Perizinan</Button>
        </Link>
      </Space>

      <Card style={{ borderRadius: 14 }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
          <Col>
            <Space align="center">
              <FileProtectOutlined style={{ color: "#0284C7", fontSize: 24 }} />
              <div>
                <Title level={3} style={{ margin: 0 }}>
                  Surat Izin Operasional (SIO) Instalasi Farmasi
                </Title>
                <Text type="secondary">Legalitas Penyelenggaraan Pelayanan Kefarmasian ANRI</Text>
              </div>
            </Space>
          </Col>
          <Col>
            <Space>
              <Button
                icon={<DownloadOutlined />}
                onClick={() => message.success("Dokumen SIO Farmasi berhasil diunduh.")}
              >
                Unduh PDF
              </Button>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  form.setFieldsValue(izin);
                  setIsUpdateOpen(true);
                }}
                style={{ backgroundColor: token.colorPrimary }}
              >
                Perbarui Dokumen
              </Button>
            </Space>
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12} style={{ textAlign: "center" }}>
            <Image
              src={izin.dokumen_url}
              alt="Dokumen SIO Farmasi"
              style={{
                borderRadius: 10,
                maxHeight: 520,
                width: "100%",
                objectFit: "contain",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              }}
            />
            <Text type="secondary" style={{ display: "block", marginTop: 10, fontSize: 12 }}>
              Klik gambar dokumen di atas untuk memperbesar (Full Preview Lightbox)
            </Text>
          </Col>

          <Col xs={24} lg={12}>
            <Descriptions bordered column={1} size="middle" title="Rincian Legalitas Berkas Farmasi">
              <Descriptions.Item label="Status Dokumen">
                <Tag color="green" style={{ fontSize: 13, padding: "2px 10px" }}>
                  {izin.status} (Izin Dinas Kesehatan DKI Jakarta)
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Nomor Izin">{izin.nomor_izin}</Descriptions.Item>
              <Descriptions.Item label="Masa Berlaku">{izin.masa_berlaku}</Descriptions.Item>
              <Descriptions.Item label="Jenis Fasilitas">{izin.jenis_fasilitas}</Descriptions.Item>
              <Descriptions.Item label="Lokasi Penyelenggaraan">{izin.lokasi}</Descriptions.Item>
              <Descriptions.Item label="Penanggung Jawab Kefarmasian">
                {izin.penanggung_jawab}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      {/* Modal Memperbarui Dokumen */}
      <Modal
        title="Memperbarui Dokumen: SIO Farmasi"
        open={isUpdateOpen}
        onCancel={() => setIsUpdateOpen(false)}
        footer={null}
        width={600}
        centered
      >
        <Form form={form} layout="vertical" onFinish={handleSave} style={{ marginTop: 16 }}>
          <Form.Item label="Upload Dokumen Baru">
            <Upload maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Pilih File PDF/JPG Baru</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Nomor Izin" name="nomor_izin" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Masa Berlaku" name="masa_berlaku" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Jenis Fasilitas" name="jenis_fasilitas">
            <Input />
          </Form.Item>
          <Form.Item label="Lokasi" name="lokasi">
            <Input />
          </Form.Item>
          <Form.Item label="Penanggung Jawab" name="penanggung_jawab">
            <Input />
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
            <Button onClick={() => setIsUpdateOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: token.colorPrimary }}>
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
