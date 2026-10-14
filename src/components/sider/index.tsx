import React, { useState, useMemo } from "react";
import {
  Layout as AntdLayout,
  Menu,
  Input,
  Drawer,
  Grid,
  theme,
  Typography,
  Button,
  Popconfirm,
} from "antd";
import {
  MedicineBoxOutlined,
  HeartOutlined,
  ShopOutlined,
  SmileOutlined,
  ExperimentOutlined,
  SafetyCertificateOutlined,
  FileDoneOutlined,
  TeamOutlined,
  AppstoreOutlined,
  ToolOutlined,
  ReadOutlined,
  PictureOutlined,
  PhoneOutlined,
  DashboardOutlined,
  SearchOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router";
import { useLogout } from "@refinedev/core";
import type { MenuProps } from "antd";

const { Sider } = AntdLayout;
const { Text } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

interface CustomSiderProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

type MenuItem = Required<MenuProps>["items"][number];

export const CustomSider: React.FC<CustomSiderProps> = ({
  collapsed,
  mobileOpen,
  onMobileClose,
}) => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const [searchTerm, setSearchTerm] = useState("");

  const isMobile = !screens.md;

  // Struktur Menu Lengkap Sesuai Spesifikasi Wireframe
  const menuTree = useMemo(
    () => [
      {
        key: "/",
        label: "Dashboard",
        icon: <DashboardOutlined />,
      },
      {
        key: "grp_layanan",
        label: "Layanan Kesehatan",
        icon: <MedicineBoxOutlined />,
        children: [
          {
            key: "/layanan-kesehatan/poli-umum",
            label: "Layanan Poli Umum",
            icon: <HeartOutlined />,
          },
          {
            key: "/layanan-kesehatan/farmasi",
            label: "Layanan Farmasi",
            icon: <ShopOutlined />,
          },
          {
            key: "/layanan-kesehatan/konseling",
            label: "Layanan Konseling Psikolog",
            icon: <SmileOutlined />,
          },
          {
            key: "/layanan-kesehatan/pemeriksaan-penunjang",
            label: "Layanan Pemeriksaan Penunjang",
            icon: <ExperimentOutlined />,
          },
          {
            key: "/layanan-kesehatan/manajemen-k3",
            label: "Manajemen K3",
            icon: <SafetyCertificateOutlined />,
          },
        ],
      },
      {
        key: "grp_fasilitas",
        label: "Fasilitas Kesehatan",
        icon: <AppstoreOutlined />,
        children: [
          {
            key: "/fasilitas-kesehatan/perizinan",
            label: "Perizinan",
            icon: <FileDoneOutlined />,
          },
          {
            key: "/fasilitas-kesehatan/sdm-kesehatan",
            label: "SDM Kesehatan",
            icon: <TeamOutlined />,
          },
          {
            key: "/fasilitas-kesehatan/informasi-ruangan",
            label: "Informasi Ruangan",
            icon: <AppstoreOutlined />,
          },
          {
            key: "/fasilitas-kesehatan/peralatan-medis",
            label: "Peralatan Medis",
            icon: <ToolOutlined />,
          },
        ],
      },
      {
        key: "grp_informasi",
        label: "Informasi dan Media",
        icon: <ReadOutlined />,
        children: [
          {
            key: "/informasi-media/edukasi-kesehatan",
            label: "Edukasi Kesehatan",
            icon: <ReadOutlined />,
          },
          {
            key: "/informasi-media/flyer-poster",
            label: "Flyer dan Poster",
            icon: <PictureOutlined />,
          },
        ],
      },
      {
        key: "/hubungi-kami",
        label: "Hubungi Kami",
        icon: <PhoneOutlined />,
      },
    ],
    []
  );

  // Filter menu berdasarkan input pencarian
  const filteredMenuItems: MenuItem[] = useMemo(() => {
    if (!searchTerm.trim()) {
      return menuTree as MenuItem[];
    }
    const q = searchTerm.toLowerCase();

    return menuTree
      .map((item) => {
        if ("children" in item && item.children) {
          const matchingChildren = item.children.filter((child) =>
            child.label.toLowerCase().includes(q)
          );
          if (matchingChildren.length > 0) {
            return {
              ...item,
              children: matchingChildren,
            };
          }
          if (item.label.toLowerCase().includes(q)) {
            return item;
          }
          return null;
        }
        if (item.label.toLowerCase().includes(q)) {
          return item;
        }
        return null;
      })
      .filter(Boolean) as MenuItem[];
  }, [menuTree, searchTerm]);

  // Cari selectedKey & openKeys berdasarkan path saat ini
  const currentPath = location.pathname;

  const defaultOpenKeys = useMemo(() => {
    if (currentPath.startsWith("/layanan-kesehatan")) return ["grp_layanan"];
    if (currentPath.startsWith("/fasilitas-kesehatan")) return ["grp_fasilitas"];
    if (currentPath.startsWith("/informasi-media")) return ["grp_informasi"];
    return [];
  }, [currentPath]);

  // Selected key logic (bila berada di sub-path seperti create/show/sio)
  const selectedKey = useMemo(() => {
    if (currentPath === "/" || currentPath === "") return "/";
    if (currentPath.startsWith("/fasilitas-kesehatan/perizinan")) {
      return "/fasilitas-kesehatan/perizinan";
    }
    if (currentPath.startsWith("/informasi-media/edukasi-kesehatan")) {
      return "/informasi-media/edukasi-kesehatan";
    }
    return currentPath;
  }, [currentPath]);

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    navigate(info.key);
    if (isMobile) {
      onMobileClose();
    }
  };

  const menuContent = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Search Input Filter di Atas Menu */}
      <div style={{ padding: "12px 14px 8px 14px" }}>
        <Input
          placeholder="Cari menu layanan..."
          prefix={<SearchOutlined style={{ color: token.colorTextSecondary }} />}
          allowClear
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="middle"
          style={{
            borderRadius: 8,
            backgroundColor: token.colorBgContainer,
          }}
        />
      </div>

      {/* Menu Ant Design Bertingkat */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 16 }}>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={defaultOpenKeys}
          items={filteredMenuItems}
          onClick={handleMenuClick}
          inlineIndent={16}
          style={{
            borderRight: "none",
            backgroundColor: "transparent",
            fontWeight: 500,
          }}
        />
      </div>

      {/* Tombol Logout di Bagian Bawah Sidebar */}
      <div
        style={{
          padding: "12px 14px",
          borderTop: `1px solid ${token.colorBorderSecondary}`,
          backgroundColor: token.colorBgElevated,
        }}
      >
        <Popconfirm
          title="Konfirmasi Logout"
          description="Apakah Anda yakin ingin keluar dari sistem PRIMA K3?"
          onConfirm={() => {
            logout();
            if (isMobile) {
              onMobileClose();
            }
          }}
          okText="Ya, Logout"
          cancelText="Batal"
          okButtonProps={{ danger: true }}
          placement="top"
        >
          <Button
            danger
            icon={<LogoutOutlined />}
            block
            size="middle"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontWeight: 600,
              borderRadius: 8,
              height: 38,
            }}
          >
            Logout
          </Button>
        </Popconfirm>
      </div>
    </div>
  );

  // Jika mobile, tampilkan dalam Drawer
  if (isMobile) {
    return (
      <Drawer
        open={mobileOpen}
        onClose={onMobileClose}
        placement="left"
        styles={{ body: { padding: 0 } }}
        width={280}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                backgroundColor: token.colorPrimary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontWeight: 700,
              }}
            >
              +
            </div>
            <div>
              <Text strong style={{ fontSize: 15, display: "block", lineHeight: 1.1 }}>
                PRIMA K3
              </Text>
              <Text type="secondary" style={{ fontSize: 10 }}>
                Klinik Pratama ANRI
              </Text>
            </div>
          </div>
        }
      >
        {menuContent}
      </Drawer>
    );
  }

  // Desktop Sider
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={260}
      collapsedWidth={0}
      style={{
        backgroundColor: token.colorBgElevated,
        borderRight: `1px solid ${token.colorBorderSecondary}`,
        height: "calc(100vh - 64px)",
        position: "sticky",
        top: 64,
        overflow: "hidden",
        zIndex: 99,
        transition: "all 0.2s cubic-bezier(0.2, 0, 0, 1)",
      }}
    >
      {!collapsed && menuContent}
    </Sider>
  );
};
