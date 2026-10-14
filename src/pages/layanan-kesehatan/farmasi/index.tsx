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
  Radio,
  Space,
  theme,
  Pagination,
  Descriptions,
  Alert,
  Empty,
  Image,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  MedicineBoxOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useList } from "@refinedev/core";
import type { IObat } from "../../../providers/mock-data";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

export const FarmasiPage: React.FC = () => {
  const { token } = useToken();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [selectedObat, setSelectedObat] = useState<IObat | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Mengambil data obat dari dataProvider Refine
  const { result: obatResult } = useList<IObat>({
    resource: "obat",
    pagination: { mode: "off" },
  });

  const categories = ["Semua", "Flu", "Demam", "Nyeri", "Antibiotik", "Vitamin", "Lambung"];

  // Filter obat
  const filteredObatList = useMemo(() => {
    let list = obatResult?.data || [];

    if (selectedCategory !== "Semua") {
      list = list.filter((o) => o.kategori.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (filterStatus !== "Semua") {
      list = list.filter((o) => o.status === filterStatus);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (o) =>
          o.nama.toLowerCase().includes(q) ||
          o.komposisi.toLowerCase().includes(q) ||
          o.indikasi.toLowerCase().includes(q)
      );
    }

    return list;
  }, [obatResult, selectedCategory, filterStatus, searchTerm]);

  // Paginasi
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredObatList.slice(start, start + pageSize);
  }, [filteredObatList, currentPage, pageSize]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header Halaman & Pencarian */}
      <Card style={{ borderRadius: 14 }}>
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col xs={24} md={12}>
            <Title level={3} style={{ margin: 0, color: token.colorTextHeading }}>
              Layanan Farmasi – Daftar Obat
            </Title>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Katalog persediaan obat resmi Klinik Pratama ANRI untuk kebutuhan medis pegawai
            </Text>
          </Col>

          <Col xs={24} md={12}>
            <Space.Compact style={{ width: "100%", maxWidth: 460, float: "right" }}>
              <Input
                placeholder="Cari obat..."
                prefix={<SearchOutlined style={{ color: token.colorTextSecondary }} />}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                allowClear
                size="large"
                style={{ borderRadius: "8px 0 0 8px" }}
              />
              <Button
                size="large"
                icon={<FilterOutlined />}
                onClick={() => setIsFilterDrawerOpen(true)}
                style={{ borderRadius: "0 8px 8px 0", borderColor: token.colorBorder }}
              >
                Filter
              </Button>
            </Space.Compact>
          </Col>
        </Row>

        {/* Chip Kategori Filter */}
        <div style={{ marginTop: 18, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <Text strong style={{ fontSize: 13, marginRight: 4 }}>
            Kategori:
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

      {/* Grid Kartu Obat 6 Kolom */}
      {paginatedData.length === 0 ? (
        <Card style={{ borderRadius: 14, textAlign: "center", padding: "40px 0" }}>
          <Empty description="Tidak ada obat yang sesuai dengan pencarian atau filter Anda." />
        </Card>
      ) : (
        <Row gutter={[16, 16]}>
          {paginatedData.map((obat) => (
            <Col xs={12} sm={8} md={6} lg={4} key={obat.id}>
              <Card
                hoverable
                onClick={() => setSelectedObat(obat)}
                cover={
                  <div style={{ height: 130, overflow: "hidden", position: "relative", backgroundColor: "#f8fafc" }}>
                    <img
                      src={obat.foto}
                      alt={obat.nama}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                    />
                    <Tag
                      color={obat.status === "Tersedia" ? "green" : "red"}
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
                      {obat.status}
                    </Tag>
                  </div>
                }
                style={{
                  borderRadius: 10,
                  overflow: "hidden",
                  height: "100%",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  border: `1px solid ${token.colorBorderSecondary}`,
                }}
                styles={{ body: { padding: "12px", flex: 1, display: "flex", flexDirection: "column" } }}
              >
                <Tag
                  color="blue"
                  style={{
                    alignSelf: "flex-start",
                    fontSize: 10,
                    borderRadius: 4,
                    marginBottom: 6,
                    padding: "0 6px",
                  }}
                >
                  {obat.kategori}
                </Tag>
                <Text
                  strong
                  ellipsis={{ tooltip: obat.nama }}
                  style={{ fontSize: 13, lineHeight: 1.3, marginBottom: 4 }}
                >
                  {obat.nama}
                </Text>
                <Text type="secondary" style={{ fontSize: 11, marginTop: "auto" }}>
                  Bentuk: {obat.jenis_obat}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Pagination */}
      {filteredObatList.length > pageSize && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredObatList.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}

      {/* Drawer Filter Lanjutan */}
      <Drawer
        title="Filter Lanjutan Obat"
        placement="right"
        open={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        width={320}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Text strong style={{ display: "block", marginBottom: 8 }}>
              Status Ketersediaan:
            </Text>
            <Radio.Group
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              <Radio value="Semua">Semua Status</Radio>
              <Radio value="Tersedia">
                <Tag color="green">Tersedia</Tag>
              </Radio>
              <Radio value="Habis">
                <Tag color="red">Habis</Tag>
              </Radio>
            </Radio.Group>
          </div>

          <div>
            <Text strong style={{ display: "block", marginBottom: 8 }}>
              Kategori Terpilih:
            </Text>
            <Radio.Group
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              {categories.map((cat) => (
                <Radio key={cat} value={cat}>
                  {cat}
                </Radio>
              ))}
            </Radio.Group>
          </div>

          <Button
            type="primary"
            block
            onClick={() => {
              setIsFilterDrawerOpen(false);
              setCurrentPage(1);
            }}
          >
            Terapkan Filter
          </Button>

          <Button
            block
            onClick={() => {
              setSelectedCategory("Semua");
              setFilterStatus("Semua");
              setSearchTerm("");
              setIsFilterDrawerOpen(false);
              setCurrentPage(1);
            }}
          >
            Reset Filter
          </Button>
        </Space>
      </Drawer>

      {/* Drawer Detail Obat (Kanan) */}
      <Drawer
        title={
          <Space>
            <MedicineBoxOutlined style={{ color: token.colorPrimary }} />
            <span>Detail Obat & Informasi Farmakologi</span>
          </Space>
        }
        placement="right"
        width="min(560px, 100vw)"
        open={!!selectedObat}
        onClose={() => setSelectedObat(null)}
      >
        {selectedObat && (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            {/* Galeri Foto: 1 Besar + Thumbnail */}
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <Image
                src={selectedObat.foto}
                alt={selectedObat.nama}
                style={{
                  maxHeight: 240,
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
              <div style={{ display: "flex", gap: 8, marginTop: 10, justifyContent: "center" }}>
                {selectedObat.thumbnail.map((thumb, idx) => (
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
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Status dan Kategori */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <Title level={4} style={{ margin: 0 }}>
                {selectedObat.nama}
              </Title>
              <Tag color={selectedObat.status === "Tersedia" ? "green" : "red"} style={{ fontSize: 13 }}>
                {selectedObat.status}
              </Tag>
            </div>

            <Descriptions
              bordered
              layout="vertical"
              column={1}
              size="small"
              style={{ width: "100%" }}
              styles={{
                label: { fontWeight: 600 },
                content: { overflowWrap: "anywhere", whiteSpace: "normal", lineHeight: 1.6 },
              }}
            >
              <Descriptions.Item label="Kategori">{selectedObat.kategori}</Descriptions.Item>
              <Descriptions.Item label="Bentuk Sediaan">{selectedObat.jenis_obat}</Descriptions.Item>
              <Descriptions.Item label="Komposisi">{selectedObat.komposisi}</Descriptions.Item>
              <Descriptions.Item label="Dosis Umum">{selectedObat.dosis_umum}</Descriptions.Item>
              <Descriptions.Item label="Indikasi">{selectedObat.indikasi}</Descriptions.Item>
              <Descriptions.Item label="Efek Samping">{selectedObat.efek_samping}</Descriptions.Item>
              <Descriptions.Item label="Peringatan">{selectedObat.peringatan}</Descriptions.Item>
              <Descriptions.Item label="Penyimpanan">{selectedObat.penyimpanan}</Descriptions.Item>
            </Descriptions>

            <Alert
              message="Konsultasikan kepada Tenaga Kefarmasian"
              description="Penggunaan obat-obatan di lingkungan Klinik Pratama ANRI wajib mengikuti anjuran resep dokter dan penjelasan dari Apoteker ber-SIPA."
              type="info"
              showIcon
              icon={<InfoCircleOutlined />}
            />
          </Space>
        )}
      </Drawer>
    </div>
  );
};
