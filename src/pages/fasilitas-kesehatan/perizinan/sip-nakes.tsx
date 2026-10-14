import React, { useState, useMemo } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Input,
  Select,
  Table,
  Avatar,
  Tag,
  Button,
  Space,
  Drawer,
  Modal,
  Form,
  Upload,
  Descriptions,
  Image,
  message,
  theme,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  UploadOutlined,
  ArrowLeftOutlined,
  UserOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";
import { mockNakes, type INakes } from "../../../providers/mock-data";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

interface ISipNakesRecord extends INakes {
  status_sip: "Aktif" | "Perpanjangan";
  masa_berlaku_sip: string;
  alamat_kerja: string;
  dokumen_sip_url: string;
}

export const SipNakesPage: React.FC = () => {
  const { token } = useToken();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfesi, setSelectedProfesi] = useState<string>("Semua");
  const [selectedStatus, setSelectedStatus] = useState<string>("Semua");
  const [detailDrawerNakes, setDetailDrawerNakes] = useState<ISipNakesRecord | null>(null);
  const [editModalNakes, setEditModalNakes] = useState<ISipNakesRecord | null>(null);
  const [form] = Form.useForm();

  // Extend mockNakes with SIP details
  const [nakesList, setNakesList] = useState<ISipNakesRecord[]>(() =>
    mockNakes.map((n) => ({
      ...n,
      status_sip: "Aktif",
      masa_berlaku_sip: "31 Desember 2028",
      alamat_kerja: "Klinik Pratama ANRI, Jl. Ampera Raya No. 7 Jakarta Selatan",
      dokumen_sip_url: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&auto=format&fit=crop&q=80",
    }))
  );

  const filteredData = useMemo(() => {
    return nakesList.filter((item) => {
      const matchSearch =
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sip.toLowerCase().includes(searchTerm.toLowerCase());
      const matchProfesi = selectedProfesi === "Semua" || item.profesi === selectedProfesi;
      const matchStatus = selectedStatus === "Semua" || item.status_sip === selectedStatus;
      return matchSearch && matchProfesi && matchStatus;
    });
  }, [nakesList, searchTerm, selectedProfesi, selectedStatus]);

  const handleEditSave = (values: any) => {
    if (!editModalNakes) return;

    setNakesList((prev) =>
      prev.map((n) => (n.id === editModalNakes.id ? { ...n, ...values } : n))
    );
    message.success(`SIP atas nama ${editModalNakes.nama} berhasil diperbarui!`);
    setEditModalNakes(null);
  };

  const columns = [
    {
      title: "Tenaga Kesehatan",
      key: "nakes",
      render: (_: any, record: ISipNakesRecord) => (
        <Space size="middle">
          <Avatar src={record.foto} size={46} icon={<UserOutlined />} />
          <div>
            <Text strong style={{ fontSize: 14 }}>
              {record.nama}
            </Text>
            <Text type="secondary" style={{ display: "block", fontSize: 12 }}>
              {record.jabatan}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Profesi",
      dataIndex: "profesi",
      key: "profesi",
      render: (profesi: string) => <Tag color="blue">{profesi}</Tag>,
    },
    {
      title: "Nomor SIP",
      dataIndex: "sip",
      key: "sip",
      render: (sip: string) => (
        <Text copyable style={{ fontSize: 12, fontWeight: 500 }}>
          {sip}
        </Text>
      ),
    },
    {
      title: "Status SIP",
      dataIndex: "status_sip",
      key: "status_sip",
      render: (status: string) => (
        <Tag color={status === "Aktif" ? "green" : "gold"}>{status}</Tag>
      ),
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (_: any, record: ISipNakesRecord) => (
        <Space>
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => setDetailDrawerNakes(record)}
          >
            Detail
          </Button>
          <Button
            size="small"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditModalNakes(record);
              form.setFieldsValue({
                nama: record.nama,
                sip: record.sip,
                masa_berlaku_sip: record.masa_berlaku_sip,
                alamat_kerja: record.alamat_kerja,
              });
            }}
            style={{ backgroundColor: token.colorPrimary }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Space>
        <Link to="/fasilitas-kesehatan/perizinan">
          <Button icon={<ArrowLeftOutlined />}>Kembali ke Menu Perizinan</Button>
        </Link>
      </Space>

      <Card style={{ borderRadius: 14 }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
          <Col xs={24} md={12}>
            <Title level={3} style={{ margin: 0 }}>
              Daftar SIP Tenaga Kesehatan ANRI
            </Title>
            <Text type="secondary">
              Basis data Surat Izin Praktik (SIP) dokter, perawat, apoteker, dan psikolog berwenang
            </Text>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: "right" }}>
            <Tag color="cyan" style={{ fontSize: 12, padding: "4px 10px", borderRadius: 6 }}>
              Total: {nakesList.length} Tenaga Kesehatan Ber-SIP
            </Tag>
          </Col>
        </Row>

        {/* Filter Bar */}
        <Row gutter={[12, 12]} style={{ marginBottom: 20 }}>
          <Col xs={24} sm={10}>
            <Input
              placeholder="Cari nakes atau nomor SIP..."
              prefix={<SearchOutlined style={{ color: token.colorTextSecondary }} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={12} sm={7}>
            <Select
              style={{ width: "100%" }}
              value={selectedProfesi}
              onChange={(val) => setSelectedProfesi(val)}
              options={[
                { label: "Semua Profesi", value: "Semua" },
                { label: "Dokter Spesialis Okupasi", value: "Dokter Spesialis Okupasi" },
                { label: "Dokter Umum", value: "Dokter Umum" },
                { label: "Psikolog Klinis", value: "Psikolog Klinis" },
                { label: "Apoteker", value: "Apoteker" },
                { label: "Perawat", value: "Perawat" },
              ]}
            />
          </Col>
          <Col xs={12} sm={7}>
            <Select
              style={{ width: "100%" }}
              value={selectedStatus}
              onChange={(val) => setSelectedStatus(val)}
              options={[
                { label: "Semua Status", value: "Semua" },
                { label: "Aktif", value: "Aktif" },
                { label: "Perpanjangan", value: "Perpanjangan" },
              ]}
            />
          </Col>
        </Row>

        {/* Tabel Nakes */}
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 6 }}
          scroll={{ x: 680 }}
        />
      </Card>

      {/* Drawer Detail SIP Nakes */}
      <Drawer
        title="Detail SIP Tenaga Kesehatan"
        width={540}
        placement="right"
        open={!!detailDrawerNakes}
        onClose={() => setDetailDrawerNakes(null)}
      >
        {detailDrawerNakes && (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <Image
                src={detailDrawerNakes.dokumen_sip_url}
                alt="Foto Dokumen SIP"
                style={{
                  maxHeight: 260,
                  borderRadius: 8,
                  objectFit: "cover",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              />
              <Text type="secondary" style={{ display: "block", marginTop: 6, fontSize: 11 }}>
                Preview Dokumen Surat Izin Praktik Resmi
              </Text>
            </div>

            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Status SIP">
                <Tag color={detailDrawerNakes.status_sip === "Aktif" ? "green" : "gold"}>
                  {detailDrawerNakes.status_sip}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Nama Tenaga Medis">
                {detailDrawerNakes.nama}
              </Descriptions.Item>
              <Descriptions.Item label="Profesi">
                {detailDrawerNakes.profesi}
              </Descriptions.Item>
              <Descriptions.Item label="Nomor SIP">
                {detailDrawerNakes.sip}
              </Descriptions.Item>
              <Descriptions.Item label="Nomor STR">
                {detailDrawerNakes.str}
              </Descriptions.Item>
              <Descriptions.Item label="Masa Berlaku">
                {detailDrawerNakes.masa_berlaku_sip}
              </Descriptions.Item>
              <Descriptions.Item label="Alamat Tempat Kerja">
                {detailDrawerNakes.alamat_kerja}
              </Descriptions.Item>
            </Descriptions>
          </Space>
        )}
      </Drawer>

      {/* Modal Edit SIP Nakes */}
      <Modal
        title={`Memperbarui SIP: ${editModalNakes?.nama}`}
        open={!!editModalNakes}
        onCancel={() => setEditModalNakes(null)}
        footer={null}
        width={560}
        centered
      >
        <Form form={form} layout="vertical" onFinish={handleEditSave} style={{ marginTop: 16 }}>
          <Form.Item label="Upload Dokumen Baru">
            <Upload maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Pilih File Scan SIP PDF/JPG</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Nama Nakes" name="nama" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Nomor SIP" name="sip" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Masa Berlaku" name="masa_berlaku_sip" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Alamat Kerja" name="alamat_kerja" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
            <Button onClick={() => setEditModalNakes(null)}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: token.colorPrimary }}>
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
