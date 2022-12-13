//components
import { Box, Button, ListItem } from "@mui/material";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface INavItemProps {
  href: string;
  icon: ReactNode;
  title: string;
}

export const NavItem = (props: INavItemProps) => {
  const { href, icon, title, ...others } = props;
  const location = useLocation();
  const active = href ? location.pathname === href : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <Link to={href}>
        <Button
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active ? "rgba(255,255,255, 0.08)" : "",
            borderRadius: 1,
            color: active ? "secondary.main" : "neutral.300",
            fontWeight: active ? "bold" : "",
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: active ? "secondary.main" : "neutral.400",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.08)",
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }} color="black">
            {title}
          </Box>
        </Button>
      </Link>
    </ListItem>
  );
};
