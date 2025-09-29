import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  FaWeight,
  FaBox,
  FaTruck,
  FaUsers,
  FaListAlt,
  FaChartBar,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

export const SidebarComponent = () => {
  //   const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <Sidebar
      className="fixed bg-white text-black h-screen overflow-y-auto"
      //   collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onBackdropClick={() => setToggled(false)}
    >
      <Menu
        menuItemStyles={{
          button: {
            "&:hover": {
              backgroundColor: "#1e3a8a",
              color: "#ffff",
            },
          },
        }}
        className="mt-12"
      >
        <SubMenu icon={<FaWeight />} label="Penimbangan">
          <MenuItem icon={<FaWeight />} component={<Link to="/" />}>
            Penimbangan I
          </MenuItem>
          <MenuItem
            icon={<FaWeight />}
            component={<Link to="/penimbangan-dua" />}
          >
            Penimbangan II
          </MenuItem>
        </SubMenu>
        <MenuItem icon={<FaBox />} component={<Link to="/barang" />}>
          Master Product
        </MenuItem>
        <MenuItem
          icon={<FaUsers />}
          component={<Link to="/supplier-customer" />}
        >
          Supplier/Customer
        </MenuItem>
        <MenuItem icon={<FaTruck />} component={<Link to="/transporter" />}>
          Transporter
        </MenuItem>

        <SubMenu icon={<FaTruck />} label="Check Kendaraan">
          <MenuItem
            icon={<FaSignInAlt />}
            component={<Link to="/timbang-masuk" />}
          >
            Timbang Masuk
          </MenuItem>
          <MenuItem
            icon={<FaSignOutAlt />}
            component={<Link to="/timbang-keluar" />}
          >
            Timbang Keluar
          </MenuItem>
        </SubMenu>

        <SubMenu icon={<FaChartBar />} label="Laporan">
          <MenuItem
            icon={<FaListAlt />}
            component={<Link to="/laporan-harian" />}
          >
            Harian
          </MenuItem>
          <MenuItem
            icon={<FaListAlt />}
            component={<Link to="/laporan/per-nomor-kendaraan" />}
          >
            per No. Kendaraan
          </MenuItem>
          <MenuItem
            icon={<FaListAlt />}
            component={<Link to="/laporan/per-product" />}
          >
            per Product
          </MenuItem>
          <MenuItem
            icon={<FaListAlt />}
            component={<Link to="/laporan/per-customer" />}
          >
            per Customer/Suplier
          </MenuItem>
          <MenuItem
            icon={<FaListAlt />}
            component={<Link to="/laporan/per-nomor-do-po" />}
          >
            per Nomor DO/PO
          </MenuItem>
          <MenuItem
            icon={<FaListAlt />}
            component={<Link to="/laporan/per-transporter" />}
          >
            per Transporter
          </MenuItem>
          <MenuItem
            icon={<FaListAlt />}
            component={<Link to="/laporan/daftar-product" />}
          >
            Daftar Product
          </MenuItem>
          <MenuItem
            icon={<FaListAlt />}
            component={<Link to="/laporan/daftar-customer" />}
          >
            Daftar Customer/Suplier
          </MenuItem>
          <MenuItem
            icon={<FaListAlt />}
            component={<Link to="/laporan/daftar-transporter" />}
          >
            Daftar Transporter
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};
