//layouts
import AdminLayout from "../../layouts/admin-layout";
//types
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
//others
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import FormInput from "../../components/Input/FormInput";
import { axiosClient } from "../../configs/axios";
import { useAppDispatch } from "../../hooks/redux";
import FormLayout from "../../layouts/form-layout";
import { openNotification } from "../../redux/notificationSlice";
import {
  forgotPasswordSchema,
  IForgotPasswordFormData,
} from "../../schema/auth";

export interface IForgotPasswordPageProps {}

const ForgotPasswordPage = (props: IForgotPasswordPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<IForgotPasswordFormData>({
    defaultValues: {
      username: "",
      password: "",
      otp: "",
      step: 0,
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const _handleSubmit = async (values: IForgotPasswordFormData) => {
    if (values.step === 0) {
      setIsLoading(true);
      try {
        await axiosClient.post("/Auth/generate-otp-forgot-password", {
          username: values.username,
        });

        form.setValue("step", 1);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
      return;
    }

    if (values.step === 1) {
      setIsLoading(true);
      try {
        await axiosClient.post("/Auth/validate-otp-forgot-password", {
          username: values.username,
          otp: values.otp,
        });

        form.setValue("step", 2);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
      return;
    }

    if (step === 2) {
      setIsLoading(true);
      try {
        await axiosClient.post("/Auth/forgot-password", {
          username: values.username,
          password: values.password,
        });

        dispatch(
          openNotification({
            type: "success",
            message: "Update password successfully.",
          })
        );

        form.setValue("step", 3);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
      return;
    }
  };

  const step = useWatch({ name: "step", control: form.control });

  return (
    <Container
      sx={{
        my: 8,
        mx: "auto",
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
        Forgot password
      </Typography>
      <FormProvider {...form}>
        <FormLayout onSubmit={form.handleSubmit(_handleSubmit)} sx={{ mt: 1 }}>
          {step === 0 && (
            <>
              <FormInput name="username" label="Username" />
              <LoadingButton
                loading={isLoading}
                variant="contained"
                disabled={isLoading}
                type="submit"
              >
                Next
              </LoadingButton>
            </>
          )}
          {step === 1 && (
            <>
              <FormInput name="otp" label="OTP" />
              <LoadingButton
                loading={isLoading}
                variant="contained"
                disabled={isLoading}
                type="submit"
              >
                Next
              </LoadingButton>
            </>
          )}
          {step === 2 && (
            <>
              <FormInput name="password" label="Password" type="password" />
              <LoadingButton
                loading={isLoading}
                variant="contained"
                disabled={isLoading}
                type="submit"
              >
                Update
              </LoadingButton>
            </>
          )}
        </FormLayout>
      </FormProvider>
      {step === 3 && (
        <Box textAlign="center">
          <Typography
            fontSize="20px"
            color="primary"
            fontWeight="bold"
            sx={{ marginBottom: 4 }}
          >
            Update password successfully.
          </Typography>
          <Link to="/login">
            <Button variant="contained">Go to Login page</Button>
          </Link>
        </Box>
      )}
    </Container>
  );
};

ForgotPasswordPage.getLayout = AdminLayout;

export default ForgotPasswordPage;
