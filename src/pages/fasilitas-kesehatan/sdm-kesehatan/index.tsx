import React, { useState, useMemo } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Select,
  Tag,
  Button,
  Space,
  Avatar,
  Table,
  Drawer,
  Descriptions,
  theme,
} from "antd";
import {
  TeamOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { mockNakes, type INakes } from "../../../providers/mock-data";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

export const SdmKesehatanPage: React.FC = () => {
  const { token } = useToken();
  const [selectedLayanan, setSelectedLayanan] = useState<string>("Semua");
  const [selectedNakesId, setSelectedNakesId] = useState<number | "Semua">("Semua");
  const [detailNakes, setDetailNakes] = useState<INakes | null>(null);

  // Filter daftar nakes
  const filteredNakes = useMemo(() => {
    return mockNakes.filter((n) => {
      const matchLayanan =
        selectedLayanan === "Semua" || n.layanan === selectedLayanan;
      const matchNakes =
        selectedNakesId === "Semua" || n.id === selectedNakesId;
      return matchLayanan && matchNakes;
    });
  }, [selectedLayanan, selectedNakesId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header SDM Kesehatan */}
      <Card style={{ borderRadius: 14 }}>
        <Title level={3} style={{ margin: "0 0 6px 0", color: token.colorTextHeading }}>
          Sumber Daya Manusia (SDM) Kesehatan
        </Title>
        <Paragraph type="secondary" style={{ fontSize: 13, margin: 0 }}>
          Profil tenaga medis profesional Klinik Pratama ANRI yang bertugas melayani kesehatan fisik
          dan mental pegawai beserta jadwal jaga operasional mingguan.
        </Paragraph>
      </Card>

      {/* Dua Select di Atas */}
      <Card style={{ borderRadius: 12 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Text strong style={{ display: "block", marginBottom: 6 }}>
              Pilih Jenis Layanan:
            </Text>
            <Select
              style={{ width: "100%" }}
              size="large"
              value={selectedLayanan}
              onChange={(val) => {
                setSelectedLayanan(val);
                setSelectedNakesId("Semua");
              }}
              options={[
                { label: "Semua Layanan", value: "Semua" },
                { label: "Poli Umum", value: "Poli Umum" },
                { label: "Farmasi", value: "Farmasi" },
                { label: "Konseling Psikolog", value: "Konseling Psikolog" },
                { label: "Pemeriksaan Penunjang", value: "Pemeriksaan Penunjang" },
              ]}
            />
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Text strong style={{ display: "block", marginBottom: 6 }}>
              Pilih Nakes:
            </Text>
            <Select
              style={{ width: "100%" }}
              size="large"
              value={selectedNakesId}
              onChange={(val) => setSelectedNakesId(val)}
              options={[
                { label: "Semua Tenaga Medis", value: "Semua" },
                ...mockNakes.map((n) => ({
                  label: n.nama,
                  value: n.id,
                })),
              ]}
            />
          </Col>

          <Col xs={24} md={10} style={{ textAlign: "right" }}>
            <Tag color="cyan" style={{ fontSize: 13, padding: "6px 14px", borderRadius: 8, marginTop: 18 }}>
              Menampilkan {filteredNakes.length} Tenaga Kesehatan
            </Tag>
          </Col>
        </Row>
      </Card>

      {/* Grid Kartu Nakes */}
      <Row gutter={[20, 20]}>
        {filteredNakes.map((nakes) => (
          <Col xs={24} lg={12} key={nakes.id}>
            <Card
              hoverable
              style={{
                borderRadius: 14,
                border: `1px solid ${token.colorBorderSecondary}`,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              styles={{ body: { padding: "20px", flex: 1, display: "flex", flexDirection: "column" } }}
            >
              {/* Header Kartu: Foto, Nama, Jabatan, Tombol Detail */}
              <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 16 }}>
                <Col>
                  <Avatar
                    src={nakes.foto}
                    size={72}
                    style={{
                      border: `2px solid ${token.colorPrimary}`,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                </Col>
                <Col flex="1">
                  <Text strong style={{ fontSize: 16, display: "block", color: token.colorTextHeading }}>
                    {nakes.nama}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 13, display: "block" }}>
                    {nakes.jabatan}
                  </Text>
                  <Space size="small" style={{ marginTop: 4 }}>
                    <Tag color="blue">{nakes.profesi}</Tag>
                    <Tag color="cyan">{nakes.layanan}</Tag>
                  </Space>
                </Col>
                <Col>
                  <Button
                    icon={<EyeOutlined />}
                    onClick={() => setDetailNakes(nakes)}
                    style={{ borderRadius: 6 }}
                  >
                    Detail
                  </Button>
                </Col>
              </Row>

              {/* Tag / Judul "Jadwal Jaga" & Blok Jadwal */}
              <div
                style={{
                  backgroundColor: token.colorBgLayout,
                  borderRadius: 10,
                  padding: "14px 16px",
                  marginTop: "auto",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <Space align="center">
                    <ClockCircleOutlined style={{ color: token.colorPrimary }} />
                    <Text strong style={{ fontSize: 13 }}>
                      Jadwal Jaga Mingguan
                    </Text>
                  </Space>
                  <Tag color="green" style={{ margin: 0, fontSize: 11 }}>
                    Praktik Aktif
                  </Tag>
                </div>

                <Table
                  dataSource={nakes.jadwal}
                  rowKey="hari"
                  pagination={false}
                  size="small"
                  showHeader={false}
                  columns={[
                    {
                      dataIndex: "hari",
                      key: "hari",
                      render: (hari: string) => (
                        <Text strong style={{ fontSize: 12, color: token.colorPrimary }}>
                          {hari}
                        </Text>
                      ),
                    },
                    {
                      dataIndex: "jam",
                      key: "jam",
                      render: (jam: string) => (
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {jam}
                        </Text>
                      ),
                    },
                  ]}
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Drawer Detail Nakes */}
      <Drawer
        title={
          <Space>
            <MedicineBoxOutlined style={{ color: token.colorPrimary }} />
            <span>Profil Lengkap Tenaga Kesehatan</span>
          </Space>
        }
        width={500}
        placement="right"
        open={!!detailNakes}
        onClose={() => setDetailNakes(null)}
      >
        {detailNakes && (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <Avatar src={detailNakes.foto} size={100} style={{ border: `3px solid ${token.colorPrimary}` }} />
              <Title level={4} style={{ margin: "12px 0 2px 0" }}>
                {detailNakes.nama}
              </Title>
              <Text type="secondary">{detailNakes.jabatan}</Text>
            </div>

            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Profesi">{detailNakes.profesi}</Descriptions.Item>
              <Descriptions.Item label="Penugasan">{detailNakes.layanan}</Descriptions.Item>
              <Descriptions.Item label="Nomor SIP">{detailNakes.sip}</Descriptions.Item>
              <Descriptions.Item label="Nomor STR">{detailNakes.str}</Descriptions.Item>
              <Descriptions.Item label="Pendidikan Terakhir">{detailNakes.pendidikan}</Descriptions.Item>
            </Descriptions>

            <Card size="small" title="Rincian Jam Praktik di Klinik" style={{ borderRadius: 8 }}>
              {detailNakes.jadwal.map((j, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
                  <Text strong>{j.hari}</Text>
                  <Text type="secondary">{j.jam}</Text>
                </div>
              ))}
            </Card>
          </Space>
        )}
      </Drawer>
    </div>
  );
};
