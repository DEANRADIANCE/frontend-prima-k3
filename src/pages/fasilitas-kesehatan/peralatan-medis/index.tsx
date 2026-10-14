import React, { useState, useMemo } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Input,
  Button,
  Tag,
  Drawer,
  Space,
  theme,
  Pagination,
  Descriptions,
  Alert,
  Image,
  Empty,
} from "antd";
import {
  SearchOutlined,
  ToolOutlined,
  WarningOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useList } from "@refinedev/core";
import type { IAlatMedis } from "../../../providers/mock-data";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

export const PeralatanMedisPage: React.FC = () => {
  const { token } = useToken();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedAlat, setSelectedAlat] = useState<IAlatMedis | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const { result: alatResult } = useList<IAlatMedis>({
    resource: "alat_medis",
    pagination: { mode: "off" },
  });

  const categories = ["Semua", "Diagnostik", "Gawat Darurat", "Sterilisasi"];

  const filteredAlatList = useMemo(() => {
    let list = alatResult?.data || [];

    if (selectedCategory !== "Semua") {
      list = list.filter((a) => a.kategori === selectedCategory);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (a) =>
          a.nama.toLowerCase().includes(q) ||
          a.penjelasan.toLowerCase().includes(q) ||
          a.fungsi_utama.toLowerCase().includes(q)
      );
    }

    return list;
  }, [alatResult, selectedCategory, searchTerm]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAlatList.slice(start, start + pageSize);
  }, [filteredAlatList, currentPage, pageSize]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header Halaman & Pencarian dengan koreksi placeholder "Cari Alat" */}
      <Card style={{ borderRadius: 14 }}>
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col xs={24} md={12}>
            <Title level={3} style={{ margin: 0, color: token.colorTextHeading }}>
              Peralatan Medis – Daftar Peralatan Medis
            </Title>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Inventaris peralatan medis, instrumen diagnostik, dan fasilitas gawat darurat Klinik Pratama ANRI
            </Text>
          </Col>

          <Col xs={24} md={12}>
            <Input
              placeholder="Cari Alat..."
              prefix={<SearchOutlined style={{ color: token.colorTextSecondary }} />}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              allowClear
              size="large"
              style={{ maxWidth: 380, float: "right", borderRadius: 8 }}
            />
          </Col>
        </Row>

        {/* Chip Kategori */}
        <div style={{ marginTop: 18, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <Text strong style={{ fontSize: 13, marginRight: 4 }}>
            Kategori Peralatan:
          </Text>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <Tag.CheckableTag
                key={cat}
                checked={isSelected}
                onChange={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                style={{
                  borderRadius: 16,
                  padding: "4px 14px",
                  fontSize: 13,
                  cursor: "pointer",
                  backgroundColor: isSelected ? token.colorPrimary : token.colorBgLayout,
                  color: isSelected ? "#ffffff" : token.colorText,
                  border: `1px solid ${isSelected ? token.colorPrimary : token.colorBorderSecondary}`,
                }}
              >
                {cat}
              </Tag.CheckableTag>
            );
          })}
        </div>
      </Card>

      {/* Grid Kartu Peralatan Medis */}
      {paginatedData.length === 0 ? (
        <Card style={{ borderRadius: 14, textAlign: "center", padding: "40px 0" }}>
          <Empty description="Tidak ada peralatan medis yang cocok dengan kriteria pencarian." />
        </Card>
      ) : (
        <Row gutter={[16, 16]}>
          {paginatedData.map((alat) => (
            <Col xs={12} sm={8} md={6} key={alat.id}>
              <Card
                hoverable
                onClick={() => setSelectedAlat(alat)}
                cover={
                  <div style={{ height: 160, overflow: "hidden", position: "relative", backgroundColor: "#f8fafc" }}>
                    <img
                      src={alat.foto}
                      alt={alat.nama}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                    />
                    <Tag
                      color="green"
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 4,
                        margin: 0,
                        fontSize: 11,
                        borderRadius: 4,
                        fontWeight: 600,
                      }}
                    >
                      {alat.status}
                    </Tag>
                  </div>
                }
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  height: "100%",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  border: `1px solid ${token.colorBorderSecondary}`,
                }}
                styles={{ body: { padding: "14px", flex: 1, display: "flex", flexDirection: "column" } }}
              >
                <Tag
                  color="cyan"
                  style={{
                    alignSelf: "flex-start",
                    fontSize: 11,
                    borderRadius: 4,
                    marginBottom: 6,
                  }}
                >
                  {alat.kategori}
                </Tag>
                <Text
                  strong
                  ellipsis={{ tooltip: alat.nama }}
                  style={{ fontSize: 14, lineHeight: 1.3, marginBottom: 4 }}
                >
                  {alat.nama}
                </Text>
                <Paragraph
                  type="secondary"
                  ellipsis={{ rows: 2 }}
                  style={{ fontSize: 12, marginTop: 4, marginBottom: 0 }}
                >
                  {alat.fungsi_utama}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Pagination */}
      {filteredAlatList.length > pageSize && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredAlatList.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}

      {/* Drawer Detail Alat */}
      <Drawer
        title={
          <Space>
            <ToolOutlined style={{ color: token.colorPrimary }} />
            <span>Detail Peralatan Medis & SOP Penggunaan</span>
          </Space>
        }
        placement="right"
        width={580}
        open={!!selectedAlat}
        onClose={() => setSelectedAlat(null)}
      >
        {selectedAlat && (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            {/* Galeri Foto */}
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <Image
                src={selectedAlat.foto}
                alt={selectedAlat.nama}
                style={{
                  maxHeight: 240,
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
              <div style={{ display: "flex", gap: 8, marginTop: 10, justifyContent: "center" }}>
                {selectedAlat.thumbnail.map((thumb, idx) => (
                  <img
                    key={idx}
                    src={thumb}
                    alt="thumbnail"
                    style={{
                      width: 60,
                      height: 50,
                      borderRadius: 6,
                      objectFit: "cover",
                      border: `2px solid ${token.colorPrimary}`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Title level={4} style={{ margin: 0 }}>
                {selectedAlat.nama}
              </Title>
              <Tag color="green" style={{ fontSize: 13 }}>
                {selectedAlat.status}
              </Tag>
            </div>

            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Kategori">{selectedAlat.kategori}</Descriptions.Item>
              <Descriptions.Item label="Penjelasan Singkat">
                {selectedAlat.penjelasan}
              </Descriptions.Item>
              <Descriptions.Item label="Fungsi Utama">
                {selectedAlat.fungsi_utama}
              </Descriptions.Item>
              <Descriptions.Item label="Cara Penggunaan">
                {selectedAlat.cara_penggunaan}
              </Descriptions.Item>
              <Descriptions.Item label="Penyimpanan">
                {selectedAlat.penyimpanan}
              </Descriptions.Item>
            </Descriptions>

            {/* Peringatan (WARNING) ditampilkan dengan Alert kuning/merah */}
            <Alert
              message="PERINGATAN KESELAMATAN (WARNING)"
              description={selectedAlat.peringatan}
              type="error"
              showIcon
              icon={<WarningOutlined style={{ fontSize: 20 }} />}
              style={{
                borderRadius: 8,
                border: "1px solid #FCA5A5",
                backgroundColor: "#FEF2F2",
              }}
            />
          </Space>
        )}
      </Drawer>
    </div>
  );
};
