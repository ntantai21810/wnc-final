//layouts
import AdminLayout from "../../layouts/admin-layout";
//types
import { Container } from "@mui/material";
import ContentLayout from "../../layouts/content-layout";
//others
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import FormInput from "../../components/Input/FormInput";
import { useAppDispatch } from "../../hooks/redux";
import FormLayout from "../../layouts/form-layout";
import {
  useAddRecipientMutation,
  useEditRecipientMutation,
  useGetRecipientQuery,
} from "../../redux/apiSlice";
import { openNotification } from "../../redux/notificationSlice";
import { IRecipientFormData, recipientSchema } from "../../schema/recipient";
import FormSwitch from "../../components/Switch";
import { useEffect } from "react";

export interface IRecipientActionPageProps {}

const RecipientActionPage = (props: IRecipientActionPageProps) => {
  const { data: recipients } = useGetRecipientQuery();
  const [addRecipient, { isLoading: isAdding }] = useAddRecipientMutation();
  const [editRecipient, { isLoading: isUpdating }] = useEditRecipientMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<IRecipientFormData>({
    defaultValues: {
      accountNumber: "",
      suggestedName: "",
      bankDestinationId: "",

      //Handle on client
      isSameBank: true,
    },
    resolver: zodResolver(recipientSchema),
  });
  const params = useParams();
  const id = params.id;

  const isSameBank = useWatch({ name: "isSameBank", control: form.control });

  const _handleSubmit = async (values: IRecipientFormData) => {
    try {
      if (id === "add") {
        await addRecipient({
          ...values,
          bankDestinationId: values.bankDestinationId || null,
        }).unwrap();

        dispatch(
          openNotification({ type: "success", message: "Add successfully." })
        );
      } else {
        await editRecipient({
          ...values,
          bankDestinationId: values.bankDestinationId || null,
          id: +(id as string),
        }).unwrap();

        dispatch(
          openNotification({ type: "success", message: "Edit successfully." })
        );
      }

      navigate("/recipient");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const editItem = recipients?.find((item) => item.id === +(id as string));

    if (editItem) {
      form.setValue("accountNumber", editItem.accountNumber + "");
      form.setValue("suggestedName", editItem.suggestedName);

      if (editItem.bankDestinationId) {
        form.setValue("isSameBank", false);
        form.setValue("bankDestinationId", editItem.bankDestinationId);
      } else {
        form.setValue("isSameBank", true);
      }
    }
  }, [form, id, recipients]);

  return (
    <ContentLayout
      title={id === "add" ? "Add recipient" : "Update recipient"}
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
            <FormInput name="accountNumber" label="Account Number" />
            <FormInput name="suggestedName" label="Suggested Name" />
            <FormSwitch name="isSameBank" label="Same bank" />
            <FormInput
              sx={{ display: isSameBank ? "none" : "flex" }}
              name="bankDestinationId"
              label="Bank"
            />
          </FormLayout>
        </FormProvider>
      </Container>
    </ContentLayout>
  );
};

RecipientActionPage.getLayout = AdminLayout;

export default RecipientActionPage;
