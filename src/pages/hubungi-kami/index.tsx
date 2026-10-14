import React from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Space,
  theme,
  Button,
} from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  SendOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

export const HubungiKamiPage: React.FC = () => {
  const { token } = useToken();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header Hubungi Kami dengan teks verbatim */}
      <Card style={{ borderRadius: 14 }}>
        <Title level={2} style={{ margin: "0 0 8px 0", color: token.colorTextHeading }}>
          Hubungi Kami
        </Title>
        <Paragraph style={{ fontSize: 15, margin: 0, color: token.colorTextSecondary }}>
          Selamat datang di halaman kontak Klinik Pratama ANRI. Kami siap melayani anda. Silahkan
          hubungi kami untuk informasi lebih lanjut.
        </Paragraph>
      </Card>

      {/* Grid 2 Kolom: Kiri Kartu 2x2, Kanan Maps */}
      <Row gutter={[24, 24]}>
        {/* Kolom Kiri: Kartu 2x2 Informasi Kontak */}
        <Col xs={24} lg={12}>
          <Row gutter={[16, 16]}>
            {/* 1. Alamat Kami */}
            <Col xs={24} sm={12}>
              <Card
                bordered
                hoverable
                style={{ borderRadius: 12, height: "100%" }}
                styles={{ body: { padding: "20px" } }}
              >
                <Space align="start" size="middle">
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      backgroundColor: "#CCFBF1",
                      color: token.colorPrimary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  >
                    <EnvironmentOutlined />
                  </div>
                  <div>
                    <Text strong style={{ fontSize: 14, display: "block", marginBottom: 4 }}>
                      Alamat Kami
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12, lineHeight: 1.5, display: "block" }}>
                      Gedung C Lantai Dasar, Arsip Nasional Republik Indonesia (ANRI)
                      <br />
                      Jl. Ampera Raya No. 7, Cilandak Timur, Ps. Minggu, Kota Jakarta Selatan 12560
                    </Text>
                  </div>
                </Space>
              </Card>
            </Col>

            {/* 2. Nomor Telpon & WhatsApp */}
            <Col xs={24} sm={12}>
              <Card
                bordered
                hoverable
                style={{ borderRadius: 12, height: "100%" }}
                styles={{ body: { padding: "20px" } }}
              >
                <Space align="start" size="middle">
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      backgroundColor: "#E0F2FE",
                      color: "#0284C7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  >
                    <PhoneOutlined />
                  </div>
                  <div>
                    <Text strong style={{ fontSize: 14, display: "block", marginBottom: 4 }}>
                      Nomor Telpon & WhatsApp
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12, lineHeight: 1.5, display: "block" }}>
                      Telepon: (021) 7805851 ext. 214
                      <br />
                      WhatsApp: 0812-9988-7766
                      <br />
                      Hotline Darurat: ext. 119
                    </Text>
                  </div>
                </Space>
              </Card>
            </Col>

            {/* 3. Email */}
            <Col xs={24} sm={12}>
              <Card
                bordered
                hoverable
                style={{ borderRadius: 12, height: "100%" }}
                styles={{ body: { padding: "20px" } }}
              >
                <Space align="start" size="middle">
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      backgroundColor: "#FEE2E2",
                      color: "#DC2626",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  >
                    <MailOutlined />
                  </div>
                  <div>
                    <Text strong style={{ fontSize: 14, display: "block", marginBottom: 4 }}>
                      Email Resmi
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12, lineHeight: 1.5, display: "block" }}>
                      klinik.pratama@anri.go.id
                      <br />
                      posko.k3@anri.go.id
                      <br />
                      Respon cepat &lt; 24 jam kerja
                    </Text>
                  </div>
                </Space>
              </Card>
            </Col>

            {/* 4. Jam Operasional */}
            <Col xs={24} sm={12}>
              <Card
                bordered
                hoverable
                style={{ borderRadius: 12, height: "100%" }}
                styles={{ body: { padding: "20px" } }}
              >
                <Space align="start" size="middle">
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      backgroundColor: "#FEF3C7",
                      color: "#D97706",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  >
                    <ClockCircleOutlined />
                  </div>
                  <div>
                    <Text strong style={{ fontSize: 14, display: "block", marginBottom: 4 }}>
                      Jam Operasional
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12, lineHeight: 1.5, display: "block" }}>
                      Senin – Kamis: 07.30 – 16.00 WIB
                      <br />
                      Jumat: 07.30 – 16.30 WIB
                      <br />
                      Sabtu, Minggu & Libur Nasional: Tutup
                    </Text>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Kolom Kanan: Peta Maps Klinik Pratama ANRI */}
        <Col xs={24} lg={12}>
          <Card
            bordered
            style={{ borderRadius: 12, overflow: "hidden" }}
            title={
              <Space>
                <EnvironmentOutlined style={{ color: token.colorPrimary }} />
                <span>Maps Lokasi Klinik Pratama ANRI (Cilandak Timur, Jakarta)</span>
              </Space>
            }
          >
            <div style={{ borderRadius: 8, overflow: "hidden", height: 320, width: "100%" }}>
              <iframe
                title="Maps Klinik Pratama ANRI"
                src="https://maps.google.com/maps?q=Arsip%20Nasional%20Republik%20Indonesia,%20Jl.%20Ampera%20Raya%20No.7,%20Cilandak%20Timur,%20Jakarta%20Selatan&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
            <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Klinik terletak di area Gedung C Lantai Dasar, dekat Lapangan Upacara ANRI.
              </Text>
              <Button
                type="link"
                href="https://maps.google.com/?q=Arsip+Nasional+Republik+Indonesia"
                target="_blank"
                size="small"
              >
                Buka di Google Maps ↗
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
