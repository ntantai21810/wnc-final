//layouts
import AdminLayout from "../../layouts/admin-layout";
//types
import { Button, Container } from "@mui/material";
import ContentLayout from "../../layouts/content-layout";
//others
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/Input/FormInput";
import FormRadioGroup from "../../components/Radio/FormRadioGroup";
import FormSelect from "../../components/Select/FormSelect";
import FormSwitch from "../../components/Switch";
import { useAppDispatch } from "../../hooks/redux";
import FormLayout from "../../layouts/form-layout";
import {
  useAddTransactionMutation,
  useGetBankQuery,
  useGetRecipientQuery,
} from "../../redux/apiSlice";
import { recipientSchema } from "../../schema/recipient";
import { ITransactionFormData } from "../../schema/transaction";

export interface ITransactionActionPageProps {}

const TransactionActionPage = (props: ITransactionActionPageProps) => {
  const { data: recipients } = useGetRecipientQuery();
  const { data: bankData } = useGetBankQuery();
  const [addTransaction, { isLoading: isAdding }] = useAddTransactionMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<ITransactionFormData>({
    defaultValues: {
      toAccountNumber: "",
      amount: "",
      bankId: "",
      chargeReceiver: false,
      description: "",
      OTP: "",

      //Handle on client
      selectFromList: true,
    },
    resolver: zodResolver(recipientSchema),
  });

  const selecetFromList = useWatch({
    name: "selectFromList",
    control: form.control,
  });

  const _handleSubmit = async (values: ITransactionFormData) => {
    // try {
    //   if (id === "add") {
    //     await addRecipient({
    //       ...values,
    //       bankDestinationId: values.bankDestinationId || null,
    //     }).unwrap();
    //     dispatch(
    //       openNotification({ type: "success", message: "Add successfully." })
    //     );
    //   } else {
    //     await editRecipient({
    //       ...values,
    //       bankDestinationId: values.bankDestinationId || null,
    //       id: +(id as string),
    //     }).unwrap();
    //     dispatch(
    //       openNotification({ type: "success", message: "Edit successfully." })
    //     );
    //   }
    //   navigate("/recipient");
    // } catch (e) {
    //   console.log(e);
    // }
  };

  return (
    <ContentLayout
      title={"Transaction"}
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
            <FormSwitch
              name="selectFromList"
              label="Select from Recipient list"
            />

            {selecetFromList && (
              <FormSelect
                name="recipientId"
                label="Recipients"
                options={
                  recipients?.map((item) => ({
                    label: item.suggestedName,
                    value: item.id,
                  })) || []
                }
              />
            )}

            {!selecetFromList && (
              <>
                <FormSelect
                  name="bankId"
                  label="Bank"
                  options={
                    bankData?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    })) || []
                  }
                />
                <FormInput name="toAccountNumber" label="Account Number" />
              </>
            )}
            <FormInput name="amount" label="Amount" />
            <FormInput name="Description" label="Description" />
            <FormRadioGroup
              name="chargeReceiver"
              label="Change Receiver"
              options={[
                { label: "Sender", value: 0 },
                { label: "Receiver", value: 1 },
              ]}
            />
            <Button variant="contained">Next</Button>
          </FormLayout>
        </FormProvider>
      </Container>
    </ContentLayout>
  );
};

TransactionActionPage.getLayout = AdminLayout;

export default TransactionActionPage;
