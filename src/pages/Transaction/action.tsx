//layouts
import AdminLayout from "../../layouts/admin-layout";
//types
import { Container, Stack } from "@mui/material";
import ContentLayout from "../../layouts/content-layout";
//others
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/Input/FormInput";
import FormRadioGroup from "../../components/Radio/FormRadioGroup";
import FormSelect from "../../components/Select/FormSelect";
import FormSwitch from "../../components/Switch";
import { axiosClient } from "../../configs/axios";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useDialog } from "../../hooks/useDialog";
import FormLayout from "../../layouts/form-layout";
import {
  useAddRecipientMutation,
  useAddTransactionMutation,
  useGetBankQuery,
  useGetRecipientQuery,
} from "../../redux/apiSlice";
import { openNotification } from "../../redux/notificationSlice";
import {
  ITransactionFormData,
  transactionSchema,
} from "../../schema/transaction";
import { updateAuth } from "../../redux/authSlice";

export interface ITransactionActionPageProps {}

const TransactionActionPage = (props: ITransactionActionPageProps) => {
  const { data: recipients } = useGetRecipientQuery();
  const { data: bankData } = useGetBankQuery();
  const [step, setStep] = useState(0);
  const dialog = useDialog();
  const auth = useAppSelector((state) => state.auth);
  const [addTransaction, { isLoading: isAdding }] = useAddTransactionMutation();
  const [addRecipient] = useAddRecipientMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const form = useForm<ITransactionFormData>({
    defaultValues: {
      toAccountNumber: "",
      amount: "",
      bankId: "",
      chargeReceiver: 0,
      description: "",
      otp: "",

      //Handle on client
      selectFromList: true,
      step: 0,
      recipientId: "",
    },
    resolver: zodResolver(transactionSchema),
  });

  const selecetFromList = useWatch({
    name: "selectFromList",
    control: form.control,
  });

  const _handleSubmit = async (values: ITransactionFormData) => {
    try {
      await addTransaction({
        toAccountNumber: values.selectFromList
          ? (recipients?.find((item) => item.id === values.recipientId)
              ?.accountNumber || "") + ""
          : values.toAccountNumber + "",
        bankId: values.selectFromList
          ? recipients?.find((item) => item.id === values.recipientId)
              ?.bankDestinationId || 0
          : values.bankId,
        chargeReceiver: 0 === values.chargeReceiver,
        amount: values.amount,
        otp: values.otp,
        description: values.description,
      }).unwrap();

      dispatch(
        openNotification({
          type: "success",
          message: "Make transaction successfully.",
        })
      );

      dispatch(updateAuth({ balance: auth.balance - +values.amount }));

      dialog.createDialog({
        type: "save_recipient",
        onAction: async () => {
          try {
            await addRecipient({
              accountNumber: values.selectFromList
                ? (recipients?.find((item) => item.id === values.recipientId)
                    ?.accountNumber || "") + ""
                : values.toAccountNumber + "",
              suggestedName: null,
              bankDestinationId: values.selectFromList
                ? recipients?.find((item) => item.id === values.recipientId)
                    ?.bankDestinationId || 0
                : values.bankId,
            }).unwrap();

            dispatch(
              openNotification({
                type: "success",
                message: "Save recipient successfully.",
              })
            );
          } catch (e) {
            console.log(e);
          } finally {
            dialog.closeDialog();
            navigate("/transaction");
          }
        },
        onCancel: () => {
          navigate("/transaction");
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const _handleNextStep = async () => {
    const isValidate = await form.trigger(undefined, { shouldFocus: true });

    if (isValidate) {
      setIsSendingOTP(true);
      try {
        await axiosClient.post("/Account/me/generate-otp");

        form.setValue("step", 1);
        setStep(1);
      } catch (e) {
        console.log(e);
      }
      setIsSendingOTP(false);
    }
  };

  return (
    <ContentLayout title={"Transaction"} isBack>
      <Container sx={{ mt: 3 }}>
        <FormProvider {...form}>
          <FormLayout
            id="recipient-form"
            onSubmit={form.handleSubmit(_handleSubmit)}
          >
            <Stack
              direction="column"
              spacing={3}
              sx={{ display: step === 0 ? "flex" : "none" }}
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
              <FormInput name="description" label="Description" />
              <FormRadioGroup
                name="chargeReceiver"
                label="Change Receiver"
                options={[
                  { label: "Sender", value: 1 },
                  { label: "Receiver", value: 0 },
                ]}
              />
              <LoadingButton
                loading={isSendingOTP}
                variant="contained"
                disabled={isSendingOTP}
                type="button"
                onClick={_handleNextStep}
              >
                Next
              </LoadingButton>
            </Stack>

            <Stack
              direction="column"
              spacing={3}
              sx={{ display: step === 1 ? "flex" : "none" }}
            >
              <FormInput name="otp" label="OTP" />
              <LoadingButton
                loading={isAdding}
                variant="contained"
                disabled={isAdding}
                type="submit"
              >
                Submit
              </LoadingButton>
            </Stack>
          </FormLayout>
        </FormProvider>
      </Container>
    </ContentLayout>
  );
};

TransactionActionPage.getLayout = AdminLayout;

export default TransactionActionPage;
