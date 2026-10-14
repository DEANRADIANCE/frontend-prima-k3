import React from "react";
import { Layout, Row, Col, Typography, Space, Divider, theme } from "antd";
import {
  MedicineBoxOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { Link } from "react-router";

const { Text, Title, Paragraph } = Typography;
const { useToken } = theme;

export const CustomFooter: React.FC = () => {
  const { token } = useToken();

  return (
    <Layout.Footer
      style={{
        backgroundColor: token.colorBgContainer,
        borderTop: `1px solid ${token.colorBorderSecondary}`,
        padding: "40px 24px 24px 24px",
        marginTop: 40,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Row gutter={[32, 24]}>
          {/* Kolom 1: Logo, Brand & Deskripsi */}
          <Col xs={24} md={8}>
            <Space align="center" style={{ marginBottom: 12 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  backgroundColor: token.colorPrimary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: 18,
                  fontWeight: 800,
                  boxShadow: "0 2px 8px rgba(15, 118, 110, 0.3)",
                }}
              >
                <PlusCircleFilled />
              </div>
              <div>
                <Text strong style={{ fontSize: 16, color: token.colorTextHeading, display: "block", lineHeight: 1.1 }}>
                  PRIMA K3
                </Text>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  Klinik Pratama ANRI
                </Text>
              </div>
            </Space>
            <Paragraph type="secondary" style={{ fontSize: 13, lineHeight: 1.6, marginTop: 8 }}>
              Portal Layanan Kesehatan & Keselamatan dan Kesehatan Kerja (K3) Klinik Pratama Arsip
              Nasional Republik Indonesia. Menyediakan layanan kuratif, promotif, dan preventif bagi
              seluruh pegawai demi terciptanya produktivitas optimal.
            </Paragraph>
            <Space size="small">
              <SafetyCertificateOutlined style={{ color: token.colorPrimary, fontSize: 16 }} />
              <Text strong style={{ fontSize: 12, color: token.colorPrimary }}>
                Faskes Terakreditasi Paripurna & Berizin Kemenkes RI
              </Text>
            </Space>
          </Col>

          {/* Kolom 2: Tautan Cepat */}
          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ marginTop: 0, marginBottom: 14 }}>
              Tautan Layanan
            </Title>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 2, fontSize: 13 }}>
              <li>
                <Link to="/layanan-kesehatan/poli-umum" style={{ color: token.colorTextSecondary }}>
                  Layanan Poli Umum
                </Link>
              </li>
              <li>
                <Link to="/layanan-kesehatan/farmasi" style={{ color: token.colorTextSecondary }}>
                  Layanan Farmasi & Obat
                </Link>
              </li>
              <li>
                <Link to="/layanan-kesehatan/konseling" style={{ color: token.colorTextSecondary }}>
                  Layanan Konseling Psikolog
                </Link>
              </li>
              <li>
                <Link to="/layanan-kesehatan/pemeriksaan-penunjang" style={{ color: token.colorTextSecondary }}>
                  Pemeriksaan Penunjang (Lab & EKG)
                </Link>
              </li>
              <li>
                <Link to="/layanan-kesehatan/manajemen-k3" style={{ color: token.colorTextSecondary }}>
                  Dashboard Manajemen K3
                </Link>
              </li>
              <li>
                <Link to="/fasilitas-kesehatan/perizinan" style={{ color: token.colorTextSecondary }}>
                  Perizinan Faskes & Nakes
                </Link>
              </li>
            </ul>
          </Col>

          {/* Kolom 3: Kontak & Jam Operasional */}
          <Col xs={24} sm={12} md={10}>
            <Title level={5} style={{ marginTop: 0, marginBottom: 14 }}>
              Kontak & Operasional
            </Title>
            <Space direction="vertical" size="small" style={{ fontSize: 13 }}>
              <Space align="start">
                <EnvironmentOutlined style={{ color: token.colorPrimary, marginTop: 4 }} />
                <Text type="secondary">
                  Gedung C Lantai Dasar, Arsip Nasional Republik Indonesia (ANRI)
                  <br />
                  Jl. Ampera Raya No. 7, Cilandak Timur, Ps. Minggu, Jakarta Selatan 12560
                </Text>
              </Space>

              <Space align="center">
                <PhoneOutlined style={{ color: token.colorPrimary }} />
                <Text type="secondary">
                  (021) 7805851 ext. 214 | WhatsApp Pelayanan: 0812-9988-7766
                </Text>
              </Space>

              <Space align="center">
                <MailOutlined style={{ color: token.colorPrimary }} />
                <Text type="secondary">klinik.pratama@anri.go.id</Text>
              </Space>

              <Space align="center">
                <ClockCircleOutlined style={{ color: token.colorPrimary }} />
                <Text type="secondary">
                  Senin – Jumat: 07.30 – 16.00 WIB (Hari Libur Nasional Tutup)
                </Text>
              </Space>
            </Space>
          </Col>
        </Row>

        <Divider style={{ margin: "24px 0 16px 0" }} />

        <div style={{ textAlign: "center" }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            © 2026 Klinik Pratama ANRI – PRIMA K3. Hak Cipta Dilindungi Undang-Undang.
          </Text>
        </div>
      </div>
    </Layout.Footer>
  );
};
