import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Steps,
  Form,
  Input,
  DatePicker,
  Button,
  Checkbox,
  Space,
  Tag,
  Alert,
  Modal,
  theme,
  Result,
} from "antd";
import {
  SmileOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import dayjs, { type Dayjs } from "dayjs";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { useToken } = theme;

export const KonselingPage: React.FC = () => {
  const { token } = useToken();
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs().add(1, "day"));
  const [selectedSession, setSelectedSession] = useState<string>("08:00");
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const availableSessions = [
    { time: "08:00", label: "08:00 - 09:30 WIB (Sesi Pagi 1)" },
    { time: "13:00", label: "13:00 - 14:30 WIB (Sesi Siang 1)" },
  ];

  const handleFinish = (values: any) => {
    if (!selectedDate || !selectedSession || !isAgreed) return;

    const data = {
      ...values,
      tanggal: selectedDate.format("DD MMMM YYYY"),
      sesi: selectedSession,
      psikolog: "Anisa Larasati, M.Psi., Psikolog",
    };
    setSubmittedData(data);
    setIsSuccessModalOpen(true);
    setCurrentStep(2);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header Info */}
      <Card style={{ borderRadius: 14 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={16}>
            <Title level={3} style={{ margin: "0 0 6px 0", color: token.colorTextHeading }}>
              Layanan Konseling Psikolog
            </Title>
            <Paragraph type="secondary" style={{ fontSize: 13, margin: 0 }}>
              Konseling kesehatan mental dan psikologi kerja pegawai ANRI bersama Psikolog Klinis.
              Sesi privat, aman, terpercaya, dan bebas biaya bagi seluruh ASN/pegawai.
            </Paragraph>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: "right" }}>
            <Tag color="purple" style={{ padding: "4px 12px", borderRadius: 8, fontSize: 12 }}>
              Ruang 5: Konseling Psikologis
            </Tag>
          </Col>
        </Row>
      </Card>

      {/* 3 Langkah Steps di Atas */}
      <Card style={{ borderRadius: 14 }}>
        <Steps
          current={currentStep}
          onChange={(step) => setCurrentStep(step)}
          items={[
            {
              title: "Informasi Klinik & BPJS",
              description: "Panduan hak & alur layanan",
              icon: <InfoCircleOutlined />,
            },
            {
              title: "Pilih Jadwal Sesi",
              description: "Kalender & waktu sesi",
              icon: <CalendarOutlined />,
            },
            {
              title: "Detail & Konfirmasi",
              description: "Data diri & persetujuan",
              icon: <CheckCircleOutlined />,
            },
          ]}
        />
      </Card>

      {/* Konten Formulir & Panduan */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          nama_pasien: "Ahmad Fauzi",
          telepon: "081234567890",
          alasan: "",
        }}
      >
        <Row gutter={[24, 24]}>
          {/* Kolom Kiri: Bagian A (Panduan Layanan & BPJS) & Bagian B (Detail Pesanan) */}
          <Col xs={24} lg={13}>
            {/* Bagian A: Panduan Layanan & BPJS (Penting) */}
            <Card
              bordered
              style={{
                borderRadius: 12,
                marginBottom: 20,
                backgroundColor: token.colorBgContainer,
              }}
              title={
                <Space>
                  <InfoCircleOutlined style={{ color: token.colorPrimary }} />
                  <span style={{ color: token.colorPrimary, fontWeight: 700 }}>
                    Panduan Layanan & BPJS (Penting)
                  </span>
                </Space>
              }
            >
              <ul style={{ paddingLeft: 18, margin: 0, fontSize: 13, lineHeight: 1.8, color: token.colorTextSecondary }}>
                <li>
                  Layanan konseling psikolog di Klinik Pratama ANRI terbuka gratis bagi seluruh
                  pegawai aktif (PNS, PPPK, dan PPNPN) serta keluarga inti terdaftar BPJS.
                </li>
                <li>
                  Kerahasiaan informasi medis dan riwayat konseling dijamin 100% berdasarkan Kode
                  Etik Psikologi Indonesia dan regulasi kerahasiaan rekam medis.
                </li>
                <li>
                  Harap hadir 10 menit sebelum waktu sesi yang dipilih untuk verifikasi presensi.
                </li>
                <li>
                  Pembatalan atau perubahan jadwal wajib diinformasikan selambatnya 1x24 jam sebelum
                  sesi berlangsung.
                </li>
              </ul>
            </Card>

            {/* Bagian B: Detail Pesanan */}
            <Card
              bordered
              style={{ borderRadius: 12 }}
              title={
                <Space>
                  <UserOutlined style={{ color: token.colorInfo }} />
                  <span>Detail Pesanan & Identitas Pasien</span>
                </Space>
              }
            >
              <Form.Item
                label="Nama Lengkap Pasien"
                name="nama_pasien"
                rules={[{ required: true, message: "Nama pasien wajib diisi!" }]}
              >
                <Input size="large" placeholder="Masukkan nama lengkap Anda" />
              </Form.Item>

              <Form.Item
                label="Nomor yang Bisa Dihubungi (WhatsApp / Telp)"
                name="telepon"
                rules={[
                  { required: true, message: "Nomor telepon wajib diisi!" },
                  { pattern: /^[0-9+\-\s]+$/, message: "Format nomor telepon tidak valid!" },
                ]}
              >
                <Input
                  size="large"
                  prefix={<PhoneOutlined style={{ color: token.colorTextSecondary }} />}
                  placeholder="Contoh: 081234567890"
                />
              </Form.Item>

              <Form.Item
                label="Alasan Konsultasi / Keluhan Utama"
                name="alasan"
                rules={[
                  { required: true, message: "Mohon tuliskan gambaran singkat keluhan Anda!" },
                  { min: 10, message: "Keluhan minimal 10 karakter agar psikolog dapat mempersiapkan sesi." },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Contoh: Merasa cemas berlebih terkait beban kerja, insomnia, atau kesulitan fokus dalam beberapa minggu terakhir..."
                />
              </Form.Item>
            </Card>
          </Col>

          {/* Kolom Kanan: Bagian C (Pilih Jadwal & Konfirmasi) */}
          <Col xs={24} lg={11}>
            <Card
              bordered
              style={{ borderRadius: 12 }}
              title={
                <Space>
                  <CalendarOutlined style={{ color: token.colorPrimary }} />
                  <span>Pilih Jadwal Sesi Konseling</span>
                </Space>
              }
            >
              {/* Pemilihan Tanggal Dinamis */}
              <div style={{ marginBottom: 18 }}>
                <Text strong style={{ display: "block", marginBottom: 8 }}>
                  Pilih Tanggal Sesi:
                </Text>
                <DatePicker
                  size="large"
                  style={{ width: "100%", borderRadius: 8 }}
                  value={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setCurrentStep(1);
                  }}
                  disabledDate={(current) => {
                    // Hanya hari kerja (Senin-Jumat) dan tidak boleh tanggal lampau
                    return (
                      current &&
                      (current < dayjs().startOf("day") ||
                        current.day() === 0 ||
                        current.day() === 6)
                    );
                  }}
                  format="dddd, DD MMMM YYYY"
                />
                <Text type="secondary" style={{ fontSize: 11, marginTop: 4, display: "block" }}>
                  * Jadwal hanya tersedia di hari kerja operasional (Senin – Jumat)
                </Text>
              </div>

              {/* Sesi Tersedia (Tombol 08:00, 13:00) */}
              <div style={{ marginBottom: 24 }}>
                <Text strong style={{ display: "block", marginBottom: 8 }}>
                  Sesi Waktu Tersedia:
                </Text>
                <Row gutter={[10, 10]}>
                  {availableSessions.map((session) => {
                    const isSelected = selectedSession === session.time;
                    return (
                      <Col span={12} key={session.time}>
                        <Button
                          size="large"
                          block
                          type={isSelected ? "primary" : "default"}
                          icon={<ClockCircleOutlined />}
                          onClick={() => {
                            setSelectedSession(session.time);
                            setCurrentStep(1);
                          }}
                          style={{
                            height: 48,
                            borderRadius: 8,
                            borderColor: isSelected ? token.colorPrimary : token.colorBorder,
                            fontWeight: isSelected ? 700 : 500,
                          }}
                        >
                          {session.time} WIB
                        </Button>
                      </Col>
                    );
                  })}
                </Row>
                <Text type="secondary" style={{ fontSize: 12, marginTop: 6, display: "block" }}>
                  Durasi per sesi konseling adalah 60 - 90 menit tatap muka langsung di Ruang Konseling.
                </Text>
              </div>

              {/* Checkbox Keyakinan */}
              <div
                style={{
                  backgroundColor: token.colorBgLayout,
                  padding: "14px 16px",
                  borderRadius: 8,
                  marginBottom: 20,
                }}
              >
                <Checkbox
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  style={{ fontSize: 13, lineHeight: 1.5 }}
                >
                  <Text strong>Centang jika sudah yakin</Text> dengan data dan jadwal sesi yang Anda
                  pilih di atas.
                </Checkbox>
              </div>

              {/* Tombol Konfirmasi (Disabled sampai form valid + checkbox dicentang) */}
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                disabled={!isAgreed || !selectedDate || !selectedSession}
                style={{
                  height: 46,
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 15,
                  backgroundColor: isAgreed ? token.colorPrimary : undefined,
                }}
              >
                Konfirmasi Booking Konseling
              </Button>
            </Card>
          </Col>
        </Row>
      </Form>

      {/* Modal Sukses Booking */}
      <Modal
        open={isSuccessModalOpen}
        onCancel={() => setIsSuccessModalOpen(false)}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() => {
              setIsSuccessModalOpen(false);
              form.resetFields();
              setIsAgreed(false);
            }}
          >
            Selesai
          </Button>,
        ]}
        centered
        width={520}
      >
        <Result
          status="success"
          title="Booking Konseling Berhasil Didaftarkan!"
          subTitle={
            submittedData && (
              <div style={{ textAlign: "left", marginTop: 12 }}>
                <p><strong>Nama:</strong> {submittedData.nama_pasien}</p>
                <p><strong>Tanggal:</strong> {submittedData.tanggal}</p>
                <p><strong>Waktu Sesi:</strong> {submittedData.sesi} WIB</p>
                <p><strong>Konselor:</strong> {submittedData.psikolog}</p>
                <p><strong>Lokasi:</strong> Ruang 5 (Konseling Psikolog) Klinik Pratama ANRI</p>
                <Alert
                  message="Konfirmasi WhatsApp"
                  description="Jadwal pengingat otomatis telah dikirimkan ke nomor WhatsApp yang terdaftar."
                  type="info"
                  showIcon
                  style={{ marginTop: 12 }}
                />
              </div>
            )
          }
        />
      </Modal>
    </div>
  );
};
