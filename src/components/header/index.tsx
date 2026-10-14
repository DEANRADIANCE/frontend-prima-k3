import type { RefineThemedLayoutHeaderProps } from "@refinedev/antd";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Grid,
  Layout as AntdLayout,
  Modal,
  Row,
  Space,
  Switch,
  Tag,
  theme,
  Typography,
} from "antd";
import {
  AlertOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PhoneOutlined,
  PlusCircleFilled,
  SafetyCertificateOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { ColorModeContext } from "../../contexts/color-mode";

const { Text, Title, Paragraph } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

interface CustomHeaderProps extends RefineThemedLayoutHeaderProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Header: React.FC<CustomHeaderProps> = ({
  sticky = true,
  collapsed = false,
  onToggleCollapse,
}) => {
  const { token } = useToken();
  const { mode, setMode } = useContext(ColorModeContext);
  const screens = useBreakpoint();
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  const isMobile = !screens.md;

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: isMobile ? "0px 12px" : "0px 24px",
    height: "64px",
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
    transition: "all 0.2s",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 100;
  }

  return (
    <>
      <AntdLayout.Header style={headerStyles}>
        {/* Kiri: Hamburger + Teks PRIMA K3 */}
        <Space size="middle" align="center">
          {onToggleCollapse && (
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={onToggleCollapse}
              style={{
                fontSize: "18px",
                width: 38,
                height: 38,
                color: token.colorPrimary,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            />
          )}

          <Space size="small" align="center">
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: token.colorPrimary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: 18,
                lineHeight: 1,
                boxShadow: "0 2px 6px rgba(15, 118, 110, 0.3)",
              }}
            >
              <PlusCircleFilled />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                lineHeight: 1.2,
                minWidth: 0,
              }}
            >
              <Text
                strong
                style={{
                  fontSize: isMobile ? 15 : 17,
                  letterSpacing: 0.5,
                  color: token.colorTextHeading,
                  display: "block",
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                PRIMA K3
              </Text>
              {!screens.xs && (
                <Text
                  type="secondary"
                  style={{ fontSize: 10, letterSpacing: 0.3, fontWeight: 500, lineHeight: 1.2 }}
                >
                  Klinik Pratama ANRI
                </Text>
              )}
            </div>
          </Space>
        </Space>

        {/* Kanan: Tombol EMERGENCY + Mode + User Info */}
        <Space size={isMobile ? "small" : "middle"} align="center">
          {/* Tombol EMERGENCY Pil Merah */}
          <Button
            type="primary"
            danger
            icon={<AlertOutlined />}
            onClick={() => setIsEmergencyOpen(true)}
            style={{
              backgroundColor: "#DC2626",
              borderColor: "#DC2626",
              borderRadius: "20px",
              padding: isMobile ? "4px 12px" : "4px 18px",
              fontWeight: 700,
              letterSpacing: 0.6,
              boxShadow: "0 2px 10px rgba(220, 38, 38, 0.4)",
              animation: "pulse 2s infinite",
              height: 34,
            }}
          >
            EMERGENCY
          </Button>

          {/* Dark Mode Switch */}
          <Switch
            checkedChildren="🌙"
            unCheckedChildren="☀️"
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
            checked={mode === "dark"}
          />

          {/* User Avatar */}
          <Space size="small" align="center" style={{ marginLeft: 4 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              <Badge status="processing" color="#10b981" dot offset={[-2, 2]}>
                <Avatar
                  style={{ backgroundColor: token.colorPrimary, display: "flex", alignItems: "center", justifyContent: "center" }}
                  icon={<UserOutlined />}
                  size={isMobile ? "small" : "default"}
                />
              </Badge>
            </span>
            {!screens.xs && (
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                <Text strong style={{ fontSize: "13px", color: token.colorTextHeading }}>
                  dr. Hendra Pratama
                </Text>
                {!isMobile && (
                  <Text type="secondary" style={{ fontSize: "11px" }}>
                    Penanggung Jawab K3
                  </Text>
                )}
              </div>
            )}
          </Space>
        </Space>
      </AntdLayout.Header>

      {/* Modal EMERGENCY Terpadu */}
      <Modal
        title={
          <Space align="center">
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "#FEE2E2",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#DC2626",
                fontSize: 18,
              }}
            >
              <AlertOutlined />
            </span>
            <span style={{ color: "#DC2626", fontWeight: 700, fontSize: 18 }}>
              TANGGAP DARURAT MEDIS & K3 ANRI
            </span>
          </Space>
        }
        open={isEmergencyOpen}
        onCancel={() => setIsEmergencyOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsEmergencyOpen(false)}>
            Tutup
          </Button>,
          <Button
            key="call"
            type="primary"
            danger
            icon={<PhoneOutlined />}
            href="tel:0217805851"
            style={{ backgroundColor: "#DC2626" }}
          >
            Panggil Hotline Darurat
          </Button>,
        ]}
        width={680}
        centered
      >
        <Paragraph style={{ marginTop: 12, color: token.colorTextSecondary }}>
          Gunakan layanan ini apabila terjadi kecelakaan kerja fatal, serangan jantung, pingsan,
          atau kondisi medis yang mengancam nyawa di lingkungan perkantoran ANRI.
        </Paragraph>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} sm={12}>
            <Card
              size="small"
              bordered
              style={{
                borderColor: "#FCA5A5",
                backgroundColor: mode === "dark" ? "#2a1215" : "#FFF5F5",
              }}
            >
              <Text strong style={{ color: "#DC2626", display: "block" }}>
                <PhoneOutlined style={{ marginRight: 6 }} /> Posko Klinik Pratama ANRI
              </Text>
              <Title level={4} style={{ margin: "6px 0 2px 0", color: "#DC2626" }}>
                (021) 780-5851
              </Title>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Ext. 214 (Ruang Tindakan / UGD)
              </Text>
            </Card>
          </Col>

          <Col xs={24} sm={12}>
            <Card
              size="small"
              bordered
              style={{
                borderColor: "#BAE6FD",
                backgroundColor: mode === "dark" ? "#0f1f2e" : "#F0F9FF",
              }}
            >
              <Text strong style={{ color: "#0284C7", display: "block" }}>
                <MedicineBoxOutlined style={{ marginRight: 6 }} /> Hotline Ambulans & IGD DKI
              </Text>
              <Title level={4} style={{ margin: "6px 0 2px 0", color: "#0284C7" }}>
                119 / 112
              </Title>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Layanan Gawat Darurat DKI Jakarta
              </Text>
            </Card>
          </Col>
        </Row>

        <Divider style={{ margin: "18px 0" }} />

        <Title level={5} style={{ margin: "0 0 10px 0" }}>
          Panduan Singkat Respon Kejadian Darurat:
        </Title>
        <ul style={{ paddingLeft: 20, margin: 0, color: token.colorTextSecondary }}>
          <li style={{ marginBottom: 6 }}>
            <strong>Pastikan Keselamatan Area:</strong> Jauhkan korban dan penolong dari bahaya arus
            listrik, api, atau puing reruntuhan sebelum bertindak.
          </li>
          <li style={{ marginBottom: 6 }}>
            <strong>Cek Respon & Napas:</strong> Tepuk bahu korban dan panggil dengan lantang. Bila
            tidak merespon, segera teriakkan pertolongan.
          </li>
          <li style={{ marginBottom: 6 }}>
            <strong>Ambil AED Terdekat:</strong> Kotak AED terpasang di Lobi Klinik Lantai Dasar dan
            Lobi Utama Gedung C ANRI.
          </li>
          <li>
            <strong>Tetap Bersama Korban:</strong> Jangan tinggalkan korban sendirian hingga tim medis
            Klinik Pratama ANRI tiba di lokasi.
          </li>
        </ul>
      </Modal>
    </>
  );
};
