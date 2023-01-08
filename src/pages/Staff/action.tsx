//layouts
import AdminLayout from "../../layouts/admin-layout";
//types
import { Box, Container } from "@mui/material";
import ContentLayout from "../../layouts/content-layout";
//others
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import FormInput from "../../components/Input/FormInput";
import { useAppDispatch } from "../../hooks/redux";
import FormLayout from "../../layouts/form-layout";
import {
  useAddStaffMutation,
  useEditStaffMutation,
  useGetStaffQuery,
} from "../../redux/apiSlice";
import { openNotification } from "../../redux/notificationSlice";
import { IStaffFormData, staffSchema } from "../../schema/staff";

export interface IStaffActionPageProps {}

const StaffActionPage = (props: IStaffActionPageProps) => {
  const { data: staffs } = useGetStaffQuery();
  const [addStaff, { isLoading: isAdding }] = useAddStaffMutation();
  const [editStaff, { isLoading: isUpdating }] = useEditStaffMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<IStaffFormData>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      indentityNumber: "",
      balance: 0,
    },
    resolver: zodResolver(staffSchema),
  });
  const params = useParams();
  const id = params.id;

  const _handleSubmit = async (values: IStaffFormData) => {
    try {
      if (id === "add") {
        await addStaff(values).unwrap();

        dispatch(
          openNotification({ type: "success", message: "Add successfully." })
        );
      } else {
        await editStaff({
          ...values,
          id: +(id as string),
        }).unwrap();

        dispatch(
          openNotification({ type: "success", message: "Edit successfully." })
        );
      }

      navigate("/staff");
    } catch (e) {
      console.log(e);
    }
  };
  console.log({ staffs });
  useEffect(() => {
    const editItem = staffs?.find((item) => item.id === +(id as string));

    if (editItem) {
      form.setValue("username", editItem.username);
      form.setValue("firstName", editItem.firstName);
      form.setValue("lastName", editItem.lastName);
      form.setValue("email", editItem.email);
      form.setValue("phone", editItem.phone);
      form.setValue("address", editItem.address);
      form.setValue("indentityNumber", editItem.indentityNumber);
      form.setValue("balance", editItem.balance);
    }
  }, [form, id, staffs]);

  return (
    <ContentLayout
      title={id === "add" ? "Add staff" : "Update staff"}
      isBack
      rightAction={
        <LoadingButton
          loading={isAdding || isUpdating}
          variant="contained"
          disabled={isAdding || isUpdating}
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
            <FormInput
              name="username"
              label="User Name"
              disabled={id !== "add"}
            />
            <FormInput name="firstName" label="First Name" />
            <FormInput name="lastName" label="Last Name" />
            <FormInput name="email" label="Email" />
            <FormInput name="phone" label="Phone" />
            <FormInput name="address" label="Address" />
            <FormInput name="indentityNumber" label="IdentityNumber" />
            <Box display="none">
              <FormInput name="balance" label="Balance" />
            </Box>
          </FormLayout>
        </FormProvider>
      </Container>
    </ContentLayout>
  );
};

StaffActionPage.getLayout = AdminLayout;

export default StaffActionPage;
