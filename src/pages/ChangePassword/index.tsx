//layouts
import AdminLayout from "../../layouts/admin-layout";
//types
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
//others
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../../components/Input/FormInput";
import FormLayout from "../../layouts/form-layout";
import {
  changePasswordSchema,
  IChangePasswordFormData,
} from "../../schema/auth";
import { axiosClient } from "../../configs/axios";
import { useAppDispatch } from "../../hooks/redux";
import { openNotification } from "../../redux/notificationSlice";
import { Link } from "react-router-dom";

export interface IChangePasswordPageProps {}

const ChangePasswordPage = (props: IChangePasswordPageProps) => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<IChangePasswordFormData>({
    defaultValues: {
      password: "",
      newPassword: "",
      reNewPassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  const _handleSubmit = async (values: IChangePasswordFormData) => {
    setIsLoading(true);
    try {
      await axiosClient.post("/Account/me/change-password", values);

      dispatch(
        openNotification({
          type: "success",
          message: "Change password successfully.",
        })
      );

      setStep(1);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

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
        Change password
      </Typography>
      {step === 0 && (
        <FormProvider {...form}>
          <FormLayout
            onSubmit={form.handleSubmit(_handleSubmit)}
            sx={{ mt: 1 }}
          >
            <FormInput name="password" label="Password" type="password" />
            <FormInput
              name="newPassword"
              label="New Password"
              type="password"
            />
            <FormInput
              name="reNewPassword"
              label="Confirm password"
              type="password"
            />
            <LoadingButton
              loading={isLoading}
              variant="contained"
              disabled={isLoading}
              type="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              Change
            </LoadingButton>
          </FormLayout>
        </FormProvider>
      )}
      {step === 1 && (
        <Box textAlign="center">
          <Typography
            fontSize="20px"
            color="primary"
            fontWeight="bold"
            sx={{ marginBottom: 4 }}
          >
            Change password successfully.
          </Typography>
          <Link to="/login">
            <Button variant="contained">Go to Login page</Button>
          </Link>
        </Box>
      )}
    </Container>
  );
};

ChangePasswordPage.getLayout = AdminLayout;

export default ChangePasswordPage;
