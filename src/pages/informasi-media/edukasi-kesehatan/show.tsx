import React from "react";
import {
  Card,
  Typography,
  Tag,
  Space,
  Button,
  Divider,
  theme,
} from "antd";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  UserOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router";
import { useOne } from "@refinedev/core";
import type { IArtikel } from "../../../providers/mock-data";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

export const EdukasiKesehatanShow: React.FC = () => {
  const { token } = useToken();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { query, result: artikel } = useOne<IArtikel>({
    resource: "artikel",
    id: id || "1",
  });

  if (query.isLoading || !artikel) {
    return <Card loading style={{ borderRadius: 14 }} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Space>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/informasi-media/edukasi-kesehatan")}
        >
          Kembali ke Edukasi Kesehatan
        </Button>
      </Space>

      <Card style={{ borderRadius: 14 }}>
        <Space size="middle" wrap style={{ marginBottom: 12 }}>
          <Tag color="cyan" style={{ fontSize: 13, padding: "2px 10px" }}>
            {artikel.kategori}
          </Tag>
          <Text type="secondary" style={{ fontSize: 13 }}>
            <CalendarOutlined style={{ marginRight: 6 }} />
            {artikel.tanggal}
          </Text>
          <Text type="secondary" style={{ fontSize: 13 }}>
            <UserOutlined style={{ marginRight: 6 }} />
            Penulis: {artikel.penulis}
          </Text>
          <Text type="secondary" style={{ fontSize: 13 }}>
            <EyeOutlined style={{ marginRight: 6 }} />
            Dibaca: {artikel.dibaca}x
          </Text>
        </Space>

        <Title level={2} style={{ margin: "4px 0 20px 0", lineHeight: 1.3 }}>
          {artikel.judul}
        </Title>

        <div style={{ borderRadius: 12, overflow: "hidden", maxHeight: 380, marginBottom: 24 }}>
          <img
            src={artikel.foto}
            alt={artikel.judul}
            style={{ width: "100%", maxHeight: 380, objectFit: "cover" }}
          />
        </div>

        <Paragraph
          strong
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: token.colorPrimary,
            backgroundColor: token.colorBgLayout,
            padding: "16px 20px",
            borderRadius: 8,
          }}
        >
          {artikel.ringkasan}
        </Paragraph>

        <Divider />

        <div style={{ whiteSpace: "pre-line", fontSize: 15, lineHeight: 1.8, color: token.colorText }}>
          {artikel.isi}
        </div>
      </Card>
    </div>
  );
};
