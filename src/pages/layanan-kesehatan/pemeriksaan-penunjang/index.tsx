import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Button,
  Drawer,
  DatePicker,
  Checkbox,
  Space,
  Tag,
  Alert,
  Descriptions,
  message,
  theme,
} from "antd";
import {
  ExperimentOutlined,
  HeartOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import dayjs, { type Dayjs } from "dayjs";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

interface ILayananPenunjang {
  id: string;
  nama: string;
  ilustrasi: string;
  penjelasan: string;
  fungsi: string;
  persiapan: string;
  durasi: string;
}

export const PemeriksaanPenunjangPage: React.FC = () => {
  const { token } = useToken();
  const [selectedLayanan, setSelectedLayanan] = useState<ILayananPenunjang | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs().add(1, "day"));
  const [selectedSlot, setSelectedSlot] = useState<string>("08:00");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const slotOptions = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

  const layananList: ILayananPenunjang[] = [
    {
      id: "jantung",
      nama: "Rekam Jantung (Elektrokardiogram / EKG 12-Lead)",
      ilustrasi: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80",
      penjelasan: "Pemeriksaan non-invasif untuk memantau dan mencatat aktivitas listrik otot jantung menggunakan sadapan elektroda berstandar medis.",
      fungsi: "Mendeteksi gangguan irama jantung (aritmia), iskemia miokard, kardiomegali, dan mengevaluasi kebugaran kardiovaskular kerja.",
      persiapan: "Hindari minuman berkafein 3 jam sebelum tes. Kenakan pakaian yang mudah dibuka pada bagian dada dan pergelangan tangan/kaki. Lepaskan perhiasan logam sebelum pemeriksaan.",
      durasi: "15 - 20 Menit",
    },
    {
      id: "darah",
      nama: "Pemeriksaan Darah Perifer & Kimia Darah Dasar",
      ilustrasi: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80",
      penjelasan: "Pemeriksaan sampel darah kapiler dan vena untuk menganalisis profil hematologi lengkap serta metabolik dasar pegawai.",
      fungsi: "Mengevaluasi kadar hemoglobin (Hb), leukosit, trombosit, gula darah sewaktu/puasa (GDS/GDP), asam urat, serta kolesterol total.",
      persiapan: "Untuk pemeriksaan profil lipid dan gula darah puasa, pasien diwajibkan puasa makan selama 10 - 12 jam sebelumnya (tetap boleh minum air putih netral).",
      durasi: "10 - 15 Menit",
    },
  ];

  const handleBookingSubmit = () => {
    if (!selectedLayanan || !selectedDate || !selectedSlot || !isConfirmed) return;

    message.success(
      `Booking ${selectedLayanan.nama} berhasil dijadwalkan pada ${selectedDate.format("DD MMMM YYYY")} jam ${selectedSlot} WIB.`
    );
    setSelectedLayanan(null);
    setIsConfirmed(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header Halaman */}
      <Card style={{ borderRadius: 14 }}>
        <Title level={3} style={{ margin: "0 0 6px 0", color: token.colorTextHeading }}>
          Pemesanan Layanan Pemeriksaan Darah & Jantung
        </Title>
        <Paragraph type="secondary" style={{ fontSize: 13, margin: 0, maxWidth: 820 }}>
          Klinik Pratama ANRI menyediakan fasilitas diagnostik penunjang medis modern untuk menunjang
          kesehatan kerja preventif. Pilih jenis pemeriksaan di bawah ini untuk menentukan jadwal sesi reservasi Anda.
        </Paragraph>
      </Card>

      {/* 2 Kartu Layanan: Rekam Jantung & Darah Perifer */}
      <Row gutter={[24, 24]}>
        {layananList.map((layanan) => (
          <Col xs={24} md={12} key={layanan.id}>
            <Card
              hoverable
              style={{
                borderRadius: 14,
                overflow: "hidden",
                border: `1px solid ${token.colorBorderSecondary}`,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 14px rgba(0,0,0,0.03)",
              }}
              cover={
                <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                  <img
                    src={layanan.ilustrasi}
                    alt={layanan.nama}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <Tag
                    color={layanan.id === "jantung" ? "red" : "blue"}
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 14,
                      borderRadius: 6,
                      fontWeight: 600,
                      fontSize: 12,
                      padding: "2px 10px",
                    }}
                  >
                    {layanan.id === "jantung" ? (
                      <Space>
                        <HeartOutlined /> Rekam Jantung
                      </Space>
                    ) : (
                      <Space>
                        <ExperimentOutlined /> Laboratorium Dasar
                      </Space>
                    )}
                  </Tag>
                </div>
              }
              styles={{ body: { flex: 1, display: "flex", flexDirection: "column", padding: "20px" } }}
            >
              <Title level={4} style={{ margin: "0 0 10px 0", lineHeight: 1.3 }}>
                {layanan.nama}
              </Title>

              <Paragraph type="secondary" style={{ fontSize: 13, lineHeight: 1.6, flex: 1 }}>
                {layanan.penjelasan}
              </Paragraph>

              <div style={{ backgroundColor: token.colorBgLayout, padding: "12px", borderRadius: 8, marginBottom: 16 }}>
                <Text strong style={{ fontSize: 12, display: "block", color: token.colorPrimary }}>
                  Fungsi Utama:
                </Text>
                <Text style={{ fontSize: 12, color: token.colorTextSecondary }}>
                  {layanan.fungsi}
                </Text>
              </div>

              <Button
                type="primary"
                size="large"
                block
                icon={<CalendarOutlined />}
                onClick={() => {
                  setSelectedLayanan(layanan);
                  setIsConfirmed(false);
                }}
                style={{
                  borderRadius: 8,
                  fontWeight: 600,
                  backgroundColor: token.colorPrimary,
                  height: 42,
                }}
              >
                Mulai Booking
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Drawer: Detail Pemesanan */}
      <Drawer
        title={
          <Space>
            <SafetyCertificateOutlined style={{ color: token.colorPrimary }} />
            <span>Detail Pemesanan Pemeriksaan Penunjang</span>
          </Space>
        }
        width={580}
        placement="right"
        open={!!selectedLayanan}
        onClose={() => setSelectedLayanan(null)}
      >
        {selectedLayanan && (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <img
              src={selectedLayanan.ilustrasi}
              alt={selectedLayanan.nama}
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 10,
              }}
            />

            <Title level={4} style={{ margin: 0 }}>
              {selectedLayanan.nama}
            </Title>

            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Penjelasan Singkat">
                {selectedLayanan.penjelasan}
              </Descriptions.Item>
              <Descriptions.Item label="Fungsi Utama">
                {selectedLayanan.fungsi}
              </Descriptions.Item>
              <Descriptions.Item label="Estimasi Durasi">
                {selectedLayanan.durasi}
              </Descriptions.Item>
              <Descriptions.Item label="Persiapan Khusus">
                <Text style={{ color: "#D97706" }}>{selectedLayanan.persiapan}</Text>
              </Descriptions.Item>
            </Descriptions>

            {/* Bagian Pilih Waktu Sesi */}
            <Card
              size="small"
              bordered
              style={{ borderRadius: 10, backgroundColor: token.colorBgLayout }}
              title={
                <Space>
                  <CalendarOutlined style={{ color: token.colorPrimary }} />
                  <span>Pilih Tanggal & Waktu Sesi Booking</span>
                </Space>
              }
            >
              <div style={{ marginBottom: 14 }}>
                <Text strong style={{ display: "block", marginBottom: 6 }}>
                  Pilih Tanggal:
                </Text>
                <DatePicker
                  style={{ width: "100%" }}
                  size="middle"
                  value={selectedDate}
                  onChange={(d) => setSelectedDate(d)}
                  disabledDate={(current) =>
                    current &&
                    (current < dayjs().startOf("day") ||
                      current.day() === 0 ||
                      current.day() === 6)
                  }
                  format="dddd, DD MMMM YYYY"
                />
              </div>

              <div>
                <Text strong style={{ display: "block", marginBottom: 8 }}>
                  Pilih Jam Sesi Tersedia:
                </Text>
                <Row gutter={[8, 8]}>
                  {slotOptions.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <Col span={6} key={slot}>
                        <Button
                          size="middle"
                          block
                          type={isSelected ? "primary" : "default"}
                          onClick={() => setSelectedSlot(slot)}
                          style={{
                            borderRadius: 6,
                            fontWeight: isSelected ? 700 : 500,
                            borderColor: isSelected ? token.colorPrimary : undefined,
                          }}
                        >
                          {slot}
                        </Button>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Card>

            {/* Checkbox Keyakinan */}
            <div
              style={{
                padding: "12px 14px",
                borderRadius: 8,
                backgroundColor: token.colorBgContainer,
                border: `1px solid ${token.colorBorderSecondary}`,
              }}
            >
              <Checkbox
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
              >
                <Text strong>Saya telah membaca persiapan khusus</Text> dan menyetujui jadwal sesi
                pemeriksaan di atas.
              </Checkbox>
            </div>

            {/* Tombol Konfirmasi */}
            <Button
              type="primary"
              size="large"
              block
              disabled={!isConfirmed || !selectedDate || !selectedSlot}
              onClick={handleBookingSubmit}
              style={{
                height: 44,
                borderRadius: 8,
                fontWeight: 700,
                backgroundColor: isConfirmed ? token.colorPrimary : undefined,
              }}
            >
              Konfirmasi Pemesanan Sesi
            </Button>
          </Space>
        )}
      </Drawer>
    </div>
  );
};
