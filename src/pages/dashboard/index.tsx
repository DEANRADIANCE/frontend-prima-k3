import React from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Carousel,
  Button,
  Space,
  Tag,
  theme,
} from "antd";
import {
  MedicineBoxOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
  NotificationOutlined,
  ExperimentOutlined,
  SmileOutlined,
  FileProtectOutlined,
  SafetyCertificateOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

export const DashboardPage: React.FC = () => {
  const { token } = useToken();
  const navigate = useNavigate();

  // Data Slide Carousel
  const slides = [
    {
      id: 1,
      // title: "Pemeriksaan Kesehatan Berkala (MCU) Pegawai ANRI 2026",
       title: "Pemeriksaan Kesehatan Berkala (MCU) Pegawai ANRI 2026",
      subtitle:
        "Tingkatkan kebugaran kerja dengan skrining kesehatan menyeluruh: tes darah rutin, fungsi organ, dan rekam jantung EKG.",
      tag: "Program K3 Unggulan",
      bg: "linear-gradient(135deg, #0F766E 0%, #115E59 100%)",
      img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80",
      cta: "Poli Umum",
      link: "/layanan-kesehatan/poli-umum",
    },
    {
      id: 2,
      title: "Konseling Kesehatan Mental & Psikologi Kerja",
      subtitle:
        "Dukungan penuh kesejahteraan psikologis pegawai. Konsultasi privat bersama Psikolog Klinis ANRI, ramah dan rahasia.",
      tag: "Layanan Konseling",
      bg: "linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
      cta: "Jadwalkan Konseling",
      link: "/layanan-kesehatan/konseling",
    },
    {
      id: 3,
      title: "Penerbitan Surat Keterangan Sehat & Validasi SK Sakit",
      subtitle:
        "Pelayanan administrasi kesehatan terintegrasi berbasis digital. Cepat, akurat, dan terverifikasi dokter ber-SIP.",
      tag: "Administrasi Medis",
      bg: "linear-gradient(135deg, #0369A1 0%, #0F766E 100%)",
      img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
      cta: "Cek Layanan Poli",
      link: "/layanan-kesehatan/poli-umum",
    },
  ];

  // 3 Kartu Pendek (Pengumuman / Info)
  const shortCards = [
    {
      id: 1,
      tag: "PENGUMUMAN",
      tagColor: "blue",
      title: "Jadwal Pelayanan Farmasi & Pengambilan Obat Rutin",
      desc: "Instalasi Farmasi beroperasi Senin-Jumat pukul 07.30 - 16.00 WIB. Konsultasi obat dengan Apoteker tersedia setiap hari kerja.",
      icon: <MedicineBoxOutlined style={{ color: "#0F766E", fontSize: 24 }} />,
    },
    {
      id: 2,
      tag: "KEBIJAKAN K3",
      tagColor: "orange",
      title: "Prosedur Pelaporan Kecelakaan Kerja 1x24 Jam",
      desc: "Setiap insiden near-miss maupun cedera kerja di lingkungan ANRI wajib dilaporkan ke Posko K3 Klinik Pratama untuk penanganan dini.",
      icon: <SafetyCertificateOutlined style={{ color: "#D97706", fontSize: 24 }} />,
    },
    {
      id: 3,
      tag: "JADWAL DOKTER",
      tagColor: "green",
      title: "Layanan Dokter Spesialis Kedokteran Kerja (Sp.Ok)",
      desc: "Konsultasi kelaikan kerja (Fit to Work) dan penyakit akibat kerja (PAK) bersama dr. Hendra Pratama, Sp.Ok setiap Senin, Rabu, Jumat.",
      icon: <CheckCircleFilled style={{ color: "#10B981", fontSize: 24 }} />,
    },
  ];

  // 3 Kartu Tinggi (Berita & Media Terbaru)
  const tallCards = [
    {
      id: 1,
      title: "Tips Mengatasi Mata Lelah (Computer Vision Syndrome) di Kantor",
      date: "12 Oktober 2026",
      kategori: "Ergonomi & K3",
      image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=600&auto=format&fit=crop&q=80",
      desc: "Bekerja di depan monitor komputer berjam-jam sering memicu mata kering dan buram. Terapkan metode 20-20-20: istirahatkan mata setiap 20 menit dengan memandang 20 kaki jauhnya selama 20 detik.",
      link: "/informasi-media/edukasi-kesehatan",
    },
    {
      id: 2,
      title: "Sosialisasi Gerakan Pekerja Sehat ANRI (GPS-ANRI) Tahun 2026",
      date: "08 Oktober 2026",
      kategori: "Kebugaran Fisik",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80",
      desc: "Klinik Pratama ANRI menggelar peregangan aktif bersama pegawai di lobi utama. Kegiatan ini dirancang guna mencegah keluhan muskuloskeletal dan meningkatkan fokus kerja ASN.",
      link: "/informasi-media/flyer-poster",
    },
    {
      id: 3,
      title: "Pentingnya Menjaga Hidrasi & Pola Makan Sehat di Ruang Kerja Ber-AC",
      date: "02 Oktober 2026",
      kategori: "Gizi & Imunitas",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
      desc: "Suhu ruangan dingin sering menekan rasa haus. Pastikan asupan 2 liter air mineral per hari terpenuhi untuk menjaga konsentrasi, stabilitas metabolisme, dan kekebalan tubuh.",
      link: "/informasi-media/edukasi-kesehatan",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* 1. Carousel Besar: Informasi Terkini Terkait Klinik Pratama ANRI */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <Space align="center">
            <NotificationOutlined style={{ color: token.colorPrimary, fontSize: 20 }} />
            <Title level={4} style={{ margin: 0 }}>
              Informasi Terkini Terkait Klinik Pratama ANRI
            </Title>
          </Space>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Portal Pelayanan Kesehatan & K3 Resmi
          </Text>
        </div>

        <Carousel autoplay effect="fade">
          {slides.map((s) => (
            <div key={s.id}>
              <Card
                style={{
                  background: s.bg,
                  borderRadius: 14,
                  border: "none",
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(15, 118, 110, 0.2)",
                  color: "#ffffff",
                }}
                styles={{ body: { padding: "36px 32px" } }}
              >
                <Row gutter={[24, 24]} align="middle">
                  <Col xs={24} lg={15}>
                    <Tag
                      color="cyan"
                      style={{
                        borderRadius: 12,
                        padding: "4px 12px",
                        fontSize: 12,
                        fontWeight: 600,
                        marginBottom: 12,
                        border: "none",
                      }}
                    >
                      {s.tag}
                    </Tag>
                    <Title level={2} style={{ color: "#ffffff", margin: "6px 0 12px 0", lineHeight: 1.25 }}>
                      {s.title}
                    </Title>
                    <Paragraph
                      style={{
                        color: "rgba(255, 255, 255, 0.9)",
                        fontSize: 15,
                        lineHeight: 1.6,
                        maxWidth: 620,
                        marginBottom: 24,
                      }}
                    >
                      {s.subtitle}
                    </Paragraph>
                    <Space size="middle">
                      <Button
                        type="primary"
                        size="large"
                        style={{
                          backgroundColor: "#ffffff",
                          color: "#0F766E",
                          fontWeight: 700,
                          borderRadius: 8,
                          borderColor: "#ffffff",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        }}
                        onClick={() => navigate(s.link)}
                      >
                        {s.cta} <ArrowRightOutlined />
                      </Button>
                    </Space>
                  </Col>
                  <Col xs={24} lg={9} style={{ textAlign: "center" }}>
                    <img
                      src={s.img}
                      alt={s.title}
                      style={{
                        maxWidth: "100%",
                        maxHeight: 220,
                        borderRadius: 12,
                        objectFit: "cover",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                      }}
                    />
                  </Col>
                </Row>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Shortcut Layanan Utama */}
      <div>
        <Title level={5} style={{ marginBottom: 12 }}>
          Akses Cepat Layanan Utama
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Link to="/layanan-kesehatan/poli-umum">
              <Card
                hoverable
                style={{ textAlign: "center", borderRadius: 12, border: `1px solid ${token.colorBorderSecondary}` }}
                styles={{ body: { padding: "18px 12px" } }}
              >
                <MedicineBoxOutlined style={{ fontSize: 28, color: token.colorPrimary, marginBottom: 8 }} />
                <Text strong style={{ display: "block", fontSize: 13 }}>Poli Umum</Text>
                <Text type="secondary" style={{ fontSize: 11 }}>Konsultasi & SK Sehat</Text>
              </Card>
            </Link>
          </Col>
          <Col xs={12} sm={6}>
            <Link to="/layanan-kesehatan/farmasi">
              <Card
                hoverable
                style={{ textAlign: "center", borderRadius: 12, border: `1px solid ${token.colorBorderSecondary}` }}
                styles={{ body: { padding: "18px 12px" } }}
              >
                <ExperimentOutlined style={{ fontSize: 28, color: "#0284C7", marginBottom: 8 }} />
                <Text strong style={{ display: "block", fontSize: 13 }}>Daftar Obat</Text>
                <Text type="secondary" style={{ fontSize: 11 }}>Katalog & Info Dosis</Text>
              </Card>
            </Link>
          </Col>
          <Col xs={12} sm={6}>
            <Link to="/layanan-kesehatan/konseling">
              <Card
                hoverable
                style={{ textAlign: "center", borderRadius: 12, border: `1px solid ${token.colorBorderSecondary}` }}
                styles={{ body: { padding: "18px 12px" } }}
              >
                <SmileOutlined style={{ fontSize: 28, color: "#7C3AED", marginBottom: 8 }} />
                <Text strong style={{ display: "block", fontSize: 13 }}>Konseling Psikolog</Text>
                <Text type="secondary" style={{ fontSize: 11 }}>Booking Sesi Privat</Text>
              </Card>
            </Link>
          </Col>
          <Col xs={12} sm={6}>
            <Link to="/fasilitas-kesehatan/perizinan">
              <Card
                hoverable
                style={{ textAlign: "center", borderRadius: 12, border: `1px solid ${token.colorBorderSecondary}` }}
                styles={{ body: { padding: "18px 12px" } }}
              >
                <FileProtectOutlined style={{ fontSize: 28, color: "#059669", marginBottom: 8 }} />
                <Text strong style={{ display: "block", fontSize: 13 }}>Perizinan Faskes</Text>
                <Text type="secondary" style={{ fontSize: 11 }}>Legalitas SIO & SIP</Text>
              </Card>
            </Link>
          </Col>
        </Row>
      </div>

      {/* 2. Baris 3 Kartu Pendek (Info & Pengumuman) */}
      <div>
        <Title level={4} style={{ marginBottom: 14 }}>
          Pengumuman & Maklumat Pelayanan
        </Title>
        <Row gutter={[16, 16]}>
          {shortCards.map((c) => (
            <Col xs={24} md={8} key={c.id}>
              <Card
                hoverable
                style={{
                  height: "100%",
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                  borderTop: `3px solid ${c.tagColor === "blue" ? "#0284C7" : c.tagColor === "orange" ? "#D97706" : "#10B981"}`,
                }}
              >
                <Space align="start" size="middle">
                  {c.icon}
                  <div>
                    <Tag color={c.tagColor} style={{ borderRadius: 6, fontWeight: 600, fontSize: 11, marginBottom: 6 }}>
                      {c.tag}
                    </Tag>
                    <Text strong style={{ fontSize: 14, display: "block", color: token.colorTextHeading, lineHeight: 1.3 }}>
                      {c.title}
                    </Text>
                    <Paragraph type="secondary" style={{ fontSize: 12, marginTop: 6, marginBottom: 0, lineHeight: 1.5 }}>
                      {c.desc}
                    </Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* 3. Baris 3 Kartu Tinggi (Berita Terbaru) */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <Title level={4} style={{ margin: 0 }}>
            Berita & Publikasi Kesehatan Terbaru
          </Title>
          <Link to="/informasi-media/edukasi-kesehatan">
            <Button type="link" icon={<ArrowRightOutlined />}>
              Lihat Semua Artikel
            </Button>
          </Link>
        </div>
        <Row gutter={[20, 20]}>
          {tallCards.map((b) => (
            <Col xs={24} md={8} key={b.id}>
              <Card
                hoverable
                cover={
                  <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
                    <img
                      src={b.image}
                      alt={b.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                    />
                    <Tag
                      color="teal"
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        borderRadius: 6,
                        backgroundColor: "rgba(15, 118, 110, 0.9)",
                        color: "#ffffff",
                        border: "none",
                        fontWeight: 600,
                      }}
                    >
                      {b.kategori}
                    </Tag>
                  </div>
                }
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                }}
                styles={{ body: { flex: 1, display: "flex", flexDirection: "column" } }}
              >
                <Space size="small" style={{ marginBottom: 6 }}>
                  <CalendarOutlined style={{ fontSize: 12, color: token.colorTextSecondary }} />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {b.date}
                  </Text>
                </Space>

                <Title level={5} style={{ margin: "4px 0 8px 0", lineHeight: 1.35, flexGrow: 0 }}>
                  {b.title}
                </Title>

                <Paragraph
                  type="secondary"
                  ellipsis={{ rows: 3 }}
                  style={{ fontSize: 13, lineHeight: 1.55, flexGrow: 1, marginBottom: 14 }}
                >
                  {b.desc}
                </Paragraph>

                <Link to={b.link}>
                  <Button type="link" style={{ padding: 0, fontWeight: 600, color: token.colorPrimary }}>
                    Baca Selengkapnya →
                  </Button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
