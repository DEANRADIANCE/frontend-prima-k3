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
  Image,
  Alert,
  theme,
} from "antd";
import {
  FileTextOutlined,
  PrinterOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import type { ISuratSakit } from "../../providers/mock-data";

const { Title, Text } = Typography;
const { useToken } = theme;

export const SuratSakitShow: React.FC = () => {
  const { token } = useToken();
  const { result: record, query } = useShow<ISuratSakit>();
  const isLoading = query?.isLoading;

  const isApproved = record?.status_verifikasi === "Disetujui";
  const isRejected = record?.status_verifikasi === "Ditolak";

  return (
    <Show
      isLoading={isLoading}
      title={
        <Space>
          <FileTextOutlined style={{ color: token.colorInfo }} />
          <span>Detail Surat Sakit Karyawan</span>
        </Space>
      }
      headerButtons={({ defaultButtons }) => (
        <Space>
          {defaultButtons}
          <Button icon={<PrinterOutlined />} onClick={() => window.print()}>
            Cetak Bukti Verifikasi
          </Button>
        </Space>
      )}
    >
      <Card
        bordered
        style={{
          borderRadius: 12,
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Title level={3} style={{ margin: 0, color: token.colorPrimary }}>
            SURAT KETERANGAN DOKTER (ISTIRAHAT SAKIT)
          </Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Sistem Informasi Kesehatan Kerja - Klinik Prima K3
          </Text>
          <Divider style={{ margin: "16px 0" }} />
        </div>

        {/* Status Verifikasi Banner */}
        <div style={{ marginBottom: 20 }}>
          {isApproved ? (
            <Alert
              message="Dokumen Sah & Telah Diverifikasi"
              description={`Surat sakit telah diverifikasi oleh tim Dokter Okupasi & K3 Perusahaan. Terhitung istirahat selama ${record?.jumlah_hari} hari.`}
              type="success"
              showIcon
              icon={<CheckCircleOutlined />}
            />
          ) : isRejected ? (
            <Alert
              message="Dokumen Ditolak"
              description="Surat sakit tidak memenuhi kriteria verifikasi medis atau ketentuan perusahaan."
              type="error"
              showIcon
              icon={<CloseCircleOutlined />}
            />
          ) : (
            <Alert
              message="Menunggu Verifikasi Medis"
              description="Dokumen sedang ditinjau keabsahan diagnosa dan stempel faskes oleh tim K3."
              type="warning"
              showIcon
              icon={<ClockCircleOutlined />}
            />
          )}
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={14}>
            <Descriptions
              bordered
              column={1}
              size="middle"
              title="Informasi Dokumen & Karyawan"
            >
              <Descriptions.Item label="Nomor Surat">
                <Text code style={{ fontSize: 14 }}>
                  {record?.nomor_surat}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Nama Karyawan">
                <Text strong>{record?.nama_pasien}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="NIP / Departemen">
                {record?.nip} • {record?.departemen}
              </Descriptions.Item>
              <Descriptions.Item label="Faskes Penerbit">
                <Text strong style={{ color: token.colorInfo }}>
                  {record?.faskes_penerbit}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Dokter yang Memeriksa">
                {record?.nama_dokter}
              </Descriptions.Item>
              <Descriptions.Item label="Periode Istirahat">
                <Text strong>
                  {record?.tanggal_mulai} s/d {record?.tanggal_selesai}
                </Text>{" "}
                <Tag color="cyan">{record?.jumlah_hari} Hari Kalender</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Diagnosa Medis">
                <Text type="danger" strong>
                  {record?.diagnosa}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Status Validasi">
                <Tag
                  color={isApproved ? "green" : isRejected ? "red" : "gold"}
                  style={{ fontSize: 13, padding: "2px 8px" }}
                >
                  {record?.status_verifikasi}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Catatan / Keterangan">
                {record?.catatan || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="Waktu Unggah">
                {record?.uploaded_at || "-"}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col xs={24} md={10}>
            <Card
              title="Lampiran Bukti Fisik / Scan Surat"
              size="small"
              style={{ textAlign: "center" }}
            >
              {record?.file_url ? (
                <div>
                  <Image
                    src={record?.file_url}
                    alt="Lampiran Surat Sakit"
                    style={{
                      maxHeight: 380,
                      objectFit: "contain",
                      borderRadius: 8,
                      border: `1px solid ${token.colorBorderSecondary}`,
                    }}
                  />
                  <div style={{ marginTop: 10 }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Klik gambar untuk memperbesar (Full View)
                    </Text>
                  </div>
                </div>
              ) : (
                <div style={{ padding: "40px 0" }}>
                  <Text type="secondary">Tidak ada gambar lampiran yang diunggah.</Text>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Card>
    </Show>
  );
};
