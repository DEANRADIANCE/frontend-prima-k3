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
  Avatar,
} from "antd";
import {
  UserOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import type { IPasien } from "../../providers/mock-data";

const { Title, Text } = Typography;

export const PasienShow: React.FC = () => {
  const { result: record, query } = useShow<IPasien>();
  const isLoading = query?.isLoading;

  return (
    <Show
      isLoading={isLoading}
      title={
        <Space>
          <IdcardOutlined style={{ color: "#059669" }} />
          <span>Profil Rekam Medis Karyawan</span>
        </Space>
      }
    >
      <Card
        bordered
        style={{
          borderRadius: 12,
          maxWidth: 900,
          margin: "0 auto",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <Row align="middle" gutter={24} style={{ marginBottom: 24 }}>
          <Col>
            <Avatar
              size={80}
              icon={<UserOutlined />}
              style={{ backgroundColor: "#059669", fontSize: 36 }}
            />
          </Col>
          <Col>
            <Title level={3} style={{ margin: 0 }}>
              {record?.nama_lengkap}
            </Title>
            <Space wrap style={{ marginTop: 6 }}>
              <Tag color="cyan">{record?.nip}</Tag>
              <Tag color="blue">{record?.departemen}</Tag>
              <Tag color="green">{record?.posisi}</Tag>
              <Tag color={record?.status_kerja === "Aktif" ? "success" : "default"}>
                Status: {record?.status_kerja}
              </Tag>
            </Space>
          </Col>
        </Row>

        <Divider />

        <Descriptions
          bordered
          column={{ xs: 1, sm: 2 }}
          size="middle"
          title="Data Pribadi & Kontak"
        >
          <Descriptions.Item label="Jenis Kelamin">
            {record?.jenis_kelamin}
          </Descriptions.Item>
          <Descriptions.Item label="Tanggal Lahir">
            {record?.tanggal_lahir}
          </Descriptions.Item>
          <Descriptions.Item label="Nomor Telepon">
            {record?.nomor_telepon || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Golongan Darah">
            <Tag color="magenta">Golongan {record?.golongan_darah}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Riwayat Alergi" span={2}>
            {record?.riwayat_alergi && record?.riwayat_alergi !== "Tidak ada" ? (
              <Tag color="volcano">{record?.riwayat_alergi}</Tag>
            ) : (
              <Text type="secondary">Tidak memiliki catatan alergi</Text>
            )}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Show>
  );
};
