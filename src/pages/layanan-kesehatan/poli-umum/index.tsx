import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Steps,
  Tag,
  Button,
  Descriptions,
  Space,
  theme,
  Image,
  message,
  Grid,
} from "antd";
import {
  MedicineBoxOutlined,
  FileDoneOutlined,
  SendOutlined,
  DownloadOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined,
  CheckCircleFilled,
  PrinterOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

export const PoliUmumPage: React.FC = () => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleDownload = (docName: string) => {
    message.success(`Dokumen ${docName} berhasil diunduh (PDF Berstempel Digital).`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Banner: Flyer Layanan Poli Umum */}
      <Card
        style={{
          background: "linear-gradient(135deg, #0F766E 0%, #1E3A8A 100%)",
          borderRadius: 14,
          border: "none",
          color: "#ffffff",
          boxShadow: "0 6px 20px rgba(15, 118, 110, 0.2)",
          overflow: "hidden",
        }}
        styles={{ body: { padding: "28px 24px" } }}
      >
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={16}>
            <Tag
              color="cyan"
              style={{
                borderRadius: 10,
                padding: "2px 10px",
                fontSize: 11,
                fontWeight: 600,
                marginBottom: 8,
                border: "none",
              }}
            >
              Fasilitas Pelayanan Primer ANRI
            </Tag>
            <Title level={2} style={{ color: "#ffffff", margin: "4px 0 8px 0" }}>
              Flyer Layanan Poli Umum
            </Title>
            <Paragraph
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: 14,
                lineHeight: 1.6,
                maxWidth: 640,
                marginBottom: 0,
              }}
            >
              Poli Umum Klinik Pratama ANRI melayani konsultasi rawat jalan, tindakan medis dasar,
              penerbitan surat keterangan kesehatan pegawai, serta rujukan berjenjang ke rumah sakit
              rekanan secara cepat, nyaman, dan profesional.
            </Paragraph>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: "center" }}>
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80"
              alt="Dokter Poli Umum"
              style={{
                maxWidth: 180,
                borderRadius: 12,
                boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
              }}
            />
          </Col>
        </Row>
      </Card>

      {/* 3 Kartu Bernomor yang Bisa Diklik */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card
            hoverable
            onClick={() => setActiveTab(1)}
            style={{
              borderRadius: 12,
              cursor: "pointer",
              transition: "all 0.3s ease",
              borderColor: activeTab === 1 ? token.colorPrimary : token.colorBorderSecondary,
              backgroundColor: activeTab === 1 ? (token.colorBgContainer) : undefined,
              boxShadow: activeTab === 1 ? `0 4px 14px ${token.colorPrimary}22` : undefined,
              borderWidth: activeTab === 1 ? 2 : 1,
            }}
          >
            <Space align="center" size="middle">
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  backgroundColor: activeTab === 1 ? token.colorPrimary : "#F1F5F9",
                  color: activeTab === 1 ? "#ffffff" : "#475569",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                1
              </div>
              <div>
                <Text strong style={{ fontSize: 15, display: "block" }}>
                  Konsultasi & Pengobatan
                </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Pemeriksaan langsung dokter
                </Text>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            hoverable
            onClick={() => setActiveTab(2)}
            style={{
              borderRadius: 12,
              cursor: "pointer",
              transition: "all 0.3s ease",
              borderColor: activeTab === 2 ? token.colorPrimary : token.colorBorderSecondary,
              backgroundColor: activeTab === 2 ? (token.colorBgContainer) : undefined,
              boxShadow: activeTab === 2 ? `0 4px 14px ${token.colorPrimary}22` : undefined,
              borderWidth: activeTab === 2 ? 2 : 1,
            }}
          >
            <Space align="center" size="middle">
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  backgroundColor: activeTab === 2 ? token.colorPrimary : "#F1F5F9",
                  color: activeTab === 2 ? "#ffffff" : "#475569",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                2
              </div>
              <div>
                <Text strong style={{ fontSize: 15, display: "block" }}>
                  Penerbitan SK Sehat/Sakit
                </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Surat keterangan medis resmi
                </Text>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            hoverable
            onClick={() => setActiveTab(3)}
            style={{
              borderRadius: 12,
              cursor: "pointer",
              transition: "all 0.3s ease",
              borderColor: activeTab === 3 ? token.colorPrimary : token.colorBorderSecondary,
              backgroundColor: activeTab === 3 ? (token.colorBgContainer) : undefined,
              boxShadow: activeTab === 3 ? `0 4px 14px ${token.colorPrimary}22` : undefined,
              borderWidth: activeTab === 3 ? 2 : 1,
            }}
          >
            <Space align="center" size="middle">
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  backgroundColor: activeTab === 3 ? token.colorPrimary : "#F1F5F9",
                  color: activeTab === 3 ? "#ffffff" : "#475569",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                3
              </div>
              <div>
                <Text strong style={{ fontSize: 15, display: "block" }}>
                  Rujukan Faskes Lanjutan
                </Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Surat rujukan spesialis & RS
                </Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Konten 2a: Konsultasi dan Pengobatan */}
      {activeTab === 1 && (
        <Card style={{ borderRadius: 14 }}>
          <Title level={4} style={{ marginBottom: 6 }}>
            Konsultasi & Pengobatan
          </Title>
          <Paragraph type="secondary" style={{ fontSize: 14, marginBottom: 20 }}>
            Layanan pemeriksaan kesehatan oleh dokter umum secara langsung di Klinik Pratama ANRI.
          </Paragraph>

          {/* Chips Pengingat Persyaratan */}
          <Space size="middle" wrap style={{ marginBottom: 28 }}>
            <Tag
              icon={<IdcardOutlined />}
              color="processing"
              style={{ padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}
            >
              Bawa Kartu Identitas
            </Tag>
            <Tag
              icon={<SafetyCertificateOutlined />}
              color="success"
              style={{ padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}
            >
              Bawa Kartu BPJS
            </Tag>
          </Space>

          {/* Steps: Alur Berobat di Klinik Pratama ANRI */}
          <div
            style={{
              backgroundColor: token.colorBgLayout,
              padding: "24px 20px",
              borderRadius: 12,
              marginBottom: 28,
            }}
          >
            <Title level={5} style={{ marginTop: 0, marginBottom: 20, color: token.colorPrimary }}>
              Alur Berobat di Klinik Pratama ANRI
            </Title>
            <Steps
              current={2}
              direction={screens.md ? "horizontal" : "vertical"}
              labelPlacement={screens.md ? "vertical" : "horizontal"}
              style={{ width: "100%" }}
              items={[
                { title: "Ambil Antrean", description: "Tiket digital di mesin lobi" },
                { title: "Registrasi", description: "Validasi data pegawai / NIP" },
                { title: "Pemeriksaan Awal", description: "Tensi, suhu & tanda vital" },
                { title: "Konsultasi Dokter", description: "Anamnesis & diagnosis" },
                { title: "Tindakan / Resep", description: "Perawatan & resep obat" },
                { title: "Farmasi / Selesai", description: "Pengambilan obat" },
              ]}
            />
          </div>

          {/* Dua Kartu Penjelasan Singkat Berdampingan */}
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card
                bordered
                style={{
                  borderRadius: 10,
                  backgroundColor: token.colorBgContainer,
                }}
              >
                <Title level={5} style={{ marginTop: 0, color: token.colorTextHeading }}>
                  Penjelasan Singkat: Standar Pelayanan Rawat Jalan
                </Title>
                <Paragraph type="secondary" style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 0 }}>
                  Setiap pegawai ANRI berhak mendapatkan pelayanan medis dasar yang komprehensif, mencakup
                  promotif, preventif, kuratif, dan rehabilitatif. Dokter bertugas melakukan pencatatan
                  rekam medis elektronik yang tersinkronisasi dengan database kepegawaian untuk menjamin
                  kontinuitas perawatan dan keselamatan kerja pegawai.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                bordered
                style={{
                  borderRadius: 10,
                  backgroundColor: token.colorBgContainer,
                }}
              >
                <Title level={5} style={{ marginTop: 0, color: token.colorTextHeading }}>
                  Penjelasan Singkat: Ketersediaan Obat & Terapi
                </Title>
                <Paragraph type="secondary" style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 0 }}>
                  Terapi medikamentosa yang diresepkan disediakan secara cuma-cuma melalui Instalasi
                  Farmasi Klinik Pratama ANRI sesuai Formularium Nasional dan Formularium Klinik. Apoteker
                  akan memberikan edukasi lengkap mengenai dosis, aturan pakai, dan kemungkinan efek
                  samping demi kepatuhan konsumsi obat pasien.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </Card>
      )}

      {/* Konten 2b: Penerbitan SK Sehat/Sakit */}
      {activeTab === 2 && (
        <Card style={{ borderRadius: 14 }}>
          <Title level={4} style={{ marginBottom: 18 }}>
            Penerbitan Surat Keterangan Sehat / Sakit
          </Title>
          <Row gutter={[16, 16]}>
            {/* Kolom Kiri: Preview Foto Dokumen + Unduh */}
            <Col xs={24} sm={24} md={10} lg={9}>
              <Card
                bordered
                style={{
                  borderRadius: 12,
                  textAlign: "center",
                  backgroundColor: token.colorBgLayout,
                }}
              >
                <div style={{ marginBottom: 16 }}>
                  <Image
                    src="https://images.unsplash.com/photo-1568667256549-094345857637?w=600&auto=format&fit=crop&q=80"
                    alt="Foto Dokumen SK Sehat"
                    style={{
                      borderRadius: 8,
                      maxHeight: 280,
                      objectFit: "cover",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                </div>
                <Text strong style={{ display: "block", marginBottom: 4 }}>
                  SK Sehat No: 445/098/KLINIK-ANRI/X/2026
                </Text>
                <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 16 }}>
                  Dokumen sah berstempel digital Klinik Pratama ANRI
                </Text>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={() => handleDownload("SK Sehat")}
                  style={{ width: "100%", borderRadius: 8 }}
                >
                  Unduh Dokumen PDF
                </Button>
              </Card>
            </Col>

            {/* Kolom Kanan: Hasil Pengecekan Kesehatan Pegawai (Descriptions) */}
            <Col xs={24} sm={24} md={14} lg={15}>
              <Card
                bordered
                style={{ borderRadius: 12 }}
                title={
                  <Space>
                    <CheckCircleFilled style={{ color: token.colorPrimary }} />
                    <span>Hasil Pengecekan Kesehatan Pegawai</span>
                  </Space>
                }
              >
                <Descriptions
                  bordered
                  layout="vertical"
                  column={1}
                  size="small"
                  style={{ width: "100%" }}
                  styles={{
                    label: { fontWeight: 600 },
                    content: { overflowWrap: "anywhere", whiteSpace: "normal" },
                  }}
                >
                  <Descriptions.Item label="Nama Pegawai">
                    Ahmad Fauzi (NIP. 198804152011011002)
                  </Descriptions.Item>
                  <Descriptions.Item label="TB / BB">
                    172 cm / 68 kg (BMI: 23.0 Normal)
                  </Descriptions.Item>
                  <Descriptions.Item label="Tanggal Lahir">
                    15 April 1988 (Usia 38 Tahun)
                  </Descriptions.Item>
                  <Descriptions.Item label="Jenis Kelamin">
                    Laki-laki
                  </Descriptions.Item>
                  <Descriptions.Item label="Tekanan Darah">
                    120/80 mmHg (Normotensi)
                  </Descriptions.Item>
                  <Descriptions.Item label="Tes Buta Warna">
                    Negatif (Normal Ishihara 14 Plate)
                  </Descriptions.Item>
                  <Descriptions.Item label="Tes Darah">
                    Hb: 14.8 g/dL, Leukosit: 7.200 /uL
                  </Descriptions.Item>
                  <Descriptions.Item label="Golongan Darah">
                    O Rhesus (+)
                  </Descriptions.Item>
                  <Descriptions.Item label="Riwayat Penyakit">
                    Alergi Dingin, Tidak ada riwayat hipertensi
                  </Descriptions.Item>
                  <Descriptions.Item label="Suhu Tubuh">
                    36.5 °C (Afebris)
                  </Descriptions.Item>
                  <Descriptions.Item label="Dokter Pemeriksa">
                    dr. Hendra Pratama, Sp.Ok (SIP. 445/002/K3)
                  </Descriptions.Item>
                  <Descriptions.Item label="Hasil Tes">
                    <Tag color="green" style={{ fontSize: 13, padding: "2px 8px" }}>
                      Sehat (Fit to Work)
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Keterangan">
                    Pegawai dalam kondisi fisik prima dan sehat jasmani untuk menjalankan tugas kedinasan, perjalanan dinas luar kota, serta aktivitas kerja sehari-hari.
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </Card>
      )}

      {/* Konten 2c: Penerbitan Surat Rujukan */}
      {activeTab === 3 && (
        <Card style={{ borderRadius: 14 }}>
          <Title level={4} style={{ marginBottom: 18 }}>
            Penerbitan Surat Rujukan Faskes Lanjutan
          </Title>
          <Row gutter={[16, 16]}>
            {/* Kolom Kiri: Preview Dokumen Rujukan + Unduh */}
            <Col xs={24} sm={24} md={10} lg={9}>
              <Card
                bordered
                style={{
                  borderRadius: 12,
                  textAlign: "center",
                  backgroundColor: token.colorBgLayout,
                }}
              >
                <div style={{ marginBottom: 16 }}>
                  <Image
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80"
                    alt="Foto Dokumen Surat Rujukan"
                    style={{
                      borderRadius: 8,
                      maxHeight: 280,
                      objectFit: "cover",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                </div>
                <Text strong style={{ display: "block", marginBottom: 4 }}>
                  Surat Rujukan No: 445/RUJ-041/ANRI/X/2026
                </Text>
                <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 16 }}>
                  Rujukan ke Poli Spesialis Bedah Orthopedi RS Fatmawati
                </Text>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={() => handleDownload("Surat Rujukan")}
                  style={{ width: "100%", borderRadius: 8 }}
                >
                  Unduh Dokumen PDF
                </Button>
              </Card>
            </Col>

            {/* Kolom Kanan: Data Pasien Rujukan (Descriptions) */}
            <Col xs={24} sm={24} md={14} lg={15}>
              <Card
                bordered
                style={{ borderRadius: 12 }}
                title={
                  <Space>
                    <SendOutlined style={{ color: token.colorInfo }} />
                    <span>Data Pasien & Lembar Rekomendasi Rujukan</span>
                  </Space>
                }
              >
                <Descriptions
                  bordered
                  layout="vertical"
                  column={1}
                  size="small"
                  style={{ width: "100%" }}
                  styles={{
                    label: { fontWeight: 600 },
                    content: { overflowWrap: "anywhere", whiteSpace: "normal" },
                  }}
                >
                  <Descriptions.Item label="Nama Pegawai">
                    Budi Santoso (NIP. 199201102014021001)
                  </Descriptions.Item>
                  <Descriptions.Item label="TB / BB">
                    168 cm / 72 kg
                  </Descriptions.Item>
                  <Descriptions.Item label="Tanggal Lahir">
                    10 Januari 1992 (Usia 34 Tahun)
                  </Descriptions.Item>
                  <Descriptions.Item label="Pemeriksaan Fisik">
                    Nyeri tekan hebat lumbal L4-L5, spasme otot erector spinae, tes Lasegue positif (+).
                  </Descriptions.Item>
                  <Descriptions.Item label="Pemeriksaan Penunjang">
                    Roentgen Lumbal AP/Lat terindikasi penyempitan diskus intervertebralis.
                  </Descriptions.Item>
                  <Descriptions.Item label="Diagnosis">
                    Suspect Hernia Nukleus Pulposus (HNP) Lumbalis ec Cedera Ergonomis Angkat Beban
                  </Descriptions.Item>
                  <Descriptions.Item label="Riwayat Penyakit">
                    Riwayat LBP kambuhan saat mobilisasi boks arsip berat.
                  </Descriptions.Item>
                  <Descriptions.Item label="Tindakan yang Telah Dilakukan">
                    Pemberian analgesik oral Ibuprofen 400mg 3x1, rest fisiologis, edukasi pembatasan gerak membungkuk.
                  </Descriptions.Item>
                  <Descriptions.Item label="Dokter Pemeriksa">
                    dr. Hendra Pratama, Sp.Ok (SIP. 445/002/K3)
                  </Descriptions.Item>
                  <Descriptions.Item label="Alasan Dirujuk">
                    Memerlukan pemeriksaan MRI Lumbal dan tatalaksana komprehensif spesialis Orthopedi & Rehabilitasi Medik.
                  </Descriptions.Item>
                  <Descriptions.Item label="Keterangan">
                    Mohon evaluasi dan penanganan spesifik lanjutan terhadap pasien tersebut di Faskes Rujukan Tingkat Lanjut (FKRTL). Pasien dirujuk dalam kondisi hemodinamik stabil.
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};
