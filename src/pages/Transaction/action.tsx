//layouts
import AdminLayout from "../../layouts/admin-layout";
//types
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ContentLayout from "../../layouts/content-layout";
//others
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { Navigate } from "react-router-dom";
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
import { updateAuth } from "../../redux/authSlice";
import { openNotification } from "../../redux/notificationSlice";
import {
  ITransactionFormData,
  transactionSchema,
} from "../../schema/transaction";

export interface ITransactionActionPageProps {}

const TransactionActionPage = (props: ITransactionActionPageProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dialog = useDialog();
  const params = useParams();

  const { data: recipients } = useGetRecipientQuery();
  const { data: bankData } = useGetBankQuery();
  const auth = useAppSelector((state) => state.auth);

  const [addTransaction, { isLoading: isAdding }] = useAddTransactionMutation();
  const [addRecipient] = useAddRecipientMutation();

  const [isRedirect, setIsRedirect] = useState(false);
  const [step, setStep] = useState(0);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    bankAccountId: number;
    accountNumber: string;
    fullName: string;
  }>();

  const id = params.id;

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
  const toAccountNumber = useWatch({
    name: "toAccountNumber",
    control: form.control,
  });
  const bankId = useWatch({
    name: "bankId",
    control: form.control,
  });

  const onClose = () => {
    // navigate("/transaction");
    setIsRedirect(true);
    dialog.closeDialog();
  };

  const _handleSubmit = async (values: ITransactionFormData) => {
    try {
      await addTransaction({
        toAccountNumber: values.selectFromList
          ? (recipients?.find((item) => item.id === values.recipientId)
              ?.accountNumber || "") + ""
          : values.toAccountNumber + "",
        bankId: values.selectFromList
          ? recipients?.find((item) => item.id === values.recipientId)
              ?.bankDestinationId || null
          : values.bankId || null,
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

      if (!recipients?.find((item) => item.id === values.recipientId))
        dialog.createDialog({
          type: "save_recipient",
          onAction: async function () {
            try {
              await addRecipient({
                accountNumber: values.selectFromList
                  ? (recipients?.find((item) => item.id === values.recipientId)
                      ?.accountNumber || "") + ""
                  : values.toAccountNumber + "",
                suggestedName: null,
                bankDestinationId: values.selectFromList
                  ? recipients?.find((item) => item.id === values.recipientId)
                      ?.bankDestinationId || null
                  : values.bankId || null,
              }).unwrap();

              dispatch(
                openNotification({
                  type: "success",
                  message: "Save recipient successfully.",
                })
              );
              onClose();
            } catch (e) {
              console.log(e);
            }
          },
          onCancel: function () {
            onClose();
          },
        });
      else {
        navigate("/transaction");
      }
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

  useEffect(() => {
    const _searchAccount = async () => {
      if (toAccountNumber.toString().length === 6 && bankId) {
        setIsSearching(true);
        try {
          const res = await axiosClient.post("/Account/me/searchAccount", {
            accountNumber: toAccountNumber,
            bankId: bankId,
          });

          setSearchResult(res.data);
        } catch (e) {
          setSearchResult(undefined);
          console.log(e);
        }
      } else {
        setSearchResult(undefined);
      }
      setIsSearching(false);
    };

    _searchAccount();
  }, [bankId, toAccountNumber]);

  return (
    <ContentLayout title={"Transaction"} isBack>
      {isRedirect && <Navigate to="/transaction" replace={true} />}

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
              {id === "add" &&
                toAccountNumber.toString().length === 6 &&
                bankId && (
                  <Box>
                    {isSearching ? (
                      <Box textAlign="center">
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          "& > *:not(:last-child)": {
                            marginBottom: 2,
                          },
                        }}
                      >
                        <Stack
                          direction="row"
                          sx={{
                            "& > *:not(:last-child)": {
                              marginBottom: 2,
                            },
                          }}
                        >
                          <Typography sx={{ marginRight: 2 }}>
                            Account number:{" "}
                          </Typography>
                          <Typography>
                            {searchResult?.accountNumber || ""}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          sx={{
                            "& > *:not(:last-child)": {
                              marginBottom: 2,
                            },
                          }}
                        >
                          <Typography sx={{ marginRight: 2 }}>
                            Full Name:{" "}
                          </Typography>
                          <Typography>
                            {searchResult?.fullName || ""}
                          </Typography>
                        </Stack>
                      </Box>
                    )}
                  </Box>
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
