import React, { useState } from "react";
import { useCreate, useDelete, useList, useUpdate } from "@refinedev/core";
import {
  Button,
  Card,
  Col,
  Empty,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Row,
  Spin,
  Switch,
  Tag,
  Popconfirm,
  Upload,
  Image,
} from "antd";
import type { UploadFile } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { API_URL } from "../../../providers/constants";

interface Medicine {
  id: string | number;
  name: string;
  category: string;
  stock: number;
  is_available: boolean;
  image_url?: string | null;
}

interface EditMedicineValues {
  name: string;
  stock: number;
}

export const FarmasiPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchText, setSearchText] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingMedicineId, setDeletingMedicineId] = useState<string | number | null>(null);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [editImageFiles, setEditImageFiles] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const { mutate: createMedicine } = useCreate();
  const { mutate: updateMedicine } = useUpdate();
  const { mutate: deleteMedicine } = useDelete();

  // Menarik data langsung dari Backend Express (GET /api/medicines)
  const { result, query } = useList<Medicine>({
    resource: "medicines",
  });

  const { isLoading, isError } = query;
  const medicines = result.data;

  // Filter kategori & search
  const filteredMedicines = medicines.filter((item) => {
    const matchCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
    const matchSearch = item.name
      ?.toLowerCase()
      .includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleCreateMedicine = (values: {
    name: string;
    category: string;
    stock: number;
    is_available: boolean;
    image_url?: string;
  }) => {
    setIsCreating(true);
    createMedicine(
      {
        resource: "medicines",
        values: {
          ...values,
          image_url: values.image_url?.trim() || null,
        },
      },
      {
        onSuccess: () => {
          setIsCreating(false);
          message.success("Obat berhasil ditambahkan.");
          form.resetFields();
          setIsCreateModalOpen(false);
        },
        onError: (error) => {
          setIsCreating(false);
          message.error(`Gagal menambahkan obat: ${error.message}`);
        },
      },
    );
  };

  const handleDeleteMedicine = (id: string | number) => {
    setDeletingMedicineId(id);
    deleteMedicine(
      { resource: "medicines", id },
      {
        onSuccess: () => {
          setDeletingMedicineId(null);
          setIsEditModalOpen(false);
          setSelectedMedicine(null);
          message.success("Obat berhasil dihapus.");
        },
        onError: (error) => {
          setDeletingMedicineId(null);
          message.error(`Gagal menghapus obat: ${error.message}`);
        },
      },
    );
  };

  const openEditModal = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setEditImageFiles([]);
    editForm.setFieldsValue({ name: medicine.name, stock: medicine.stock });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedMedicine(null);
    setEditImageFiles([]);
    editForm.resetFields();
  };

  const handleUpdateMedicine = async (values: EditMedicineValues) => {
    if (!selectedMedicine) return;

    setIsUpdating(true);
    try {
      const imageFile = editImageFiles[0]?.originFileObj;
      let imageUrl = selectedMedicine.image_url;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const response = await fetch(`${API_URL}/upload`, {
          method: "POST",
          body: formData,
        });
        const result: { url?: string; error?: string } = await response.json();

        if (!response.ok || !result.url) {
          throw new Error(result.error || "Gagal mengunggah gambar obat.");
        }
        imageUrl = result.url;
      }

      updateMedicine(
        {
          resource: "medicines",
          id: selectedMedicine.id,
          meta: { method: "put" },
          values: {
            name: values.name.trim(),
            stock: values.stock,
            image_url: imageUrl || null,
          },
        },
        {
          onSuccess: () => {
            setIsUpdating(false);
            message.success("Data obat berhasil diperbarui.");
            closeEditModal();
          },
          onError: (error) => {
            setIsUpdating(false);
            message.error(`Gagal memperbarui obat: ${error.message}`);
          },
        },
      );
    } catch (error) {
      setIsUpdating(false);
      message.error(
        `Gagal memperbarui obat: ${error instanceof Error ? error.message : "Terjadi kesalahan."}`,
      );
    }
  };

  return (
    <div style={{ padding: "8px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ fontSize: 24, fontWeight: "bold", margin: 0 }}>Daftar Obat</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Tambah Obat
        </Button>
      </div>

      {/* Input Pencarian */}
      <Input.Search
        placeholder="Cari Obat..."
        allowClear
        style={{ maxWidth: 360, marginBottom: 16 }}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Filter Kategori */}
      <div style={{ marginBottom: 24 }}>
        <Radio.Group
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value="Semua">Semua</Radio.Button>
          <Radio.Button value="FLU">FLU</Radio.Button>
          <Radio.Button value="Demam">Demam</Radio.Button>
          <Radio.Button value="Nyeri">Nyeri</Radio.Button>
        </Radio.Group>
      </div>

      {/* Indikator Loading */}
      {isLoading && (
        <div style={{ textAlign: "center", padding: 40 }}>
          <Spin size="large" tip="Mengambil data obat dari server..." />
        </div>
      )}

      {/* Pesan Error jika Backend Mati */}
      {isError && (
        <div style={{ color: "red", padding: 20 }}>
          Gagal terhubung ke backend server (pastikan backend Express di port 5000 aktif).
        </div>
      )}

      {/* Jika Data Kosong */}
      {!isLoading && !isError && filteredMedicines.length === 0 && (
        <Empty description="Belum ada data obat" />
      )}

      {/* Grid Kartu Obat */}
      <Row gutter={[16, 16]}>
        {filteredMedicines.map((item) => {
          const stock = Number(item.stock ?? 0);
          const isAvailable = item.is_available && stock > 0;
          const availabilityLabel = !item.is_available
            ? "Tidak tersedia"
            : stock > 0
              ? "Tersedia"
              : "Habis";

          return (
            <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={item.name}
                    src={item.image_url || "https://placehold.co/300x200?text=Foto+Obat"}
                    style={{ height: 160, objectFit: "cover" }}
                  />
                }
                actions={[
                  <Button
                    key="edit"
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => openEditModal(item)}
                  >
                    Edit
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={item.name}
                  description={
                    <div>
                      <p style={{ margin: "4px 0", color: "#888" }}>{item.category}</p>
                      <Tag color={isAvailable ? "green" : "red"}>
                        {availabilityLabel}
                      </Tag>
                      <p style={{ margin: "8px 0 0" }}>Stok: {stock}</p>
                    </div>
                  }
                />
              </Card>
            </Col>
          );
        })}
      </Row>

      <Modal
        title="Tambah Obat"
        open={isCreateModalOpen}
        onCancel={() => {
          setIsCreateModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ stock: 0, is_available: true }}
          onFinish={handleCreateMedicine}
        >
          <Form.Item
            label="Nama Obat"
            name="name"
            rules={[{ required: true, whitespace: true, message: "Nama obat wajib diisi." }]}
          >
            <Input placeholder="Contoh: Paracetamol 500 mg" maxLength={150} />
          </Form.Item>
          <Form.Item
            label="Kategori"
            name="category"
            rules={[{ required: true, whitespace: true, message: "Kategori wajib diisi." }]}
          >
            <Input placeholder="Contoh: Demam" maxLength={100} />
          </Form.Item>
          <Form.Item
            label="Stok"
            name="stock"
            rules={[{ required: true, message: "Stok wajib diisi." }]}
          >
            <InputNumber min={0} precision={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="URL Gambar (opsional)"
            name="image_url"
            rules={[{ type: "url", message: "Masukkan URL gambar yang valid." }]}
          >
            <Input placeholder="https://..." />
          </Form.Item>
          <Form.Item
            label="Tersedia"
            name="is_available"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button
              onClick={() => {
                setIsCreateModalOpen(false);
                form.resetFields();
              }}
            >
              Batal
            </Button>
            <Button type="primary" htmlType="submit" loading={isCreating}>
              Simpan Obat
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Edit Obat"
        open={isEditModalOpen}
        onCancel={closeEditModal}
        footer={null}
        destroyOnClose
      >
        <Form form={editForm} layout="vertical" onFinish={handleUpdateMedicine}>
          <Form.Item
            label="Nama Obat"
            name="name"
            rules={[{ required: true, whitespace: true, message: "Nama obat wajib diisi." }]}
          >
            <Input maxLength={150} />
          </Form.Item>
          <Form.Item
            label="Stok"
            name="stock"
            rules={[{ required: true, message: "Stok wajib diisi." }]}
          >
            <InputNumber min={0} precision={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Gambar Obat">
            {selectedMedicine?.image_url && (
              <Image
                src={selectedMedicine.image_url}
                alt={selectedMedicine.name}
                width={120}
                style={{ display: "block", marginBottom: 8, objectFit: "cover" }}
              />
            )}
            <Upload
              accept="image/*"
              maxCount={1}
              fileList={editImageFiles}
              beforeUpload={(file) => {
                if (!file.type.startsWith("image/")) {
                  message.error("File harus berupa gambar.");
                  return Upload.LIST_IGNORE;
                }
                if (file.size > 5 * 1024 * 1024) {
                  message.error("Ukuran gambar maksimal 5 MB.");
                  return Upload.LIST_IGNORE;
                }
                return false;
              }}
              onChange={({ fileList }) => setEditImageFiles(fileList.slice(-1))}
              onRemove={() => setEditImageFiles([])}
            >
              <Button icon={<UploadOutlined />}>Pilih Gambar Baru</Button>
            </Upload>
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <Popconfirm
              title="Hapus obat ini?"
              description="Data akan dihapus permanen. Tindakan ini tidak bisa dibatalkan."
              okText="Hapus"
              cancelText="Batal"
              okButtonProps={{ danger: true, loading: deletingMedicineId === selectedMedicine?.id }}
              onConfirm={() => selectedMedicine && handleDeleteMedicine(selectedMedicine.id)}
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                loading={deletingMedicineId === selectedMedicine?.id}
              >
                Hapus Obat
              </Button>
            </Popconfirm>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <Button onClick={closeEditModal}>Batal</Button>
              <Button type="primary" htmlType="submit" loading={isUpdating}>
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};