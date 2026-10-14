import React from "react";
import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import {
  Card,
  Descriptions,
  Tag,
  Typography,
  Divider,
  Row,
  Col,
  Space,
  Button,
  theme,
} from "antd";
import {
  MedicineBoxOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import type { IRiwayatMedis } from "../../providers/mock-data";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

export const RiwayatMedisShow: React.FC = () => {
  const { token } = useToken();
  const { result: record, query } = useShow<IRiwayatMedis>();
  const isLoading = query?.isLoading;

  return (
    <Show
      isLoading={isLoading}
      title={
        <Space>
          <MedicineBoxOutlined style={{ color: token.colorPrimary }} />
          <span>Detail Catatan Rekam Medis</span>
        </Space>
      }
      headerButtons={({ defaultButtons }) => (
        <Space>
          {defaultButtons}
          <Button
            icon={<PrinterOutlined />}
            onClick={() => window.print()}
          >
            Cetak Rekam Medis
          </Button>
        </Space>
      )}
    >
      <Card
        bordered
        style={{
          borderRadius: 12,
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {/* Header Rekam Medis Klinik */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Space direction="vertical" size={2}>
            <Title level={3} style={{ margin: 0, color: token.colorPrimary }}>
              KLINIK PRATAMA & K3 "PRIMA K3"
            </Title>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Pelayanan Kesehatan Kerja, Kuratif & Preventif Karyawan
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Izin Operasional No: 445/K3-KLINIK/2024 • Jl. Industri Sejahtera No. 88
            </Text>
          </Space>
          <Divider style={{ margin: "16px 0" }} />
        </div>

        <Row justify="space-between" align="middle" style={{ marginBottom: 20 }} gutter={[8, 8]}>
          <Col>
            <Text strong style={{ fontSize: 15 }}>
              No. Rekam Medis:
            </Text>{" "}
            <Tag color="cyan" style={{ fontSize: 14, padding: "2px 8px" }}>
              {record?.no_rm}
            </Tag>
          </Col>
          <Col>
            <Text strong>Tanggal Pemeriksaan:</Text>{" "}
            <Tag color="blue">{record?.tanggal_periksa}</Tag>
          </Col>
        </Row>

        <Descriptions
          bordered
          column={{ xs: 1, sm: 2 }}
          size="middle"
          title="Data Pasien / Karyawan"
        >
          <Descriptions.Item label="Nama Lengkap">
            <Text strong>{record?.nama_pasien}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="NIP Karyawan">
            {record?.nip}
          </Descriptions.Item>
          <Descriptions.Item label="Departemen / Divisi">
            {record?.departemen}
          </Descriptions.Item>
          <Descriptions.Item label="Dokter Pemeriksa">
            <Text strong style={{ color: token.colorPrimary }}>
              {record?.dokter}
            </Text>
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions
          bordered
          column={{ xs: 1, sm: 2 }}
          size="middle"
          title="Hasil Pemeriksaan Fisik & Klinis"
        >
          <Descriptions.Item label="Tekanan Darah">
            <Tag color="geekblue">{record?.tekanan_darah}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Suhu Tubuh">
            <Tag color="orange">{record?.suhu_tubuh}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Keluhan Utama" span={2}>
            <Paragraph style={{ margin: 0 }}>{record?.keluhan}</Paragraph>
          </Descriptions.Item>
          <Descriptions.Item label="Diagnosa Medis / Okupasi" span={2}>
            <Text strong style={{ color: token.colorError, fontSize: 15 }}>
              {record?.diagnosa}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label="Tindakan / Terapi" span={2}>
            <Paragraph style={{ margin: 0 }}>{record?.tindakan || "-"}</Paragraph>
          </Descriptions.Item>
          <Descriptions.Item label="Resep Obat" span={2}>
            <Paragraph style={{ margin: 0 }}>{record?.resep_obat || "-"}</Paragraph>
          </Descriptions.Item>
          <Descriptions.Item label="Status Kunjungan" span={2}>
            <Tag
              color={
                record?.status === "Selesai"
                  ? "green"
                  : record?.status === "Istirahat Dokter"
                  ? "warning"
                  : "blue"
              }
              style={{ fontSize: 13, padding: "3px 10px" }}
            >
              {record?.status}
            </Tag>
          </Descriptions.Item>
        </Descriptions>

        <div style={{ marginTop: 40, display: "flex", justifyContent: "flex-end" }}>
          <div style={{ textAlign: "center", minWidth: 200 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Dokter Pemeriksa Klinik,
            </Text>
            <div style={{ height: 60 }} />
            <Text strong style={{ textDecoration: "underline", color: token.colorTextHeading }}>
              {record?.dokter}
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: 11 }}>
              SIP. 19850612/K3/KLINIK
            </Text>
          </div>
        </div>
      </Card>
    </Show>
  );
};
