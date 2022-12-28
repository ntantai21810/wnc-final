import { zodResolver } from "@hookform/resolvers/zod";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/Input/FormInput";
import { axiosClient } from "../../configs/axios";
import { useAppDispatch } from "../../hooks/redux";
import FormLayout from "../../layouts/form-layout";
import { logout, setAuth } from "../../redux/authSlice";
import { ILoginFormData, loginSchema } from "../../schema/auth";

export interface ISigninPageProps {}

export default function SigninPage(props: ISigninPageProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const recaptchaRef = useRef<any>();

  const form = useForm<ILoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const _handleLogin = async (values: ILoginFormData) => {
    setIsLoading(true);
    console.log(recaptchaRef.current.getValue());
    return;
    try {
      await axiosClient.post("/Auth/login", values);

      const res = await axiosClient.get("/Account/me");

      dispatch(
        setAuth({
          ...res.data,
          status: "authenticated",
        })
      );

      navigate("/", { replace: true });
    } catch (e) {
      dispatch(logout());
      console.log(e);
    }
    setIsLoading(false);
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

              {/* <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button> */}
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Ld-ybQjAAAAAGLJplPYThGxCDr3YGSZaHBK1JO2"
              />
              <LoadingButton
                loading={isLoading}
                variant="contained"
                disabled={isLoading}
                type="submit"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </LoadingButton>
            </FormLayout>
          </FormProvider>
        </Box>
      </Grid>
    </Grid>
  );
}
