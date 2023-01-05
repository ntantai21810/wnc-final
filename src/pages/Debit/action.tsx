//layouts
import AdminLayout from "../../layouts/admin-layout";
//types
import { Container } from "@mui/material";
import ContentLayout from "../../layouts/content-layout";
//others
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Dayjs } from "dayjs";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormDateTimePicker from "../../components/DatePicker/FormDateTimePicker";
import FormInput from "../../components/Input/FormInput";
import { useAppDispatch } from "../../hooks/redux";
import FormLayout from "../../layouts/form-layout";
import { useAddDebitMutation, useGetBankQuery } from "../../redux/apiSlice";
import { openNotification } from "../../redux/notificationSlice";
import { debitSchema, IDebitFormData } from "../../schema/debit";
import FormSelect from "../../components/Select/FormSelect";
import FormSwitch from "../../components/Switch";

export interface IDebitActionPageProps {}

const DebitActionPage = (props: IDebitActionPageProps) => {
  const { data: banks } = useGetBankQuery();
  const [addDebit, { isLoading: isAdding }] = useAddDebitMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<IDebitFormData>({
    defaultValues: {
      accountNumber: "",
      selfInDebt: false,
      amount: "",
      description: "",
      dateDue: null,
      bankDestinationId: "",
    },
    resolver: zodResolver(debitSchema),
  });

  const _handleSubmit = async (values: IDebitFormData) => {
    try {
      await addDebit({
        ...values,
        dateDue: (values.dateDue as Dayjs).toISOString(),
      }).unwrap();

      dispatch(
        openNotification({
          type: "success",
          message: "Make debit successfully.",
        })
      );

      navigate("/debit");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ContentLayout title={"Debit"} isBack>
      <Container sx={{ mt: 3 }}>
        <FormProvider {...form}>
          <FormLayout
            id="recipient-form"
            onSubmit={form.handleSubmit(_handleSubmit)}
          >
            <FormSelect
              name="bankDestinationId"
              label="Bank"
              options={
                banks?.map((item) => ({ label: item.name, value: item.id })) ||
                []
              }
            />
            <FormInput name="accountNumber" label="Account Number" />
            <FormInput name="amount" label="Amount" />
            <FormInput name="description" label="Description" />
            <FormSwitch name="selfInDebt" label="Self Debit" />
            <FormDateTimePicker name="dateDue" label="Date Due" />

            <LoadingButton
              loading={isAdding}
              variant="contained"
              disabled={isAdding}
              type="submit"
            >
              Submit
            </LoadingButton>
          </FormLayout>
        </FormProvider>
      </Container>
    </ContentLayout>
  );
};

DebitActionPage.getLayout = AdminLayout;

export default DebitActionPage;
