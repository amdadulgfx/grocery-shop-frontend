import * as React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Button, CssBaseline, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate, useOutlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../reduxMine/features/authApi';
import HeaderLogo from "../../../assets/Logos/header_logo.png";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CategoryIcon from '@mui/icons-material/Category';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AddRoadOutlinedIcon from '@mui/icons-material/AddRoadOutlined';

const drawerWidth = 240;
const AdminDashboard = (props) => {
  document.title = "Admin Dashboard | Grocery Heaven"
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const outlet = useOutlet();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('accessToken');
    navigate("/admin-login");
  };

  const drawer = (
    <div>
      <Toolbar >
        <Box>
          <img
            height="35px"
            width="100%"
            src={HeaderLogo}
            alt="Main_logo"
          />
        </Box>
      </Toolbar>
      <Box sx={{ px: 1, py: 2 }} >
        {lists?.map((list) => (
          <Box key={list?.ID} sx={{ display: "flex", mb: 1.5, py: "4px", px: 0.8, borderRadius: list?.route === location?.pathname && "6px", backgroundColor: list?.route === location?.pathname ? "#EBF8F4" : "#FFFFFF" }}>
            <list.icons sx={{ fontSize: { xs: "18px", sm: "25px" }, color: list?.route === location?.pathname ? "#00A76F" : "#637381" }} />
            <Typography sx={{ textDecoration: "none", ml: "10px", pt: { sm: "2px" }, color: list?.route === location?.pathname ? "#00A76F" : "#637381", fontSize: { xs: "14px", sm: "18px" }, fontWeight: list?.route === location?.pathname ? 600 : 500 }} component={Link} to={list?.route}>{list?.name}</Typography>
          </Box>
        ))}
      </Box>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon sx={{ color: "#00A76F" }} />
            </IconButton>
            <Typography sx={{ color: "#637381", fontSize: { xs: "18px", sm: "22px" }, fontWeight: 700 }}>
              {location?.pathname === "/admin-dashboard" && "Dashboard"}
              {location?.pathname === "/admin-dashboard/admin-productLists" && "Products"}
              {location?.pathname === "/admin-dashboard/post-product" && "Post Product"}
              {location?.pathname === "/admin-dashboard/categories" && "Categories"}
              {location?.pathname === "/admin-dashboard/add-category" && "Post Category"}
              {location?.pathname === "/admin-dashboard/subCategories" && "Subcategories"}
              {location?.pathname === "/admin-dashboard/add-subCategory" && "Post Subcategory"}
            </Typography>
          </Box>
          <Box>
            <Button
              sx={{
                borderRadius: 16,
                px: 3,
                backgroundColor: "#00A76F",
                color: "#FFFFFF",
                fontWeight: 600,
                "&:hover": {
                  borderRadius: 16,
                  px: 3,
                  backgroundColor: "#00A76F",
                  color: "#FFFFFF",
                  fontWeight: 600,
                }
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)`, overflowX: "auto" } }}
      >
        <Toolbar />
          {outlet}
      </Box>
    </Box>
  );
}

AdminDashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AdminDashboard;

const lists = [
  {
    name: "Products",
    ID: 1,
    route: "/admin-dashboard/admin-productLists",
    icons: ShoppingBagIcon
  },
  {
    name: "Post Product",
    ID: 2,
    route: "/admin-dashboard/post-product",
    icons: PostAddIcon
  },
  {
    name: "Categories",
    ID: 3,
    route: "/admin-dashboard/categories",
    icons: CategoryIcon
  },
  {
    name: "Post Category",
    ID: 4,
    route: "/admin-dashboard/add-category",
    icons: AddCircleOutlineOutlinedIcon
  },
  {
    name: "Subcategories",
    ID: 4,
    route: "/admin-dashboard/subCategories",
    icons: AccountTreeOutlinedIcon
  },
  {
    name: "Post Subcategory",
    ID: 5,
    route: "/admin-dashboard/add-subCategory",
    icons: AddRoadOutlinedIcon
  }];