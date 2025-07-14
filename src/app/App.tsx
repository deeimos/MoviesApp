import { Box, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import Sidebar from "@/features/Layout/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "@/features/Layout/Header";
import ConfirmDialog from "@/shared/ui/ConfirmDialog";
import { useStore } from "@/shared/hooks/useStore";

const drawerWidth = 200;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { MovieStore } = useStore();

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  useEffect(() => {
    MovieStore.getGenres();
  }, []);

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh"}}>
      <CssBaseline />
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: { xs: "56px", md: "64px" },
          height: { xs: `calc(100vh - 56px)`, md: `calc(100vh - 64px)` },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Outlet />
        </Box>
      </Box>
      <ConfirmDialog />
    </Box>
  );
}

export default App;
