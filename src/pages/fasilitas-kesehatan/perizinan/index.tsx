import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Tag,
  Button,
  Space,
  Modal,
  Descriptions,
  Image,
  theme,
  Upload,
  Form,
  Input,
  message,
} from "antd";
import {
  FileProtectOutlined,
  EyeOutlined,
  EditOutlined,
  TeamOutlined,
  UploadOutlined,
  CheckCircleFilled,
  RightOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import { mockPerizinan, type IPerizinanFaskes } from "../../../providers/mock-data";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

export const PerizinanPage: React.FC = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  const [detailModalItem, setDetailModalItem] = useState<IPerizinanFaskes | null>(null);
  const [updateModalItem, setUpdateModalItem] = useState<IPerizinanFaskes | null>(null);
  const [form] = Form.useForm();

  const klinikIzin = mockPerizinan.find((p) => p.id === "sio-klinik")!;
  const farmasiIzin = mockPerizinan.find((p) => p.id === "sio-farmasi")!;

  const handleUpdateSave = (_values: any) => {
    message.success(`Dokumen ${updateModalItem?.judul} berhasil diperbarui!`);
    setUpdateModalItem(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header Halaman */}
      <Card style={{ borderRadius: 14 }}>
        <Title level={3} style={{ margin: "0 0 6px 0", color: token.colorTextHeading }}>
          Perizinan Fasilitas dan Tenaga Kesehatan
        </Title>
        <Paragraph type="secondary" style={{ fontSize: 13, margin: 0 }}>
          Dokumen legalitas operasional fasilitas pelayanan kesehatan dan Surat Izin Praktik (SIP)
          tenaga kesehatan resmi Klinik Pratama Arsip Nasional Republik Indonesia.
        </Paragraph>
      </Card>

      {/* 3 Kartu Horizontal */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Kartu 1: Perizinan Operasional Klinik */}
        <Card
          bordered
          hoverable
          style={{ borderRadius: 12 }}
          styles={{ body: { padding: "24px" } }}
        >
          <Row gutter={[16, 16]} align="middle" justify="space-between">
            <Col xs={24} md={14}>
              <Space align="start" size="middle">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    backgroundColor: "#CCFBF1",
                    color: token.colorPrimary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    flexShrink: 0,
                  }}
                >
                  <FileProtectOutlined />
                </div>
                <div>
                  <Space align="center" style={{ marginBottom: 4 }}>
                    <Title level={4} style={{ margin: 0 }}>
                      Perizinan Operasional Klinik (SIO Klinik Pratama)
                    </Title>
                    <Tag color="green" style={{ fontWeight: 600 }}>
                      {klinikIzin.status}
                    </Tag>
                  </Space>
                  <Text strong style={{ display: "block", color: token.colorTextSecondary, fontSize: 13 }}>
                    Nomor Izin: {klinikIzin.nomor_izin}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Masa Berlaku: {klinikIzin.masa_berlaku} | Penanggung Jawab: {klinikIzin.penanggung_jawab}
                  </Text>
                </div>
              </Space>
            </Col>
            <Col xs={24} md={10} style={{ textAlign: "right" }}>
              <Space size="middle" wrap>
                <Button
                  icon={<EyeOutlined />}
                  onClick={() => setDetailModalItem(klinikIzin)}
                >
                  Detail
                </Button>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setUpdateModalItem(klinikIzin);
                    form.setFieldsValue({
                      nomor_izin: klinikIzin.nomor_izin,
                      masa_berlaku: klinikIzin.masa_berlaku,
                      penanggung_jawab: klinikIzin.penanggung_jawab,
                      lokasi: klinikIzin.lokasi,
                    });
                  }}
                  style={{ backgroundColor: token.colorPrimary }}
                >
                  Perbarui
                </Button>
                <Link to="/fasilitas-kesehatan/perizinan/sio-klinik">
                  <Button type="link">Lihat Halaman Penuh →</Button>
                </Link>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Kartu 2: Perizinan Operasional Farmasi */}
        <Card
          bordered
          hoverable
          style={{ borderRadius: 12 }}
          styles={{ body: { padding: "24px" } }}
        >
          <Row gutter={[16, 16]} align="middle" justify="space-between">
            <Col xs={24} md={14}>
              <Space align="start" size="middle">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    backgroundColor: "#E0F2FE",
                    color: "#0284C7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    flexShrink: 0,
                  }}
                >
                  <FileProtectOutlined />
                </div>
                <div>
                  <Space align="center" style={{ marginBottom: 4 }}>
                    <Title level={4} style={{ margin: 0 }}>
                      Perizinan Operasional Farmasi (SIO Farmasi)
                    </Title>
                    <Tag color="green" style={{ fontWeight: 600 }}>
                      {farmasiIzin.status}
                    </Tag>
                  </Space>
                  <Text strong style={{ display: "block", color: token.colorTextSecondary, fontSize: 13 }}>
                    Nomor Izin: {farmasiIzin.nomor_izin}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Masa Berlaku: {farmasiIzin.masa_berlaku} | Penanggung Jawab: {farmasiIzin.penanggung_jawab}
                  </Text>
                </div>
              </Space>
            </Col>
            <Col xs={24} md={10} style={{ textAlign: "right" }}>
              <Space size="middle" wrap>
                <Button
                  icon={<EyeOutlined />}
                  onClick={() => setDetailModalItem(farmasiIzin)}
                >
                  Detail
                </Button>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setUpdateModalItem(farmasiIzin);
                    form.setFieldsValue({
                      nomor_izin: farmasiIzin.nomor_izin,
                      masa_berlaku: farmasiIzin.masa_berlaku,
                      penanggung_jawab: farmasiIzin.penanggung_jawab,
                      lokasi: farmasiIzin.lokasi,
                    });
                  }}
                  style={{ backgroundColor: token.colorPrimary }}
                >
                  Perbarui
                </Button>
                <Link to="/fasilitas-kesehatan/perizinan/sio-farmasi">
                  <Button type="link">Lihat Halaman Penuh →</Button>
                </Link>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Kartu 3: Perizinan Tenaga Kesehatan (SIP Nakes) */}
        <Card
          bordered
          hoverable
          style={{ borderRadius: 12 }}
          styles={{ body: { padding: "24px" } }}
        >
          <Row gutter={[16, 16]} align="middle" justify="space-between">
            <Col xs={24} md={14}>
              <Space align="start" size="middle">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    backgroundColor: "#F3E8FF",
                    color: "#7C3AED",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    flexShrink: 0,
                  }}
                >
                  <TeamOutlined />
                </div>
                <div>
                  <Space align="center" style={{ marginBottom: 4 }}>
                    <Title level={4} style={{ margin: 0 }}>
                      Perizinan Tenaga Kesehatan (SIP Nakes)
                    </Title>
                    <Tag color="purple" style={{ fontWeight: 600 }}>
                      Total: 5 Nakes Terdaftar
                    </Tag>
                  </Space>
                  <Paragraph type="secondary" style={{ fontSize: 13, margin: 0 }}>
                    Lihat daftar lengkap SIP Nakes yang ada: Dokter Spesialis Okupasi, Dokter Umum,
                    Apoteker, Psikolog Klinis, dan Perawat berizin dinas kesehatan.
                  </Paragraph>
                </div>
              </Space>
            </Col>
            <Col xs={24} md={10} style={{ textAlign: "right" }}>
              <Button
                type="primary"
                size="large"
                icon={<RightOutlined />}
                onClick={() => navigate("/fasilitas-kesehatan/perizinan/sip-nakes")}
                style={{ backgroundColor: "#7C3AED", borderColor: "#7C3AED", borderRadius: 8 }}
              >
                Lihat Daftar SIP Nakes
              </Button>
            </Col>
          </Row>
        </Card>
      </div>

      {/* Modal Detail Perizinan */}
      <Modal
        title={detailModalItem?.judul}
        open={!!detailModalItem}
        onCancel={() => setDetailModalItem(null)}
        footer={[
          <Button key="close" type="primary" onClick={() => setDetailModalItem(null)}>
            Tutup
          </Button>,
        ]}
        width={680}
        centered
      >
        {detailModalItem && (
          <div style={{ marginTop: 14 }}>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <Image
                src={detailModalItem.dokumen_url}
                alt="Foto Dokumen Perizinan"
                style={{
                  maxHeight: 280,
                  borderRadius: 8,
                  objectFit: "cover",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              />
            </div>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Status Dokumen">
                <Tag color="green" style={{ fontSize: 13 }}>
                  {detailModalItem.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Nomor Izin">
                {detailModalItem.nomor_izin}
              </Descriptions.Item>
              <Descriptions.Item label="Masa Berlaku">
                {detailModalItem.masa_berlaku}
              </Descriptions.Item>
              <Descriptions.Item label="Jenis Fasilitas">
                {detailModalItem.jenis_fasilitas}
              </Descriptions.Item>
              <Descriptions.Item label="Lokasi Fasilitas">
                {detailModalItem.lokasi}
              </Descriptions.Item>
              <Descriptions.Item label="Penanggung Jawab">
                {detailModalItem.penanggung_jawab}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* Modal Memperbarui Dokumen */}
      <Modal
        title={`Memperbarui Dokumen: ${updateModalItem?.judul}`}
        open={!!updateModalItem}
        onCancel={() => setUpdateModalItem(null)}
        footer={null}
        width={600}
        centered
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateSave} style={{ marginTop: 16 }}>
          <Form.Item label="Upload Dokumen Baru" valuePropName="fileList">
            <Upload maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Pilih Berkas PDF / JPG (Maks. 5 MB)</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Nomor Izin"
            name="nomor_izin"
            rules={[{ required: true, message: "Nomor izin wajib diisi!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Masa Berlaku"
            name="masa_berlaku"
            rules={[{ required: true, message: "Masa berlaku wajib diisi!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Lokasi Fasilitas" name="lokasi">
            <Input />
          </Form.Item>

          <Form.Item label="Penanggung Jawab" name="penanggung_jawab">
            <Input />
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
            <Button onClick={() => setUpdateModalItem(null)}>Batal</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: token.colorPrimary }}>
              Simpan Pembaruan
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
