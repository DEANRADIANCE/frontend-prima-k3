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
  UserOutlined,
  UserAddOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useNavigation } from "@refinedev/core";
import type { IPasien } from "../../providers/mock-data";

const { Text } = Typography;

export const PasienList: React.FC = () => {
  const { token } = theme.useToken();
  const { create } = useNavigation();
  const { tableProps } = useTable<IPasien>({
    syncWithLocation: true,
  });

  return (
    <List
      title={
        <Space>
          <UserOutlined style={{ color: token.colorPrimary, fontSize: 22 }} />
          <span>Data Pasien & Karyawan Perusahaan</span>
        </Space>
      }
      headerButtons={
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          style={{ backgroundColor: token.colorPrimary, borderColor: token.colorPrimary }}
          onClick={() => create("pasien")}
        >
          Registrasi Pasien Baru
        </Button>
      }
    >
      <Table {...tableProps} rowKey="id" scroll={{ x: 1000 }}>
        <Table.Column
          dataIndex="nip"
          title="NIP"
          render={(val) => <Text code>{val}</Text>}
        />
        <Table.Column
          title="Nama Karyawan"
          key="nama"
          render={(_, record: IPasien) => (
            <div>
              <Text strong>{record.nama_lengkap}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {record.jenis_kelamin} • Lahir: {record.tanggal_lahir}
              </Text>
            </div>
          )}
        />
        <Table.Column
          title="Departemen & Posisi"
          key="dept"
          render={(_, record: IPasien) => (
            <div>
              <Text>{record.departemen}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {record.posisi}
              </Text>
            </div>
          )}
        />
        <Table.Column
          dataIndex="golongan_darah"
          title="Gol. Darah"
          render={(val) => (
            <Tag color="magenta">Gol. {val}</Tag>
          )}
        />
        <Table.Column
          dataIndex="riwayat_alergi"
          title="Riwayat Alergi"
          render={(val) =>
            val && val !== "Tidak ada" ? (
              <Tag color="volcano">{val}</Tag>
            ) : (
              <Text type="secondary">-</Text>
            )
          }
        />
        <Table.Column
          dataIndex="nomor_telepon"
          title="Kontak Telepon"
        />
        <Table.Column
          dataIndex="status_kerja"
          title="Status"
          render={(status) => (
            <Tag color={status === "Aktif" ? "green" : "default"}>
              {status}
            </Tag>
          )}
        />
        <Table.Column
          title="Aksi"
          dataIndex="actions"
          fixed="right"
          render={(_, record: IPasien) => (
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
