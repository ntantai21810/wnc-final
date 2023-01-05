import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormLayout from "../../../layouts/form-layout";
import { IAccount } from "../../../model/account";
import { useChargeMoneyToAccountMutation } from "../../../redux/apiSlice";
import {
  chargeMoneySchema,
  IChargeMoneyFormData,
} from "../../../schema/account";
import FormInput from "../../Input/FormInput";

export interface IChargeMoneyFormProps {
  account: IAccount;
  onDone?: () => void;
}

export default function ChargeMoneyForm({
  account,
  onDone,
}: IChargeMoneyFormProps) {
  const [chargeMoney, { isLoading }] = useChargeMoneyToAccountMutation();

  const form = useForm<IChargeMoneyFormData>({
    defaultValues: {
      accountNumber: "",
      amount: "",
    },
    resolver: zodResolver(chargeMoneySchema),
  });

  const _handleSubmit = async (values: IChargeMoneyFormData) => {
    try {
      await chargeMoney({ ...values, amount: +values.amount }).unwrap();

      onDone?.();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    form.setValue("accountNumber", account.accountNumber + "");
  }, [account.accountNumber, form]);

  return (
    <div>
      <FormProvider {...form}>
        <FormLayout
          onSubmit={form.handleSubmit(_handleSubmit)}
          sx={{ padding: 4, width: "400px", maxWidth: "100%" }}
        >
          <FormInput name="accountNumber" label="Account Number" disabled />
          <FormInput name="amount" label="Amount" />
          <LoadingButton
            loading={isLoading}
            variant="contained"
            disabled={isLoading}
            type="submit"
          >
            Charge
          </LoadingButton>
        </FormLayout>
      </FormProvider>
    </div>
  );
}
