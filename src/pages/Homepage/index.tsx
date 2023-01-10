import { Typography } from "@mui/material";

export interface IHomepageProps {}

export default function Homepage(props: IHomepageProps) {
  return (
    <Typography textAlign="center" fontWeight="bold" sx={{ marginTop: "12px" }}>
      WNC - Final project
    </Typography>
  );
}
