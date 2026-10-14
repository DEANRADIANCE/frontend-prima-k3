import React from "react";
import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space, Tag, Typography, Button, theme } from "antd";
import {
  SafetyCertificateOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useNavigation } from "@refinedev/core";
import type { IPemeriksaanK3 } from "../../providers/mock-data";

const { Text } = Typography;

export const PemeriksaanK3List: React.FC = () => {
  const { token } = theme.useToken();
  const { create } = useNavigation();
  const { tableProps } = useTable<IPemeriksaanK3>({
    syncWithLocation: true,
  });

  return (
    <List
      title={
        <Space>
          <SafetyCertificateOutlined style={{ color: token.colorPrimary, fontSize: 22 }} />
          <span>Pemeriksaan Kesehatan Kerja (MCU & Fit to Work)</span>
        </Space>
      }
      headerButtons={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ backgroundColor: token.colorPrimary, borderColor: token.colorPrimary }}
          onClick={() => create("pemeriksaan_k3")}
        >
          Input Pemeriksaan MCU
        </Button>
      }
    >
      <Table {...tableProps} rowKey="id" scroll={{ x: 1000 }}>
        <Table.Column
          dataIndex="kode_mcu"
          title="Kode MCU"
          render={(val) => <Text code>{val}</Text>}
        />
        <Table.Column
          title="Karyawan"
          key="pasien"
          render={(_, record: IPemeriksaanK3) => (
            <div>
              <Text strong>{record.nama_pasien}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {record.departemen}
              </Text>
            </div>
          )}
        />
        <Table.Column
          dataIndex="tanggal_pemeriksaan"
          title="Tgl Periksa"
          sorter
        />
        <Table.Column
          dataIndex="jenis_pemeriksaan"
          title="Jenis Evaluasi K3"
          render={(val) => <Tag color="blue">{val}</Tag>}
        />
        <Table.Column
          dataIndex="hasil_kebugaran"
          title="Status Kebugaran (Fitness)"
          render={(val) => {
            if (val === "Fit") {
              return (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Fit to Work
                </Tag>
              );
            }
            if (val === "Fit With Note") {
              return (
                <Tag icon={<ExclamationCircleOutlined />} color="gold">
                  Fit With Note (Bersyarat)
                </Tag>
              );
            }
            return (
              <Tag icon={<ExclamationCircleOutlined />} color="error">
                {val}
              </Tag>
            );
          }}
        />
        <Table.Column
          dataIndex="catatan_rekomendasi"
          title="Rekomendasi K3"
          render={(val) => (
            <Text ellipsis style={{ maxWidth: 220, display: "inline-block" }}>
              {val}
            </Text>
          )}
        />
        <Table.Column
          dataIndex="dokter_penguji"
          title="Dokter Penguji"
          render={(val) => <Text style={{ fontSize: 12 }}>{val}</Text>}
        />
        <Table.Column
          title="Aksi"
          dataIndex="actions"
          fixed="right"
          render={(_, record: IPemeriksaanK3) => (
            <Space size="small">
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
