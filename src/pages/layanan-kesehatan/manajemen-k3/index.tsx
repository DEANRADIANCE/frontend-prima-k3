import React from "react";
import {
  Card,
  Col,
  Row,
  Statistic,
  Typography,
  Progress,
  Space,
  Tag,
  theme,
  Divider,
} from "antd";
import {
  SafetyCertificateOutlined,
  UsergroupAddOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  MedicineBoxOutlined,
  SmileOutlined,
  ManOutlined,
  WomanOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { mockStatistikK3 } from "../../../providers/mock-data";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

export const ManajemenK3Page: React.FC = () => {
  const { token } = useToken();
  const { kpi, kunjungan_bulanan, tren_penyakit, jenis_kecelakaan, kecelakaan_bulanan, kunjungan_psikolog, progress } =
    mockStatistikK3;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header Manajemen K3 */}
      <Card style={{ borderRadius: 14 }}>
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col xs={24} md={16}>
            <Title level={3} style={{ margin: "0 0 6px 0", color: token.colorTextHeading }}>
              Manajemen K3 – Portal Pengawasan Kesehatan & Keselamatan Kerja
            </Title>
            <Paragraph type="secondary" style={{ fontSize: 13, margin: 0 }}>
              Sistem informasi monitoring kecelakaan kerja, kebugaran kesehatan pegawai, serta evaluasi
              kepatuhan standar K3 di lingkungan Arsip Nasional Republik Indonesia (ANRI).
            </Paragraph>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: "right" }}>
            <Tag color="cyan" style={{ padding: "6px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
              Status K3: ZERO ACCIDENT 2026
            </Tag>
          </Col>
        </Row>
      </Card>

      {/* 4 KPI Statistic Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered hoverable style={{ borderRadius: 12 }}>
            <Statistic
              title={<Text type="secondary">Laporan Kecelakaan Kerja (Bulan ini)</Text>}
              value={kpi.kecelakaan_bulan_ini}
              suffix="Kasus"
              valueStyle={{ color: "#10B981", fontWeight: 800 }}
              prefix={<SafetyCertificateOutlined style={{ marginRight: 6 }} />}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Nol insiden kecelakaan fatal (Aman)
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered hoverable style={{ borderRadius: 12 }}>
            <Statistic
              title={<Text type="secondary">Jumlah Pegawai Terdata</Text>}
              value={kpi.jumlah_pegawai}
              suffix="Orang"
              valueStyle={{ color: token.colorPrimary, fontWeight: 800 }}
              prefix={<UsergroupAddOutlined style={{ marginRight: 6 }} />}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              ASN, PPPK, dan PPNPN ANRI
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered hoverable style={{ borderRadius: 12 }}>
            <Statistic
              title={<Text type="secondary">Laporan Potensi Berbahaya (Near Miss)</Text>}
              value={kpi.laporan_hazard}
              suffix="Temuan"
              valueStyle={{ color: "#D97706", fontWeight: 800 }}
              prefix={<AlertOutlined style={{ marginRight: 6 }} />}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Telah ditindaklanjuti tim teknis K3
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered hoverable style={{ borderRadius: 12 }}>
            <Statistic
              title={<Text type="secondary">Skor Kepatuhan K3</Text>}
              value={kpi.skor_kepatuhan}
              suffix="%"
              valueStyle={{ color: "#0284C7", fontWeight: 800 }}
              prefix={<CheckCircleOutlined style={{ marginRight: 6 }} />}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Kategori: Sangat Baik (SMK3 PP 50/2012)
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Baris Grafik 1: Kunjungan per Bulan (Line) + Tren Penyakit (Horizontal Bar) */}
      <Row gutter={[20, 20]}>
        {/* Kunjungan per Bulan (Line Chart) */}
        <Col xs={24} lg={12}>
          <Card
            style={{ borderRadius: 14 }}
            title={
              <Space>
                <RiseOutlined style={{ color: token.colorPrimary }} />
                <span>Statistik Kunjungan Poli per Bulan (Tren Pasien)</span>
              </Space>
            }
          >
            <div style={{ height: 240, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              {/* SVG Line Chart */}
              <svg viewBox="0 0 500 200" style={{ width: "100%", height: "180px", overflow: "visible" }}>
                {/* Garis Grid Horizontal */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="#E2E8F0" strokeDasharray="3 3" />
                <line x1="40" y1="70" x2="480" y2="70" stroke="#E2E8F0" strokeDasharray="3 3" />
                <line x1="40" y1="120" x2="480" y2="120" stroke="#E2E8F0" strokeDasharray="3 3" />
                <line x1="40" y1="170" x2="480" y2="170" stroke="#E2E8F0" />

                {/* Y Axis Labels */}
                <text x="15" y="24" fontSize="11" fill="#94A3B8">150</text>
                <text x="15" y="74" fontSize="11" fill="#94A3B8">100</text>
                <text x="20" y="124" fontSize="11" fill="#94A3B8">50</text>
                <text x="25" y="174" fontSize="11" fill="#94A3B8">0</text>

                {/* Area Shadow */}
                <polygon
                  points="60,95 140,82 220,68 300,72 380,48 460,40 460,170 60,170"
                  fill="rgba(15, 118, 110, 0.12)"
                />

                {/* Line Path */}
                <polyline
                  fill="none"
                  stroke={token.colorPrimary}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="60,95 140,82 220,68 300,72 380,48 460,40"
                />

                {/* Data Points */}
                {kunjungan_bulanan.map((item, idx) => {
                  const x = 60 + idx * 80;
                  const y = 170 - (item.jumlah / 150) * 140;
                  return (
                    <g key={idx}>
                      <circle cx={x} cy={y} r="5" fill="#ffffff" stroke={token.colorPrimary} strokeWidth="3" />
                      <text x={x} y={y - 10} fontSize="11" fontWeight="700" textAnchor="middle" fill={token.colorPrimary}>
                        {item.jumlah}
                      </text>
                      <text x={x} y="190" fontSize="11" textAnchor="middle" fill="#64748B">
                        {item.bulan}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <Text type="secondary" style={{ fontSize: 12, marginTop: 8, display: "block" }}>
              Total kunjungan menunjukkan tren peningkatan pemanfaatan fasilitas klinik secara berkala.
            </Text>
          </Card>
        </Col>

        {/* Tren Penyakit (Horizontal Bar) */}
        <Col xs={24} lg={12}>
          <Card
            style={{ borderRadius: 14 }}
            title={
              <Space>
                <MedicineBoxOutlined style={{ color: "#0284C7" }} />
                <span>Tren Penyakit Terbanyak (Horizontal Bar)</span>
              </Space>
            }
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {tren_penyakit.map((item) => (
                <div key={item.penyakit}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <Text strong style={{ fontSize: 13 }}>{item.penyakit}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {item.kasus} Kasus ({item.persentase}%)
                    </Text>
                  </div>
                  <Progress
                    percent={item.persentase}
                    showInfo={false}
                    strokeColor={
                      item.persentase > 30 ? token.colorPrimary : item.persentase > 15 ? "#0284C7" : "#F59E0B"
                    }
                    size={["100%", 12]}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Baris Grafik 2: Jenis Kecelakaan (Donut) + Statistik Kecelakaan Kerja (Bar) */}
      <Row gutter={[20, 20]}>
        {/* Jenis Kecelakaan (Donut Chart) */}
        <Col xs={24} lg={12}>
          <Card
            style={{ borderRadius: 14 }}
            title={
              <Space>
                <AlertOutlined style={{ color: "#DC2626" }} />
                <span>Distribusi Jenis Kecelakaan Kerja (Donut)</span>
              </Space>
            }
          >
            <Row align="middle" gutter={[16, 16]}>
              <Col xs={24} sm={12} style={{ textAlign: "center" }}>
                <svg viewBox="0 0 160 160" style={{ width: 150, height: 150 }}>
                  <circle cx="80" cy="80" r="50" fill="transparent" stroke="#E2E8F0" strokeWidth="24" />
                  {/* Segment 1: Terjatuh 50% */}
                  <circle
                    cx="80"
                    cy="80"
                    r="50"
                    fill="transparent"
                    stroke="#0F766E"
                    strokeWidth="24"
                    strokeDasharray="157 157"
                    strokeDashoffset="0"
                    transform="rotate(-90 80 80)"
                  />
                  {/* Segment 2: Tertimpa 25% */}
                  <circle
                    cx="80"
                    cy="80"
                    r="50"
                    fill="transparent"
                    stroke="#3B82F6"
                    strokeWidth="24"
                    strokeDasharray="78 236"
                    strokeDashoffset="-157"
                    transform="rotate(-90 80 80)"
                  />
                  {/* Segment 3: Tersengat Listrik 15% */}
                  <circle
                    cx="80"
                    cy="80"
                    r="50"
                    fill="transparent"
                    stroke="#F59E0B"
                    strokeWidth="24"
                    strokeDasharray="47 267"
                    strokeDashoffset="-235"
                    transform="rotate(-90 80 80)"
                  />
                  {/* Segment 4: Terhirup Gas 10% */}
                  <circle
                    cx="80"
                    cy="80"
                    r="50"
                    fill="transparent"
                    stroke="#EF4444"
                    strokeWidth="24"
                    strokeDasharray="31 283"
                    strokeDashoffset="-282"
                    transform="rotate(-90 80 80)"
                  />
                  <text x="80" y="76" fontSize="13" fontWeight="700" textAnchor="middle" fill="#0F172A">
                    Total
                  </text>
                  <text x="80" y="94" fontSize="11" textAnchor="middle" fill="#64748B">
                    100%
                  </text>
                </svg>
              </Col>
              <Col xs={24} sm={12}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {jenis_kecelakaan.map((item) => (
                    <div key={item.jenis} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 3,
                          backgroundColor: item.warna,
                          flexShrink: 0,
                        }}
                      />
                      <Text style={{ fontSize: 12, flex: 1 }}>{item.jenis}</Text>
                      <Text strong style={{ fontSize: 12 }}>{item.nilai}%</Text>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Laporan Kecelakaan Kerja Bulanan (Bar Chart) */}
        <Col xs={24} lg={12}>
          <Card
            style={{ borderRadius: 14 }}
            title={
              <Space>
                <SafetyCertificateOutlined style={{ color: "#10B981" }} />
                <span>Statistik Kecelakaan Kerja Bulanan (Bar)</span>
              </Space>
            }
          >
            <div style={{ height: 180, display: "flex", alignItems: "flex-end", justifyContent: "space-around", paddingTop: 30 }}>
              {kecelakaan_bulanan.map((item, idx) => (
                <div key={idx} style={{ textAlign: "center", width: 44 }}>
                  <div
                    style={{
                      height: item.kasus > 0 ? item.kasus * 70 : 6,
                      backgroundColor: item.kasus > 0 ? "#EF4444" : "#10B981",
                      borderRadius: "6px 6px 0 0",
                      marginBottom: 8,
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      paddingTop: 4,
                      color: "#ffffff",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {item.kasus > 0 ? item.kasus : ""}
                  </div>
                  <Text style={{ fontSize: 11, color: "#64748B" }}>{item.bulan}</Text>
                </div>
              ))}
            </div>
            <Divider style={{ margin: "14px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Bulan Terakhir: <strong>0 Kasus (Agustus - Oktober 2026)</strong>
              </Text>
              <Tag color="success">Pencegahan Efektif</Tag>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Baris Grafik 3: Statistik Kesehatan & Pegawai MCU */}
      <Row gutter={[20, 20]}>
        <Col xs={24} md={8}>
          <Card style={{ borderRadius: 14, textAlign: "center", height: "100%" }}>
            <Title level={5} style={{ marginTop: 0, marginBottom: 16 }}>
              Statistik Kebugaran Kesehatan (Fit to Work)
            </Title>
            <Progress
              type="circle"
              percent={progress.kesehatan_kerja}
              strokeColor={{ "0%": "#0F766E", "100%": "#10B981" }}
              size={140}
              strokeWidth={10}
            />
            <Text type="secondary" style={{ display: "block", marginTop: 16, fontSize: 13 }}>
              81% Pegawai berada pada kategori kebugaran prima siap menjalankan tugas kedinasan.
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card style={{ borderRadius: 14, textAlign: "center", height: "100%" }}>
            <Title level={5} style={{ marginTop: 0, marginBottom: 16 }}>
              Statistik Pegawai Terdata MCU (Gauge)
            </Title>
            <Progress
              type="dashboard"
              percent={progress.pegawai_terdata_mcu}
              strokeColor="#0284C7"
              size={140}
              strokeWidth={10}
            />
            <Text type="secondary" style={{ display: "block", marginTop: 16, fontSize: 13 }}>
              67% dari 1.240 pegawai ANRI telah menyelesaikan tahapan Medical Check-Up tahun berjalan.
            </Text>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card style={{ borderRadius: 14, height: "100%" }}>
            <Title level={5} style={{ marginTop: 0, marginBottom: 16, textAlign: "center" }}>
              Pemeriksaan Berkala Berdasarkan Gender
            </Title>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 12 }}>
              <div>
                <Space align="center" style={{ marginBottom: 6 }}>
                  <ManOutlined style={{ fontSize: 18, color: "#0284C7" }} />
                  <Text strong>Pegawai Pria: 67% Selesai</Text>
                </Space>
                <Progress percent={progress.mcu_pria} strokeColor="#0284C7" size={["100%", 10]} />
              </div>
              <div>
                <Space align="center" style={{ marginBottom: 6 }}>
                  <WomanOutlined style={{ fontSize: 18, color: "#EC4899" }} />
                  <Text strong>Pegawai Wanita: 67% Selesai</Text>
                </Space>
                <Progress percent={progress.mcu_wanita} strokeColor="#EC4899" size={["100%", 10]} />
              </div>
            </div>
            <Text type="secondary" style={{ display: "block", marginTop: 20, fontSize: 12, textAlign: "center" }}>
              Jadwal skrining susulan dibuka setiap hari Jumat di Ruang MCU Klinik.
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Baris Grafik 4: Statistik Kunjungan Psikolog (Line Chart) */}
      <Card
        style={{ borderRadius: 14 }}
        title={
          <Space>
            <SmileOutlined style={{ color: "#7C3AED" }} />
            <span>Statistik Kunjungan Konseling Psikolog (Line Chart Tren Sesi)</span>
          </Space>
        }
      >
        <div style={{ height: 180 }}>
          <svg viewBox="0 0 500 160" style={{ width: "100%", height: "160px" }}>
            <line x1="40" y1="20" x2="480" y2="20" stroke="#E2E8F0" strokeDasharray="3 3" />
            <line x1="40" y1="80" x2="480" y2="80" stroke="#E2E8F0" strokeDasharray="3 3" />
            <line x1="40" y1="130" x2="480" y2="130" stroke="#E2E8F0" />

            <polyline
              fill="none"
              stroke="#7C3AED"
              strokeWidth="3.5"
              strokeLinecap="round"
              points="60,110 140,95 220,105 300,75 380,55 460,40"
            />

            {kunjungan_psikolog.map((item, idx) => {
              const x = 60 + idx * 80;
              const y = 130 - (item.sesi / 30) * 110;
              return (
                <g key={idx}>
                  <circle cx={x} cy={y} r="5" fill="#ffffff" stroke="#7C3AED" strokeWidth="3" />
                  <text x={x} y={y - 8} fontSize="11" fontWeight="700" textAnchor="middle" fill="#7C3AED">
                    {item.sesi}
                  </text>
                  <text x={x} y="150" fontSize="11" textAnchor="middle" fill="#64748B">
                    {item.bulan}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </Card>
    </div>
  );
};
