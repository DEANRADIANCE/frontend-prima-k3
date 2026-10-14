import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Button,
  Tag,
  Space,
  Image,
  Pagination,
  Modal,
  Form,
  Input,
  Upload,
  message,
  theme,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  CalendarOutlined,
  DownloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useList, useCreate } from "@refinedev/core";
import type { IFlyer } from "../../../providers/mock-data";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { useToken } = theme;

export const FlyerPosterPage: React.FC = () => {
  const { token } = useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [form] = Form.useForm();

  const { result: flyerResult } = useList<IFlyer>({
    resource: "flyer",
    pagination: { mode: "off" },
  });

  const { mutate: createFlyer } = useCreate();

  const allFlyers = flyerResult?.data || [];
  const start = (currentPage - 1) * pageSize;
  const paginatedFlyers = allFlyers.slice(start, start + pageSize);

  const handleSaveFlyer = (values: any) => {
    const payload = {
      ...values,
      tanggal: "12 Oktober 2026",
      gambar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80",
    };

    createFlyer(
      {
        resource: "flyer",
        values: payload,
      },
      {
        onSuccess: () => {
          message.success("Flyer edukasi kesehatan baru berhasil ditambahkan!");
          setIsModalOpen(false);
          form.resetFields();
        },
      }
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header Halaman & Tombol "Tambah Flyer +" yang benar */}
      <Card style={{ borderRadius: 14 }}>
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Title level={3} style={{ margin: "0 0 6px 0", color: token.colorTextHeading }}>
              Flyer dan Poster Edukasi K3 & Kesehatan
            </Title>
            <Paragraph type="secondary" style={{ fontSize: 13, margin: 0 }}>
              Koleksi media visual, poster kampanye K3, infografis tanggap darurat, dan materi promotif
              Klinik Pratama ANRI. Klik gambar untuk melihat pratinjau penuh.
            </Paragraph>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: "right" }}>
            {/* Label tombol dikoreksi menjadi "Tambah Flyer +" sesuai instruksi */}
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
              style={{
                borderRadius: 8,
                backgroundColor: token.colorPrimary,
                fontWeight: 600,
              }}
            >
              Tambah Flyer +
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Grid 2 Kolom Kartu Flyer / Poster */}
      <Image.PreviewGroup>
        <Row gutter={[20, 20]}>
          {paginatedFlyers.map((flyer) => (
            <Col xs={24} md={12} key={flyer.id}>
              <Card
                hoverable
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  border: `1px solid ${token.colorBorderSecondary}`,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                styles={{ body: { padding: "18px", flex: 1, display: "flex", flexDirection: "column" } }}
              >
                <div
                  style={{
                    borderRadius: 8,
                    overflow: "hidden",
                    marginBottom: 14,
                    height: 240,
                    backgroundColor: "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={flyer.gambar}
                    alt={flyer.judul}
                    style={{
                      maxHeight: 240,
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <Tag color="cyan">{flyer.kategori}</Tag>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    <CalendarOutlined style={{ marginRight: 4 }} />
                    {flyer.tanggal}
                  </Text>
                </div>

                <Title level={5} style={{ margin: "2px 0 8px 0" }}>
                  {flyer.judul}
                </Title>

                <Paragraph type="secondary" style={{ fontSize: 13, lineHeight: 1.55, flex: 1 }}>
                  {flyer.keterangan}
                </Paragraph>

                <Space style={{ marginTop: "auto" }}>
                  <Button
                    icon={<DownloadOutlined />}
                    onClick={() => message.success(`Flyer "${flyer.judul}" siap diunduh!`)}
                    size="small"
                  >
                    Unduh Resolusi Tinggi
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Image.PreviewGroup>

      {/* Paginasi */}
      {allFlyers.length > pageSize && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={allFlyers.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}

      {/* Modal Tambah Flyer Baru */}
      <Modal
        title="Tambah Flyer / Poster Edukasi Baru"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={560}
        centered
      >
        <Form form={form} layout="vertical" onFinish={handleSaveFlyer} style={{ marginTop: 16 }}>
          <Form.Item
            label="Judul Flyer / Poster"
            name="judul"
            rules={[{ required: true, message: "Judul poster wajib diisi!" }]}
          >
            <Input placeholder="Contoh: Poster Prosedur Evakuasi Gempa & Kebakaran ANRI" />
          </Form.Item>

          <Form.Item
            label="Kategori Materi"
            name="kategori"
            rules={[{ required: true, message: "Kategori wajib diisi!" }]}
          >
            <Input placeholder="Contoh: Tanggap Darurat / Kebugaran Fisik" />
          </Form.Item>

          <Form.Item
            label="Keterangan Flyer (Deskripsi Singkat)"
            name="keterangan"
            rules={[{ required: true, message: "Keterangan wajib diisi!" }]}
          >
            <TextArea rows={3} placeholder="Jelaskan ringkasan pesan visual atau panduan poster..." />
          </Form.Item>

          <Form.Item label="Upload Berkas Gambar (JPG / PNG)">
            <Upload maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Pilih Gambar Desain (Maks. 10 MB)</Button>
            </Upload>
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
            <Button onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: token.colorPrimary }}>
              Simpan Flyer
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
