import React from "react";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";

type LayoutProps = {
  children: React.ReactNode;
};

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Seminuevos
      </Typography>
    </Toolbar>
  </AppBar>
);

const Footer = () => (
  <Box
    component="footer"
    sx={{ py: 2, textAlign: "center", bgcolor: "grey.200", mt: "auto" }}
  >
    <Typography variant="body2" color="text.secondary">
      © {new Date().getFullYear()} Seminuevos. Todos los derechos reservados.
    </Typography>
  </Box>
);

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Box display="flex" flexDirection="column" minHeight="100vh">
    <Header />
    <Container component="main" sx={{ flex: 1, py: 4 }}>
      {children}
    </Container>
    <Footer />
  </Box>
);

export default Layout;
