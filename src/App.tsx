import React, { useState } from "react";
import { Refine, Authenticated } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import simpleRestDataProvider from "@refinedev/simple-rest";

import { App as AntdApp, Layout, theme, Grid } from "antd";
import {
  MedicineBoxOutlined,
  HeartOutlined,
  ShopOutlined,
  SmileOutlined,
  ExperimentOutlined,
  SafetyCertificateOutlined,
  FileDoneOutlined,
  TeamOutlined,
  AppstoreOutlined,
  ToolOutlined,
  ReadOutlined,
  PictureOutlined,
  PhoneOutlined,
  DashboardOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";

import { LoginPage } from "./pages/login";
import { authProvider } from "./providers/auth";
import { ColorModeContextProvider } from "./contexts/color-mode";

// Komponen Layout Global
import { Header } from "./components/header";
import { CustomSider } from "./components/sider";
import { CustomBreadcrumb } from "./components/breadcrumb";
import { CustomFooter } from "./components/footer";

// Modul Halaman Baru PRIMA K3
import { DashboardPage } from "./pages/dashboard";
import { PoliUmumPage } from "./pages/layanan-kesehatan/poli-umum";
import { FarmasiPage } from "./pages/layanan-kesehatan/farmasi";
import { KonselingPage } from "./pages/layanan-kesehatan/konseling";
import { PemeriksaanPenunjangPage } from "./pages/layanan-kesehatan/pemeriksaan-penunjang";
import { ManajemenK3Page } from "./pages/layanan-kesehatan/manajemen-k3";
import { PerizinanPage } from "./pages/fasilitas-kesehatan/perizinan";
import { SioKlinikPage } from "./pages/fasilitas-kesehatan/perizinan/sio-klinik";
import { SioFarmasiPage } from "./pages/fasilitas-kesehatan/perizinan/sio-farmasi";
import { SipNakesPage } from "./pages/fasilitas-kesehatan/perizinan/sip-nakes";
import { SdmKesehatanPage } from "./pages/fasilitas-kesehatan/sdm-kesehatan";
import { InformasiRuanganPage } from "./pages/fasilitas-kesehatan/informasi-ruangan";
import { PeralatanMedisPage } from "./pages/fasilitas-kesehatan/peralatan-medis";
import { EdukasiKesehatanPage } from "./pages/informasi-media/edukasi-kesehatan";
import { EdukasiKesehatanCreate } from "./pages/informasi-media/edukasi-kesehatan/create";
import { EdukasiKesehatanShow } from "./pages/informasi-media/edukasi-kesehatan/show";
import { FlyerPosterPage } from "./pages/informasi-media/flyer-poster";
import { HubungiKamiPage } from "./pages/hubungi-kami";

// Modul Halaman Lama (Legacy)
import {
  RiwayatMedisList,
  RiwayatMedisCreate,
  RiwayatMedisEdit,
  RiwayatMedisShow,
} from "./pages/riwayat-medis";
import {
  SuratSakitList,
  SuratSakitCreate,
  SuratSakitEdit,
  SuratSakitShow,
} from "./pages/surat-sakit";
import {
  PasienList,
  PasienCreate,
  PasienEdit,
  PasienShow,
} from "./pages/pasien";
import {
  PemeriksaanK3List,
  PemeriksaanK3Create,
  PemeriksaanK3Edit,
  PemeriksaanK3Show,
} from "./pages/pemeriksaan-k3";

const { Content } = Layout;
const { useBreakpoint } = Grid;

// Layout Utama Komprehensif
const MainAppLayout: React.FC = () => {
  const { token } = theme.useToken();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleToggle = () => {
    if (isMobile) {
      setMobileDrawerOpen(!mobileDrawerOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: token.colorBgLayout }}>
      {/* Header Sticky */}
      <Header
        sticky
        collapsed={isMobile ? !mobileDrawerOpen : collapsed}
        onToggleCollapse={handleToggle}
      />

      <Layout hasSider style={{ backgroundColor: token.colorBgLayout }}>
        {/* Sider Kustom dengan Pencarian & Mobile Drawer */}
        <CustomSider
          collapsed={collapsed}
          mobileOpen={mobileDrawerOpen}
          onMobileClose={() => setMobileDrawerOpen(false)}
        />

        {/* Area Konten Utama */}
        <Layout style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 64px)" }}>
          <Content
            style={{
              padding: isMobile ? "16px 12px" : "24px 32px",
              maxWidth: 1400,
              width: "100%",
              margin: "0 auto",
              flex: 1,
            }}
          >
            {/* Breadcrumb Dinamis */}
            <CustomBreadcrumb />

            {/* Outlet Halaman */}
            <Outlet />
          </Content>

          {/* Footer Resmi */}
          <CustomFooter />
        </Layout>
      </Layout>
    </Layout>
  );
};

