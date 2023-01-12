//layouts
import AdminLayout from "../../layouts/admin-layout";
//types
import { Container } from "@mui/material";
import ContentLayout from "../../layouts/content-layout";
//others
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/Input/FormInput";
import { useAppDispatch } from "../../hooks/redux";
import FormLayout from "../../layouts/form-layout";
import { useAddAccountMutation } from "../../redux/apiSlice";
import { openNotification } from "../../redux/notificationSlice";
import { accountSchema, IAccountFormData } from "../../schema/account";

export interface IAccountActionPageProps {}

const AccountActionPage = (props: IAccountActionPageProps) => {
  const [addAccount, { isLoading: isAdding }] = useAddAccountMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<IAccountFormData>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      indentityNumber: "",
      balance: "",
    },
    resolver: zodResolver(accountSchema),
  });

  const _handleSubmit = async (values: IAccountFormData) => {
    try {
      const res = await addAccount({
        ...values,
        balance: +values.balance,
      }).unwrap();

      dispatch(
        openNotification({
          type: "success",
          message: `Password: ${(res as any).password}`,
        })
      );

      navigate("/account");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ContentLayout
      title={"Add user"}
      isBack
      rightAction={
        <LoadingButton
          loading={isAdding}
          variant="contained"
          disabled={isAdding}
          form="recipient-form"
          type="submit"
        >
          Save
        </LoadingButton>
      }
    >
      <Container sx={{ mt: 3 }}>
        <FormProvider {...form}>
          <FormLayout
            id="recipient-form"
            onSubmit={form.handleSubmit(_handleSubmit)}
          >
            <FormInput name="username" label="User Name" />
            <FormInput name="firstName" label="First Name" />
            <FormInput name="lastName" label="Last Name" />
            <FormInput name="email" label="Email" />
            <FormInput name="phone" label="Phone" />
            <FormInput name="address" label="Address" />
            <FormInput name="indentityNumber" label="Identity Number" />
            <FormInput name="balance" label="Balance" />
          </FormLayout>
        </FormProvider>
      </Container>
    </ContentLayout>
  );
};

AccountActionPage.getLayout = AdminLayout;

export default AccountActionPage;
