import React, { useRef } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Collapse,
  Carousel,
  Button,
  Space,
  Tag,
  theme,
  Image,
} from "antd";
import {
  LeftOutlined,
  RightOutlined,
  AppstoreOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import type { CarouselRef } from "antd/es/carousel";
import { mockRuangan } from "../../../providers/mock-data";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

export const InformasiRuanganPage: React.FC = () => {
  const { token } = useToken();
  const carouselRef = useRef<CarouselRef>(null);

  const interiorPhotos = [
    {
      title: "Ruang Lobi & Pendaftaran Digital",
      url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Ruang Periksa Dokter Umum",
      url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Ruang Farmasi & Penyerahan Obat",
      url: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Ruang Tindakan Medis & EKG",
      url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80",
    },
  ];

  const collapseItems = mockRuangan.map((r) => ({
    key: String(r.id),
    label: (
      <Space size="middle">
        <Tag color="teal" style={{ fontWeight: 600 }}>{r.nomor}</Tag>
        <Text strong style={{ fontSize: 14 }}>{r.nama}</Text>
      </Space>
    ),
    children: (
      <div>
        <Paragraph style={{ fontSize: 13, lineHeight: 1.6, color: token.colorTextSecondary }}>
          <strong>Fungsi Ruangan:</strong> {r.fungsi}
        </Paragraph>
        <div style={{ marginTop: 8 }}>
          <Text strong style={{ fontSize: 12, display: "block", marginBottom: 6 }}>
            Fasilitas Penunjang Tersedia:
          </Text>
          <Space wrap size={[6, 6]}>
            {r.fasilitas.map((f, idx) => (
              <Tag key={idx} icon={<CheckCircleFilled />} color="default">
                {f}
              </Tag>
            ))}
          </Space>
        </div>
        <div style={{ marginTop: 10 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Kapasitas Maksimal: <strong>{r.kapasitas}</strong>
          </Text>
        </div>
      </div>
    ),
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header Halaman: Judul "Klinik Pratama ANRI" */}
      <Card style={{ borderRadius: 14 }}>
        <Title level={2} style={{ margin: "0 0 16px 0", color: token.colorTextHeading }}>
          Klinik Pratama ANRI
        </Title>

        {/* Foto Interior Besar */}
        <div style={{ borderRadius: 12, overflow: "hidden", maxHeight: 360, marginBottom: 24 }}>
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=80"
            alt="Interior Klinik Pratama ANRI"
            style={{ width: "100%", maxHeight: 360, objectFit: "cover" }}
          />
        </div>

        {/* Tiga Paragraf Deskripsi Verbatim Sesuai Wireframe */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Paragraph style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Klinik Pratama ANRI merupakan fasilitas kesehatan tingkat pertama yang profesional, sigap,
            dan terpadu; hadir untuk melayani kebutuhan kesehatan harian pegawai, penanganan kecelakaan
            kerja, serta penyelenggaraan program kesehatan preventif di lingkungan kerja Arsip Nasional
            Republik Indonesia.
          </Paragraph>

          <Paragraph style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Didukung oleh tenaga medis kompeten dengan sistem administrasi mudah; seluruh proses
            pelayanan mulai dari registrasi antrean, konsultasi dokter, pemeriksaan laboratorium dasar,
            hingga pengambilan obat telah terintegrasi secara digital guna meminimalisir waktu tunggu pasien.
          </Paragraph>

          <Paragraph style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Kami berkomitmen menerapkan standar pelayanan dengan fokus promotif dan preventif demi
            terwujudnya lingkungan kerja yang sehat, aman, dan produktif bagi seluruh insan aparatur sipil
            negara di lingkungan ANRI.
          </Paragraph>
        </div>
      </Card>

      {/* Collapse Ruangan 1 sampai Ruangan 6 */}
      <Card
        style={{ borderRadius: 14 }}
        title={
          <Space>
            <AppstoreOutlined style={{ color: token.colorPrimary }} />
            <span>Tata Ruang & Fasilitas Klinik (Ruangan 1 s/d Ruangan 6)</span>
          </Space>
        }
      >
        <Collapse
          defaultActiveKey={["1"]}
          items={collapseItems}
          style={{ backgroundColor: token.colorBgContainer }}
        />
      </Card>

      {/* Carousel: Kumpulan Foto Interior dengan tombol navigasi */}
      <Card
        style={{ borderRadius: 14 }}
        title="Kumpulan Foto Interior Klinik"
        extra={
          <Space>
            <Button
              shape="circle"
              icon={<LeftOutlined />}
              onClick={() => carouselRef.current?.prev()}
            />
            <Button
              shape="circle"
              icon={<RightOutlined />}
              onClick={() => carouselRef.current?.next()}
            />
          </Space>
        }
      >
        <Carousel ref={carouselRef} dots autoplay slidesToShow={2} responsive={[
          { breakpoint: 768, settings: { slidesToShow: 1 } },
        ]}>
          {interiorPhotos.map((photo, idx) => (
            <div key={idx} style={{ padding: "0 8px" }}>
              <div
                style={{
                  borderRadius: 10,
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                }}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  style={{ width: "100%", height: 220, objectFit: "cover" }}
                />
                <div style={{ padding: "12px 16px", backgroundColor: token.colorBgContainer }}>
                  <Text strong style={{ fontSize: 13 }}>{photo.title}</Text>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </Card>
    </div>
  );
};
