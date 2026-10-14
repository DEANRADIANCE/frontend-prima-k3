import React from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Typography,
  Space,
  Row,
  Col,
  message,
  theme,
} from "antd";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useCreate } from "@refinedev/core";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { useToken } = theme;

export const EdukasiKesehatanCreate: React.FC = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { mutate, mutation } = useCreate();

  const handleFinish = (values: any) => {
    const payload = {
      ...values,
      penulis: "dr. Hendra Pratama, Sp.Ok",
      tanggal: "12 Oktober 2026",
      foto: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=80",
      dibaca: 1,
    };

    mutate(
      {
        resource: "artikel",
        values: payload,
      },
      {
        onSuccess: () => {
          message.success("Artikel edukasi kesehatan baru berhasil disimpan!");
          navigate("/informasi-media/edukasi-kesehatan");
        },
      }
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Space>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/informasi-media/edukasi-kesehatan")}
        >
          Kembali ke Daftar Artikel
        </Button>
      </Space>

      <Card style={{ borderRadius: 14 }}>
        <Title level={3} style={{ margin: "0 0 6px 0", color: token.colorTextHeading }}>
          Formulir Input Artikel Edukasi Kesehatan
        </Title>
        <Text type="secondary" style={{ fontSize: 13, display: "block", marginBottom: 24 }}>
          Publikasikan panduan dan informasi kesehatan kerja baru untuk dibaca oleh seluruh pegawai ANRI
        </Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            kategori: "K3 Perkantoran",
          }}
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} md={16}>
              <Form.Item
                label="Judul Artikel"
                name="judul"
                rules={[{ required: true, message: "Judul artikel wajib diisi!" }]}
              >
                <Input size="large" placeholder="Contoh: Pentingnya Hidrasi Sehat Saat Bekerja di Ruangan Ber-AC" />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                label="Pilih Kategori"
                name="kategori"
                rules={[{ required: true, message: "Pilih kategori artikel!" }]}
              >
                <Select
                  size="large"
                  options={[
                    { label: "K3 Perkantoran", value: "K3 Perkantoran" },
                    { label: "Ergonomi", value: "Ergonomi" },
                    { label: "Kesehatan Mental", value: "Kesehatan Mental" },
                    { label: "Gizi Kerja", value: "Gizi Kerja" },
                    { label: "Pencegahan Penyakit", value: "Pencegahan Penyakit" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Keterangan Singkat (Ringkasan Cuplikan)"
            name="ringkasan"
            rules={[{ required: true, message: "Ringkasan artikel wajib diisi!" }]}
          >
            <TextArea
              rows={3}
              placeholder="Tuliskan 1-2 kalimat ringkasan yang menarik agar pembaca memahami garis besar artikel..."
            />
          </Form.Item>

          <Form.Item
            label="Isi Lengkap Artikel"
            name="isi"
            rules={[{ required: true, message: "Isi lengkap artikel tidak boleh kosong!" }]}
          >
            <TextArea
              rows={10}
              placeholder="Tuliskan isi pembahasan edukasi kesehatan secara lengkap dan terstruktur..."
            />
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 20 }}>
            <Button size="large" onClick={() => navigate("/informasi-media/edukasi-kesehatan")}>
              Batal
            </Button>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={mutation.isPending}
              style={{ backgroundColor: token.colorPrimary, borderRadius: 8, fontWeight: 600 }}
            >
              Simpan Artikel
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};
