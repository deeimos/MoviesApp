import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/lib/routes";

interface IHeader {
  handleDrawerToggle: () => void;
}
export default function Header({ handleDrawerToggle }: IHeader) {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ display: { md: "none" }, mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ cursor: "pointer" }} onClick={() => navigate(ROUTES.MOOVIES)}>
          MoviesApp
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
