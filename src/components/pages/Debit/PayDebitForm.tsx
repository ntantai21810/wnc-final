import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { FormProvider, useForm } from "react-hook-form";
import FormLayout from "../../../layouts/form-layout";
import { IDebit } from "../../../model/debit";
import { usePayDebitMutation } from "../../../redux/apiSlice";
import { IPayDebitFormData, payDebitSchema } from "../../../schema/debit";
import FormInput from "../../Input/FormInput";

export interface IPayDebitFormProps {
  debit: IDebit;
  onDone?: () => void;
}

export default function PayDebitForm({ debit, onDone }: IPayDebitFormProps) {
  const [payDebit, { isLoading }] = usePayDebitMutation();

  const form = useForm<IPayDebitFormData>({
    defaultValues: {
      otp: "",
    },
    resolver: zodResolver(payDebitSchema),
  });

  const _handleSubmit = async (values: IPayDebitFormData) => {
    try {
      await payDebit({ ...values, id: debit.id }).unwrap();

      onDone?.();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <FormLayout
          onSubmit={form.handleSubmit(_handleSubmit)}
          sx={{ padding: 4, width: "400px", maxWidth: "100%" }}
        >
          <FormInput name="otp" label="OTP" />
          <LoadingButton
            loading={isLoading}
            variant="contained"
            disabled={isLoading}
            type="submit"
          >
            Pay
          </LoadingButton>
        </FormLayout>
      </FormProvider>
    </div>
  );
}
