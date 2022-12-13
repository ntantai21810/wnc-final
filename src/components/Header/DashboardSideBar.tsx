//components
import AdbIcon from "@mui/icons-material/Adb";
import {
  Box,
  Divider,
  Drawer,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { NavItem } from "../NavItem";
//others
import { useEffect } from "react";
import { Link } from "react-router-dom";
import theme from "../../configs/theme";
import { RBAC } from "../../constants/role";
import { isFullPageRole } from "../../helper/function";
import { useAppSelector } from "../../hooks/redux";

interface IDashboardNavBarProps {
  open: boolean;
  onClose: () => void;
}

export const DashboardSidebar = (props: IDashboardNavBarProps) => {
  const { open, onClose } = props;
  const auth = useAppSelector((state) => state.auth);
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ paddingTop: 3 }}>
            <Link to="/" style={{ display: "contents" }}>
              <Toolbar disableGutters sx={{ justifyContent: "center" }}>
                <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
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
              </Toolbar>
            </Link>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {auth.role !== "" &&
            RBAC[auth.role].map((item) => {
              if (isFullPageRole(item)) {
                return (
                  <NavItem
                    key={item.url}
                    icon={item.icon}
                    href={item.url}
                    title={item.label}
                  />
                );
              }
              return null;
            })}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
