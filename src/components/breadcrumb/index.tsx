import React from "react";
import { Breadcrumb as AntdBreadcrumb, theme } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useLocation, Link } from "react-router";

export const CustomBreadcrumb: React.FC = () => {
  const { token } = theme.useToken();
  const location = useLocation();
  const pathname = location.pathname;

  if (pathname === "/" || pathname === "") {
    return null;
  }

  // Tentukan items breadcrumb berdasarkan rute aktif
  const items: Array<{ title: React.ReactNode }> = [
    {
      title: (
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <HomeOutlined />
          <span>Dashboard</span>
        </Link>
      ),
    },
  ];

  // 1. Hubungi Kami: Dashboard > Hubungi Kami
  if (pathname === "/hubungi-kami") {
    items.push({ title: "Hubungi Kami" });
  }

  // 2. Layanan Kesehatan: Dashboard > Layanan Kesehatan > (halaman)
  else if (pathname.startsWith("/layanan-kesehatan/")) {
    items.push({ title: "Layanan Kesehatan" });

    if (pathname === "/layanan-kesehatan/poli-umum") {
      items.push({ title: "Layanan Poli Umum" });
    } else if (pathname === "/layanan-kesehatan/farmasi") {
      items.push({ title: "Layanan Farmasi" });
    } else if (pathname === "/layanan-kesehatan/konseling") {
      items.push({ title: "Layanan Konseling Psikolog" });
    } else if (pathname === "/layanan-kesehatan/pemeriksaan-penunjang") {
      items.push({ title: "Layanan Pemeriksaan Penunjang" });
    } else if (pathname === "/layanan-kesehatan/manajemen-k3") {
      items.push({ title: "Manajemen K3" });
    }
  }

  // 3. Fasilitas Kesehatan: Dashboard > Fasilitas Kesehatan > (halaman)
  else if (pathname.startsWith("/fasilitas-kesehatan/")) {
    items.push({ title: "Fasilitas Kesehatan" });

    if (pathname === "/fasilitas-kesehatan/perizinan") {
      items.push({ title: "Perizinan" });
    } else if (pathname === "/fasilitas-kesehatan/perizinan/sio-klinik") {
      items.push({
        title: <Link to="/fasilitas-kesehatan/perizinan">Perizinan</Link>,
      });
      items.push({ title: "SIO Klinik Pratama" });
    } else if (pathname === "/fasilitas-kesehatan/perizinan/sio-farmasi") {
      items.push({
        title: <Link to="/fasilitas-kesehatan/perizinan">Perizinan</Link>,
      });
      items.push({ title: "SIO Farmasi" });
    } else if (pathname === "/fasilitas-kesehatan/perizinan/sip-nakes") {
      items.push({
        title: <Link to="/fasilitas-kesehatan/perizinan">Perizinan</Link>,
      });
      items.push({ title: "Daftar SIP Tenaga Kesehatan" });
    } else if (pathname === "/fasilitas-kesehatan/sdm-kesehatan") {
      items.push({ title: "SDM Kesehatan" });
    } else if (pathname === "/fasilitas-kesehatan/informasi-ruangan") {
      items.push({ title: "Informasi Ruangan" });
    } else if (pathname === "/fasilitas-kesehatan/peralatan-medis") {
      items.push({ title: "Peralatan Medis" });
    }
  }

  // 4. Informasi dan Media: Dashboard > Informasi dan Media > (halaman)
  else if (pathname.startsWith("/informasi-media/")) {
    items.push({ title: "Informasi dan Media" });

    if (pathname === "/informasi-media/edukasi-kesehatan") {
      items.push({ title: "Edukasi Kesehatan" });
    } else if (pathname === "/informasi-media/edukasi-kesehatan/create") {
      items.push({
        title: <Link to="/informasi-media/edukasi-kesehatan">Edukasi Kesehatan</Link>,
      });
      items.push({ title: "Tambah Artikel" });
    } else if (pathname.startsWith("/informasi-media/edukasi-kesehatan/show/")) {
      items.push({
        title: <Link to="/informasi-media/edukasi-kesehatan">Edukasi Kesehatan</Link>,
      });
      items.push({ title: "Detail Artikel" });
    } else if (pathname === "/informasi-media/flyer-poster") {
      items.push({ title: "Flyer dan Poster" });
    }
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <AntdBreadcrumb
        items={items}
        style={{
          fontSize: 13,
          color: token.colorTextSecondary,
        }}
      />
    </div>
  );
};
