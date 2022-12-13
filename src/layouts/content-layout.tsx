//components
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Button } from "@mui/material";
import ToolBar from "../components/Toolbar";
//others
import * as React from "react";
import { useNavigate } from "react-router-dom";

export interface IContentLayoutProps extends React.ComponentProps<typeof Box> {
  title: string;
  isBack?: boolean;
  rightAction?: JSX.Element | JSX.Element[] | string;
  children: React.ReactNode;
  disableToolbar?: boolean;
  onSearch?: (value: string) => void;
  onFilter?: () => void;
  onBack?: () => void;
}

export default function ContentLayout({
  title,
  isBack,
  rightAction,
  children,
  onSearch,
  onFilter,
  onBack,
  ...rest
}: IContentLayoutProps) {
  const navigate = useNavigate();

  const onRedirectBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };
  return (
    <Box {...rest}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 24px 0 24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            h1: {
              fontSize: "28px",
            },
            button: {
              marginRight: "16px",
            },
          }}
        >
          {isBack && (
            <Button onClick={onRedirectBack}>
              <ArrowBackIosIcon />
            </Button>
          )}
          <h1>{title}</h1>
        </Box>
        <Box>{rightAction}</Box>
      </Box>
      {(onSearch || onFilter) && (
        <ToolBar onSearch={onSearch} onFilter={onFilter} />
      )}
      <Box sx={{ padding: "16px 24px" }}>{children}</Box>
    </Box>
  );
}
