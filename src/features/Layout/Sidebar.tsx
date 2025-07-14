import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/lib/routes";

const menuItems = [
  { label: "Поиск", path: ROUTES.MOOVIES, icon: <SearchIcon /> },
  { label: "Избранное", path: ROUTES.FAVORITE_MOOVIES, icon: <FavoriteIcon /> },
];

interface ISidebar {
  mobileOpen: boolean;
  onClose: () => void;
  drawerWidth: number;
}

export default function Sidebar({ mobileOpen, onClose, drawerWidth }: ISidebar) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawerContent = (
    <>
      <Toolbar />
      <List>
        {menuItems.map(({ label, path, icon }) => (
          <ListItemButton
            key={path}
            onClick={() => {
              navigate(path);
              if (isMobile) onClose();
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  return isMobile ? (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      open
    >
      {drawerContent}
    </Drawer>
  );
}
