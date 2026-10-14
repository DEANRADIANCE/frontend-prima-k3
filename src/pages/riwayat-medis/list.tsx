import React from "react";
import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space, Tag, Input, Typography, Card, theme } from "antd";
import {
  MedicineBoxOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  AlertOutlined,
} from "@ant-design/icons";
import type { IRiwayatMedis } from "../../providers/mock-data";

const { Text } = Typography;

export const RiwayatMedisList: React.FC = () => {
  const { token } = theme.useToken();
  const { tableProps } = useTable<IRiwayatMedis>({
    syncWithLocation: true,
  });

  return (
    <List
      title={
        <Space>
          <MedicineBoxOutlined style={{ color: token.colorPrimary, fontSize: 22 }} />
          <span>Riwayat Medis & Kunjungan Klinik</span>
        </Space>
      }
    >
      <Table {...tableProps} rowKey="id" scroll={{ x: 1000 }}>
        <Table.Column
          dataIndex="no_rm"
          title="No. RM"
          render={(val) => <Tag color="cyan">{val}</Tag>}
        />
        <Table.Column
          title="Pasien / Karyawan"
          key="pasien"
          render={(_, record: IRiwayatMedis) => (
            <div>
              <Text strong>{record.nama_pasien}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {record.nip} • {record.departemen}
              </Text>
            </div>
          )}
        />
        <Table.Column
          dataIndex="tanggal_periksa"
          title="Tgl Periksa"
          sorter
        />
        <Table.Column
          title="Tanda Vital"
          key="vital"
          render={(_, record: IRiwayatMedis) => (
            <div>
              <Text style={{ fontSize: 12 }}>TD: {record.tekanan_darah}</Text>
              <br />
              <Text style={{ fontSize: 12 }} type="secondary">
                Suhu: {record.suhu_tubuh}
              </Text>
            </div>
          )}
        />
        <Table.Column
          dataIndex="diagnosa"
          title="Diagnosa"
          render={(val) => (
            <Text ellipsis style={{ maxWidth: 220, display: "inline-block" }}>
              {val}
            </Text>
          )}
        />
        <Table.Column
          dataIndex="dokter"
          title="Dokter Pemeriksa"
          render={(val) => <Text style={{ fontSize: 12 }}>{val}</Text>}
        />
        <Table.Column
          dataIndex="status"
          title="Status Kunjungan"
          render={(status) => {
            let color = "default";
            if (status === "Selesai") color = "green";
            if (status === "Istirahat Dokter") color = "orange";
            if (status === "Observasi") color = "blue";
            if (status === "Rujukan") color = "volcano";
            return <Tag color={color}>{status}</Tag>;
          }}
        />
        <Table.Column
          title="Aksi"
          dataIndex="actions"
          fixed="right"
          render={(_, record: IRiwayatMedis) => (
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
