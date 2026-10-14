import React, { useState } from "react";
import { useLogin } from "@refinedev/core";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Alert,
  Space,
  Tag,
  theme,
  Divider,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MedicineBoxOutlined,
  SafetyCertificateOutlined,
  ThunderboltFilled,
  PlusCircleFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { DoctorBriefcaseAnimation } from "./DoctorBriefcaseAnimation";

const { Title, Text, Paragraph } = Typography;

export const LoginPage: React.FC = () => {
  const { token } = theme.useToken();
  const { mutate: login, isPending } = useLogin();
  const [form] = Form.useForm();

  const [focusedField, setFocusedField] = useState<
    "none" | "username" | "password" | "submitting"
  >("none");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = (values: { username?: string; password?: string }) => {
    setFocusedField("submitting");
    setErrorMessage(null);

    login(values, {
      onSuccess: () => {
        setIsSuccess(true);
      },
      onError: (error: any) => {
        setFocusedField("none");
        setErrorMessage(
          error?.message || "Kombinasi akun salah. Silakan gunakan admin / admin."
        );
      },
    });
  };

  const handleQuickFill = () => {
    form.setFieldsValue({
      username: "admin",
      password: "admin",
    });
    setErrorMessage(null);
    setFocusedField("none");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(circle at 10% 20%, rgba(5, 150, 105, 0.12) 0%, rgba(16, 185, 129, 0.05) 50%, rgba(248, 250, 252, 1) 90%)`,
        padding: "24px 16px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decorative Cross / Medical Grid */}
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main Login Card */}
      <Card
        style={{
          width: "100%",
          maxWidth: 960,
          borderRadius: 24,
          boxShadow: "0 20px 45px -12px rgba(15, 118, 110, 0.16), 0 8px 16px -8px rgba(0,0,0,0.06)",
          border: "1px solid rgba(5, 150, 105, 0.15)",
          overflow: "hidden",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          }}
        >
          {/* Left Column: Interactive Doctor & Briefcase Animation */}
          <div
            style={{
              padding: "40px 32px",
              background: "linear-gradient(145deg, #f0fdf4 0%, #ecfdf5 50%, #e0f2fe 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRight: "1px solid rgba(5, 150, 105, 0.12)",
              position: "relative",
            }}
          >
            {/* Top Brand Tag */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  backgroundColor: "#059669",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: 18,
                  boxShadow: "0 2px 8px rgba(5, 150, 105, 0.3)",
                }}
              >
                <PlusCircleFilled />
              </div>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: 16,
                  color: "#065f46",
                  letterSpacing: 0.8,
                }}
              >
                PRIMA K3 MEDIKA
              </span>
            </div>

            {/* Doctor Opening Briefcase Interactive Canvas */}
            <DoctorBriefcaseAnimation
              focusedField={focusedField}
              isSuccess={isSuccess}
            />

            {/* Subtitle / Feature Points */}
            <div style={{ marginTop: 20, textAlign: "center", maxWidth: 360 }}>
              <Text strong style={{ color: "#0f766e", fontSize: 14 }}>
                Sistem Informasi & Manajemen Klinik K3
              </Text>
              <Paragraph
                type="secondary"
                style={{ fontSize: 12, marginTop: 4, marginBottom: 12 }}
              >
                Pemeriksaan Medical Check-Up, Riwayat Rekam Medis Karyawan, dan Surat Sakit Digital Terpadu.
              </Paragraph>
              <Space size={[6, 6]} wrap style={{ justifyContent: "center" }}>
                <Tag color="success" icon={<SafetyCertificateOutlined />}>
                  Standar K3 Kemnaker
                </Tag>
                <Tag color="cyan" icon={<MedicineBoxOutlined />}>
                  Klinik Perusahaan
                </Tag>
              </Space>
            </div>
          </div>

          {/* Right Column: Modern Authentication Form */}
          <div
            style={{
              padding: "44px 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Title level={3} style={{ margin: 0, color: token.colorTextHeading }}>
                  Selamat Datang
                </Title>
                <span style={{ fontSize: 22 }}>🩺</span>
              </div>
              <Paragraph
                type="secondary"
                style={{ marginTop: 4, marginBottom: 24, fontSize: 14 }}
              >
                Silakan masukkan kredensial akun untuk mengakses portal klinik Prima K3.
              </Paragraph>
            </div>

            {errorMessage && (
              <Alert
                message="Autentikasi Gagal"
                description={errorMessage}
                type="error"
                showIcon
                closable
                onClose={() => setErrorMessage(null)}
                style={{ marginBottom: 20, borderRadius: 10 }}
              />
            )}

            {isSuccess && (
              <Alert
                message="Login Berhasil"
                description="Mengalihkan ke Dashboard Layanan Klinik..."
                type="success"
                showIcon
                icon={<CheckCircleOutlined />}
                style={{ marginBottom: 20, borderRadius: 10 }}
              />
            )}

            <Form
              form={form}
              layout="vertical"
              initialValues={{ username: "admin", password: "admin" }}
              onFinish={handleSubmit}
              requiredMark={false}
              size="large"
            >
              <Form.Item
                label={<span style={{ fontWeight: 600 }}>Username</span>}
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Harap masukkan username Anda",
                  },
                ]}
              >
                <Input
                  prefix={
                    <UserOutlined
                      style={{
                        color:
                          focusedField === "username"
                            ? "#059669"
                            : token.colorTextTertiary,
                        marginRight: 4,
                      }}
                    />
                  }
                  placeholder="Masukkan username (contoh: admin)"
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField("none")}
                  style={{
                    borderRadius: 12,
                    borderColor:
                      focusedField === "username" ? "#059669" : undefined,
                  }}
                  autoComplete="username"
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ fontWeight: 600 }}>Password</span>}
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Harap masukkan password Anda",
                  },
                ]}
              >
                <Input.Password
                  prefix={
                    <LockOutlined
                      style={{
                        color:
                          focusedField === "password"
                            ? "#059669"
                            : token.colorTextTertiary,
                        marginRight: 4,
                      }}
                    />
                  }
                  placeholder="Masukkan password (contoh: admin)"
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("none")}
                  style={{
                    borderRadius: 12,
                    borderColor:
                      focusedField === "password" ? "#059669" : undefined,
                  }}
                  autoComplete="current-password"
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={isPending}
                  style={{
                    height: 48,
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: 15,
                    backgroundColor: "#059669",
                    borderColor: "#059669",
                    boxShadow: "0 6px 18px rgba(5, 150, 105, 0.35)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {isPending ? "Memverifikasi Kredensial..." : "Masuk ke Klinik Prima K3"}
                </Button>
              </Form.Item>
            </Form>

            <Divider style={{ margin: "14px 0", fontSize: 12, color: token.colorTextTertiary }}>
              Akses Cepat Pengujian
            </Divider>

            {/* Quick Demo Fill & Credentials Hint Card */}
            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px dashed #cbd5e1",
                borderRadius: 12,
                padding: "12px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Text strong style={{ fontSize: 12, color: "#334155" }}>
                    Akun Demo Admin:
                  </Text>
                  <Tag color="geekblue" style={{ margin: 0, fontWeight: 600 }}>
                    admin / admin
                  </Tag>
                </div>

                <Button
                  size="small"
                  type="dashed"
                  icon={<ThunderboltFilled style={{ color: "#d97706" }} />}
                  onClick={handleQuickFill}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 8,
                    color: "#059669",
                    borderColor: "#059669",
                  }}
                >
                  Auto-Fill
                </Button>
              </div>

              <Text type="secondary" style={{ fontSize: 11, lineHeight: 1.4 }}>
                Masuk sebagai <b>dr. Hendra Pratama</b> (Dokter Penanggung Jawab K3) dengan hak akses penuh ke seluruh rekam medis dan data pasien.
              </Text>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
