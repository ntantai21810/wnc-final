//components
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
//others
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import theme from "../../configs/theme";
//constants
import { POPOVER_ROUTES } from "../../constants/header";
import { useAppSelector } from "../../hooks/redux";
interface IDashboardNavBarProps {
  onSidebarOpen: () => void;
}

export const DashboardNavbar = (props: IDashboardNavBarProps) => {
  const { onSidebarOpen, ...other } = props;
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const notifications = useAppSelector((state) => state.auth.notification);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar
      sx={{
        left: {
          lg: "280px",
        },
        width: {
          lg: "calc(100% - 280px)",
        },
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
      }}
      {...other}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2,
        }}
      >
        <IconButton
          onClick={onSidebarOpen}
          sx={{
            display: {
              xs: "inline-flex",
              lg: "none",
            },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        {/* <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip> */}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexGrow: 0, ml: 2 }}>
          <Tooltip title="Open settings">
            <IconButton
              id="noti-icon"
              onClick={handleOpenUserMenu}
              sx={{ p: 0 }}
            >
              <NotificationsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={
              !!anchorElUser &&
              !!document.getElementById("noti-icon") &&
              anchorElUser === document.getElementById("noti-icon")
            }
            onClose={handleCloseUserMenu}
          >
            <Box
              sx={{
                "& > *:not(:last-child)": {
                  marginBottom: 2,
                },
                overflowY: "auto",
              }}
              maxHeight="400px"
            >
              {notifications.map((item) => (
                <Box
                  p={2}
                  sx={{
                    cursor: "pointer",
                    transition: "all linear 0.25s",
                    "&:hover": {
                      backgroundColor: "#eee",
                    },
                  }}
                  onClick={() => {
                    setAnchorElUser(null);
                    if (item.type === "Transaction") navigate("/transaction");
                    if (item.type === "Debit") navigate("/debit");
                    if (item.type === "Charge") navigate("/transaction");
                  }}
                >
                  <Typography fontWeight="bold" sx={{ marginBottom: 1 }}>
                    {item.description}
                  </Typography>
                  <Typography>
                    {dayjs(item.time).format("DD/MM/YYYY")}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Menu>
        </Box>
        <Box sx={{ flexGrow: 0, ml: 2 }}>
          <Tooltip title="Open settings">
            <IconButton
              id="user-icon"
              onClick={handleOpenUserMenu}
              sx={{ p: 0 }}
            >
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={
              !!anchorElUser &&
              !!document.getElementById("user-icon") &&
              anchorElUser === document.getElementById("user-icon")
            }
            onClose={handleCloseUserMenu}
          >
            {POPOVER_ROUTES.map((setting) => (
              <MenuItem key={setting.to} onClick={handleCloseUserMenu}>
                <Link to={setting.to}>
                  <Typography textAlign="center">{setting.label}</Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
