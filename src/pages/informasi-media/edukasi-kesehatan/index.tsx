import React, { useState, useMemo } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Button,
  Tag,
  Space,
  Pagination,
  theme,
  List,
} from "antd";
import {
  PlusOutlined,
  ReadOutlined,
  CalendarOutlined,
  UserOutlined,
  RightOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import { useList } from "@refinedev/core";
import type { IArtikel } from "../../../providers/mock-data";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

export const EdukasiKesehatanPage: React.FC = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 4;

  const { result: artikelResult } = useList<IArtikel>({
    resource: "artikel",
    pagination: { mode: "off" },
  });

  const categories = [
    "Semua",
    "K3 Perkantoran",
    "Ergonomi",
    "Kesehatan Mental",
    "Gizi Kerja",
    "Pencegahan Penyakit",
  ];

  const filteredArticles = useMemo(() => {
    let list = artikelResult?.data || [];
    if (selectedCategory !== "Semua") {
      list = list.filter((a) => a.kategori === selectedCategory);
    }
    return list;
  }, [artikelResult, selectedCategory]);

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredArticles.slice(start, start + pageSize);
  }, [filteredArticles, currentPage, pageSize]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header Halaman & Tombol Tambah Artikel + */}
      <Card style={{ borderRadius: 14 }}>
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Title level={3} style={{ margin: "0 0 6px 0", color: token.colorTextHeading }}>
              Edukasi Kesehatan & K3 Perkantoran
            </Title>
            <Paragraph type="secondary" style={{ fontSize: 13, margin: 0 }}>
              Artikel informatif, panduan kesehatan kerja, tips ergonomi, dan gaya hidup sehat bagi pegawai ANRI.
            </Paragraph>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: "right" }}>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => navigate("/informasi-media/edukasi-kesehatan/create")}
              style={{
                borderRadius: 8,
                backgroundColor: token.colorPrimary,
                fontWeight: 600,
              }}
            >
              Tambah Artikel +
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Layout 2 Kolom: Kiri Daftar Artikel, Kanan Kartu Kategori */}
      <Row gutter={[24, 24]}>
        {/* Kolom Kiri: Daftar Kartu Artikel & Paginasi */}
        <Col xs={24} lg={16}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {paginatedArticles.map((artikel) => (
              <Card
                key={artikel.id}
                hoverable
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  border: `1px solid ${token.colorBorderSecondary}`,
                }}
                styles={{ body: { padding: "18px" } }}
              >
                <Row gutter={[18, 18]} align="middle">
                  <Col xs={24} sm={9}>
                    <img
                      src={artikel.foto}
                      alt={artikel.judul}
                      style={{
                        width: "100%",
                        height: 150,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={15}>
                    <Space size="small" style={{ marginBottom: 6 }}>
                      <Tag color="cyan">{artikel.kategori}</Tag>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        <CalendarOutlined style={{ marginRight: 4 }} />
                        {artikel.tanggal}
                      </Text>
                    </Space>

                    <Title level={5} style={{ margin: "2px 0 6px 0", lineHeight: 1.35 }}>
                      {artikel.judul}
                    </Title>

                    <Paragraph
                      type="secondary"
                      ellipsis={{ rows: 2 }}
                      style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}
                    >
                      {artikel.ringkasan}
                    </Paragraph>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        <UserOutlined style={{ marginRight: 4 }} />
                        {artikel.penulis}
                      </Text>
                      <Link to={`/informasi-media/edukasi-kesehatan/show/${artikel.id}`}>
                        <Button type="primary" size="small" style={{ borderRadius: 6 }}>
                          Selengkapnya →
                        </Button>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Card>
            ))}

            {/* Paginasi */}
            {filteredArticles.length > pageSize && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={filteredArticles.length}
                  onChange={(page) => setCurrentPage(page)}
                  showSizeChanger={false}
                />
              </div>
            )}
          </div>
        </Col>

        {/* Kolom Kanan: Kartu Kategori */}
        <Col xs={24} lg={8}>
          <Card
            bordered
            style={{ borderRadius: 12, position: "sticky", top: 80 }}
            title={
              <Space>
                <FolderOpenOutlined style={{ color: token.colorPrimary }} />
                <span>Kategori Artikel</span>
              </Space>
            }
          >
            <List
              dataSource={categories}
              renderItem={(cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <List.Item
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    style={{
                      cursor: "pointer",
                      padding: "10px 12px",
                      borderRadius: 6,
                      backgroundColor: isSelected ? `${token.colorPrimary}18` : "transparent",
                      color: isSelected ? token.colorPrimary : token.colorText,
                      fontWeight: isSelected ? 700 : 500,
                      transition: "all 0.2s",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{cat}</span>
                    <RightOutlined style={{ fontSize: 11, color: isSelected ? token.colorPrimary : "#94A3B8" }} />
                  </List.Item>
                );
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
