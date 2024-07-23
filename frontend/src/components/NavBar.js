import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Container,
} from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { logout, user } = useAuth(); // Adicionado 'user' ao contexto

  const handleMenuOpen = (setter) => (event) => {
    setter(event.currentTarget);
  };

  const handleMenuClose = (setter) => () => {
    setter(null);
  };

  const handleNavigation = (path) => () => {
    handleMenuClose(setAnchorElUser)();
    navigate(path);
  };

  const handleLogout = () => {
    handleMenuClose(setAnchorElUser)();
    logout();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open drawer"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen(setAnchorElNav)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleMenuClose(setAnchorElNav)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem onClick={handleNavigation("/user")}>
                <Typography textAlign="center">Início</Typography>
              </MenuItem>
              <MenuItem onClick={handleNavigation("/editar-usuario")}>
                <Typography textAlign="center">Editar Usuários</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={handleNavigation("/user")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              color="inherit"
              onClick={handleNavigation("/user")}
              sx={{
                my: 2,
                display: "block",
                ":hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                ":active": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
              }}
            >
              Início
            </Button>
            {user?.role === "admin" && ( // Verifica se o usuário é admin
              <Button
                color="inherit"
                onClick={handleNavigation("/editar-usuario")}
                sx={{
                  my: 2,
                  display: "block",
                  ":hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                  ":active": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                }}
              >
                Editar Usuários
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleMenuOpen(setAnchorElUser)}
                sx={{ p: 0 }}
              >
                <AccountCircle sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleMenuClose(setAnchorElUser)}
            >
              <MenuItem onClick={handleNavigation("/trocar-senha")}>
                Meu Perfil
              </MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
