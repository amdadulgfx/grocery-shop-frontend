import * as React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../reduxMine/features/authApi';

const drawerWidth = 240;
const AdminDashboard = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const outlet = useOutlet();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('accessToken');
    navigate("/admin-login");
};

  const drawer = (
    <div style={{ paddingLeft: "10px" }}>
      <Toolbar />
      <Divider />
      <List>
        <Link to="/admin-dashboard/post-product" > Post Product </Link>
      </List>
      <Divider />
      <List>
        <Link to="/admin-dashboard/add-category" > Add Category </Link>
      </List>
      <Divider />
      <List>
        <Link to="/admin-dashboard/categories" > Categories </Link>
      </List>
      <Divider />
      <List>
        <Link to="/admin-dashboard/admin-productLists" > Products </Link>
      </List>
      <Divider />
      <List>
        <Link to="/admin-dashboard/subCategories" > Sub Categories </Link>
      </List>
      <Divider />
      <List>
        <Link to="/admin-dashboard/Add-category" > Add Category </Link>
      </List>
      <Divider />
      <List>
        <Link to="/" > Home </Link>
      </List>
      <Divider />
      <List>
        <Button
          variant="contained"
          sx={{
            borderRadius: 16,
            px: 3
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </List>
      <Divider />
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
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Grocery Haven
          </Typography>
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
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
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