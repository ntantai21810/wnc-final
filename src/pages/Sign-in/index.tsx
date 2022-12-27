import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../../components/Input/FormInput";
import FormLayout from "../../layouts/form-layout";
import { ILoginFormData, loginSchema } from "../../schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosClient } from "../../configs/axios";
import { useNavigate } from "react-router-dom";

export interface ISigninPageProps {}

export default function SigninPage(props: ISigninPageProps) {
  const navigate = useNavigate();
  const form = useForm<ILoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const _handleLogin = async (values: ILoginFormData) => {
    try {
      const res = await axiosClient.post("/Auth/login", values);

      console.log(res);
      // navigate("/", { replace: true });

      const a = await axiosClient.get("/Account");

      console.log({ a });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ "& + div": { width: "100%", mt: 6 } }}
          >
            Sign in
          </Typography>
          <FormProvider {...form}>
            <FormLayout
              onSubmit={form.handleSubmit(_handleLogin)}
              sx={{ mt: 1 }}
            >
              <FormInput name="username" label="Username" autoFocus fullWidth />
              <FormInput
                name="password"
                label="Password"
                type="password"
                fullWidth
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </FormLayout>
          </FormProvider>
        </Box>
      </Grid>
    </Grid>
  );
}