// URL API Backend Express
const API_URL = "https://backend-prima-k3-production.up.railway.app/api";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={simpleRestDataProvider(API_URL)}
                authProvider={authProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                resources={[
                  {
                    name: "dashboard",
                    list: "/",
                    meta: {
                      label: "Dashboard",
                      icon: <DashboardOutlined />,
                    },
                  },
                  {
                    name: "poli_umum",
                    list: "/layanan-kesehatan/poli-umum",
                    meta: {
                      label: "Layanan Poli Umum",
                      icon: <HeartOutlined />,
                    },
                  },
                  {
                    name: "medicines",
                    list: "/layanan-kesehatan/farmasi",
                    meta: {
                      label: "Layanan Farmasi",
                      icon: <ShopOutlined />,
                    },
                  },
                  {
                    name: "bookings",
                    list: "/layanan-kesehatan/konseling",
                    meta: {
                      label: "Layanan Konseling Psikolog",
                      icon: <SmileOutlined />,
                    },
                  },
                  {
                    name: "pemeriksaan_penunjang",
                    list: "/layanan-kesehatan/pemeriksaan-penunjang",
                    meta: {
                      label: "Layanan Pemeriksaan Penunjang",
                      icon: <ExperimentOutlined />,
                    },
                  },
                  {
                    name: "manajemen_k3",
                    list: "/layanan-kesehatan/manajemen-k3",
                    meta: {
                      label: "Manajemen K3",
                      icon: <SafetyCertificateOutlined />,
                    },
                  },
                  {
                    name: "perizinan",
                    list: "/fasilitas-kesehatan/perizinan",
                    meta: {
                      label: "Perizinan",
                      icon: <FileDoneOutlined />,
                    },
                  },
                  {
                    name: "nakes",
                    list: "/fasilitas-kesehatan/sdm-kesehatan",
                    meta: {
                      label: "SDM Kesehatan",
                      icon: <TeamOutlined />,
                    },
                  },
                  {
                    name: "ruangan",
                    list: "/fasilitas-kesehatan/informasi-ruangan",
                    meta: {
                      label: "Informasi Ruangan",
                      icon: <AppstoreOutlined />,
                    },
                  },
                  {
                    name: "alat_medis",
                    list: "/fasilitas-kesehatan/peralatan-medis",
                    meta: {
                      label: "Peralatan Medis",
                      icon: <ToolOutlined />,
                    },
                  },
                  {
                    name: "artikel",
                    list: "/informasi-media/edukasi-kesehatan",
                    create: "/informasi-media/edukasi-kesehatan/create",
                    show: "/informasi-media/edukasi-kesehatan/show/:id",
                    meta: {
                      label: "Edukasi Kesehatan",
                      icon: <ReadOutlined />,
                    },
                  },
                  {
                    name: "flyer",
                    list: "/informasi-media/flyer-poster",
                    meta: {
                      label: "Flyer dan Poster",
                      icon: <PictureOutlined />,
                    },
                  },
                  {
                    name: "hubungi_kami",
                    list: "/hubungi-kami",
                    meta: {
                      label: "Hubungi Kami",
                      icon: <PhoneOutlined />,
                    },
                  },
                  // Resource Legacy
                  {
                    name: "surat_sakit",
                    list: "/surat-sakit",
                    create: "/surat-sakit/create",
                    edit: "/surat-sakit/edit/:id",
                    show: "/surat-sakit/show/:id",
                  },
                  {
                    name: "riwayat_medis",
                    list: "/riwayat-medis",
                    create: "/riwayat-medis/create",
                    edit: "/riwayat-medis/edit/:id",
                    show: "/riwayat-medis/show/:id",
                  },
                  {
                    name: "pemeriksaan_k3",
                    list: "/pemeriksaan-k3",
                    create: "/pemeriksaan-k3/create",
                    edit: "/pemeriksaan-k3/edit/:id",
                    show: "/pemeriksaan-k3/show/:id",
                  },
                  {
                    name: "pasien",
                    list: "/pasien",
                    create: "/pasien/create",
                    edit: "/pasien/edit/:id",
                    show: "/pasien/show/:id",
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  title: {
                    icon: <PlusCircleFilled style={{ color: "#0F766E" }} />,
                    text: "Prima K3",
                  },
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-layout"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <MainAppLayout />
                      </Authenticated>
                    }
                  >
                    {/* 1. Dashboard */}
                    <Route index element={<DashboardPage />} />

                    {/* 2. Layanan Kesehatan */}
                    <Route path="/layanan-kesehatan">
                      <Route path="poli-umum" element={<PoliUmumPage />} />
                      <Route path="farmasi" element={<FarmasiPage />} />
                      <Route path="konseling" element={<KonselingPage />} />
                      <Route path="pemeriksaan-penunjang" element={<PemeriksaanPenunjangPage />} />
                      <Route path="manajemen-k3" element={<ManajemenK3Page />} />
                    </Route>

                    {/* 3. Fasilitas Kesehatan */}
                    <Route path="/fasilitas-kesehatan">
                      <Route path="perizinan">
                        <Route index element={<PerizinanPage />} />
                        <Route path="sio-klinik" element={<SioKlinikPage />} />
                        <Route path="sio-farmasi" element={<SioFarmasiPage />} />
                        <Route path="sip-nakes" element={<SipNakesPage />} />
                      </Route>
                      <Route path="sdm-kesehatan" element={<SdmKesehatanPage />} />
                      <Route path="informasi-ruangan" element={<InformasiRuanganPage />} />
                      <Route path="peralatan-medis" element={<PeralatanMedisPage />} />
                    </Route>

                    {/* 4. Informasi dan Media */}
                    <Route path="/informasi-media">
                      <Route path="edukasi-kesehatan">
                        <Route index element={<EdukasiKesehatanPage />} />
                        <Route path="create" element={<EdukasiKesehatanCreate />} />
                        <Route path="show/:id" element={<EdukasiKesehatanShow />} />
                      </Route>
                      <Route path="flyer-poster" element={<FlyerPosterPage />} />
                    </Route>

                    {/* 5. Hubungi Kami */}
                    <Route path="/hubungi-kami" element={<HubungiKamiPage />} />

                    {/* Legacy Routes */}
                    <Route path="/surat-sakit">
                      <Route index element={<SuratSakitList />} />
                      <Route path="create" element={<SuratSakitCreate />} />
                      <Route path="edit/:id" element={<SuratSakitEdit />} />
                      <Route path="show/:id" element={<SuratSakitShow />} />
                    </Route>

                    <Route path="/riwayat-medis">
                      <Route index element={<RiwayatMedisList />} />
                      <Route path="create" element={<RiwayatMedisCreate />} />
                      <Route path="edit/:id" element={<RiwayatMedisEdit />} />
                      <Route path="show/:id" element={<RiwayatMedisShow />} />
                    </Route>

                    <Route path="/pemeriksaan-k3">
                      <Route index element={<PemeriksaanK3List />} />
                      <Route path="create" element={<PemeriksaanK3Create />} />
                      <Route path="edit/:id" element={<PemeriksaanK3Edit />} />
                      <Route path="show/:id" element={<PemeriksaanK3Show />} />
                    </Route>

                    <Route path="/pasien">
                      <Route index element={<PasienList />} />
                      <Route path="create" element={<PasienCreate />} />
                      <Route path="edit/:id" element={<PasienEdit />} />
                      <Route path="show/:id" element={<PasienShow />} />
                    </Route>

                    <Route path="*" element={<ErrorComponent />} />
                  </Route>

                  <Route
                    element={
                      <Authenticated
                        key="authenticated-auth-pages"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<LoginPage />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;