import React, { useState } from "react";
import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import {
  Table,
  Space,
  Tag,
  Typography,
  Image,
  Button,
  Modal,
  Badge,
  theme,
} from "antd";
import {
  FileTextOutlined,
  EyeOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useNavigation } from "@refinedev/core";
import type { ISuratSakit } from "../../providers/mock-data";

const { Text } = Typography;

export const SuratSakitList: React.FC = () => {
  const { token } = theme.useToken();
  const { create } = useNavigation();
  const { tableProps } = useTable<ISuratSakit>({
    syncWithLocation: true,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  return (
    <List
      title={
        <Space>
          <FileTextOutlined style={{ color: token.colorInfo, fontSize: 22 }} />
          <span>Pengelolaan & Verifikasi Surat Sakit Karyawan</span>
        </Space>
      }
      headerButtons={
        <Button
          type="primary"
          icon={<UploadOutlined />}
          style={{ backgroundColor: token.colorPrimary, borderColor: token.colorPrimary }}
          onClick={() => create("surat_sakit")}
        >
          Upload Surat Sakit Baru
        </Button>
      }
    >
      <Table {...tableProps} rowKey="id" scroll={{ x: 1000 }}>
        <Table.Column
          title="Lampiran Dokumen"
          dataIndex="file_url"
          render={(url: string) => (
            url ? (
              <Image
                src={url}
                alt="Surat Sakit"
                width={50}
                height={50}
                style={{ objectFit: "cover", borderRadius: 6, cursor: "pointer" }}
                preview={{
                  mask: <EyeOutlined style={{ fontSize: 14 }} />,
                }}
              />
            ) : (
              <Tag>Tanpa File</Tag>
            )
          )}
        />
        <Table.Column
          dataIndex="nomor_surat"
          title="No. Surat"
          render={(val) => <Text code>{val}</Text>}
        />
        <Table.Column
          title="Karyawan"
          key="pasien"
          render={(_, record: ISuratSakit) => (
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
          title="Faskes / Dokter Penerbit"
          key="faskes"
          render={(_, record: ISuratSakit) => (
            <div>
              <Text style={{ fontSize: 13 }}>{record.faskes_penerbit}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {record.nama_dokter}
              </Text>
            </div>
          )}
        />
        <Table.Column
          title="Periode Istirahat"
          key="periode"
          render={(_, record: ISuratSakit) => (
            <div>
              <Text style={{ fontSize: 12 }}>
                {record.tanggal_mulai} s/d {record.tanggal_selesai}
              </Text>
              <br />
              <Tag color="cyan">{record.jumlah_hari} Hari</Tag>
            </div>
          )}
        />
        <Table.Column
          dataIndex="diagnosa"
          title="Diagnosa"
          render={(val) => (
            <Text ellipsis style={{ maxWidth: 180, display: "inline-block" }}>
              {val}
            </Text>
          )}
        />
        <Table.Column
          dataIndex="status_verifikasi"
          title="Status Verifikasi"
          render={(status) => {
            if (status === "Disetujui") {
              return (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Disetujui (Sah)
                </Tag>
              );
            }
            if (status === "Ditolak") {
              return (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  Ditolak
                </Tag>
              );
            }
            return (
              <Tag icon={<ClockCircleOutlined />} color="warning">
                Menunggu Review
              </Tag>
            );
          }}
        />
        <Table.Column
          title="Aksi"
          dataIndex="actions"
          fixed="right"
          render={(_, record: ISuratSakit) => (
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
