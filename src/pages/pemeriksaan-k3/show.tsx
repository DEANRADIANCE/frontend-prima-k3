import React from "react";
import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import {
  Card,
  Descriptions,
  Tag,
  Typography,
  Divider,
  Space,
  Button,
  Alert,
  theme,
} from "antd";
import {
  SafetyCertificateOutlined,
  PrinterOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import type { IPemeriksaanK3 } from "../../providers/mock-data";

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

export const PemeriksaanK3Show: React.FC = () => {
  const { token } = useToken();
  const { result: record, query } = useShow<IPemeriksaanK3>();
  const isLoading = query?.isLoading;

  const isFit = record?.hasil_kebugaran === "Fit";
  const isFitWithNote = record?.hasil_kebugaran === "Fit With Note";

  return (
    <Show
      isLoading={isLoading}
      title={
        <Space>
          <SafetyCertificateOutlined style={{ color: token.colorPrimary }} />
          <span>Sertifikat Kelayakan Kebugaran Kerja (Fit to Work)</span>
        </Space>
      }
      headerButtons={({ defaultButtons }) => (
        <Space>
          {defaultButtons}
          <Button icon={<PrinterOutlined />} onClick={() => window.print()}>
            Cetak Sertifikat Kelayakan Kerja
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
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Title level={3} style={{ margin: 0, color: token.colorPrimary }}>
            UNIT KESELAMATAN & KESEHATAN KERJA (K3)
          </Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            SURAT KETERANGAN KELAYAKAN BEKERJA (FIT TO WORK CERTIFICATE)
          </Text>
          <Divider style={{ margin: "16px 0" }} />
        </div>

        <div style={{ marginBottom: 20 }}>
          {isFit ? (
            <Alert
              message="Status Kebugaran: FIT TO WORK (Lolos Uji Medis)"
              description="Karyawan dinyatakan sehat secara medis dan laik bekerja pada posisi serta lingkungan kerja terkait."
              type="success"
              showIcon
              icon={<CheckCircleOutlined />}
            />
          ) : isFitWithNote ? (
            <Alert
              message="Status Kebugaran: FIT WITH NOTE (Laik Kerja Bersyarat)"
              description="Karyawan laik bekerja dengan penyesuaian alat pelindung diri (APD) khusus atau pembatasan beban fisik."
              type="warning"
              showIcon
              icon={<ExclamationCircleOutlined />}
            />
          ) : (
            <Alert
              message={`Status Kebugaran: ${record?.hasil_kebugaran}`}
              description="Karyawan memerlukan pemeriksaan lanjutan atau penanganan medis sebelum dapat bertugas."
              type="error"
              showIcon
              icon={<ExclamationCircleOutlined />}
            />
          )}
        </div>

        <Descriptions
          bordered
          column={{ xs: 1, sm: 2 }}
          size="middle"
          title="Data Karyawan & Evaluasi MCU"
        >
          <Descriptions.Item label="Kode MCU">
            <Text code>{record?.kode_mcu}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Tanggal Evaluasi">
            {record?.tanggal_pemeriksaan}
          </Descriptions.Item>
          <Descriptions.Item label="Nama Lengkap Karyawan">
            <Text strong>{record?.nama_pasien}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Departemen / Divisi">
            {record?.departemen}
          </Descriptions.Item>
          <Descriptions.Item label="Jenis Pemeriksaan K3" span={2}>
            <Tag color="blue">{record?.jenis_pemeriksaan}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Hasil Kebugaran Kerja" span={2}>
            <Tag
              color={isFit ? "green" : isFitWithNote ? "gold" : "red"}
              style={{ fontSize: 13, padding: "3px 12px" }}
            >
              {record?.hasil_kebugaran}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Rekomendasi Medis & K3" span={2}>
            <Paragraph style={{ margin: 0, fontSize: 14 }}>
              {record?.catatan_rekomendasi}
            </Paragraph>
          </Descriptions.Item>
        </Descriptions>

        <div style={{ marginTop: 40, display: "flex", justifyContent: "flex-end" }}>
          <div style={{ textAlign: "center", minWidth: 220 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Dokter Pemeriksa K3 Perusahaan,
            </Text>
            <div style={{ height: 60 }} />
            <Text strong style={{ textDecoration: "underline", color: token.colorTextHeading }}>
              {record?.dokter_penguji}
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: 11 }}>
              Sertifikasi Dokter Pemeriksa Kesehatan Tenaga Kerja (Kemenaker RI)
            </Text>
          </div>
        </div>
      </Card>
    </Show>
  );
};
