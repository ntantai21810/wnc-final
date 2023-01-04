import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { FormProvider, useForm } from "react-hook-form";
import FormLayout from "../../../layouts/form-layout";
import { IDebit } from "../../../model/debit";
import { useDeleteDebitMutation } from "../../../redux/apiSlice";
import { deleteDebitSchema, IDeleteDebitFormData } from "../../../schema/debit";
import FormInput from "../../Input/FormInput";

export interface IDeleteDebitFormProps {
  debit: IDebit;
  onDone?: () => void;
}

export default function DeleteDebitForm({
  debit,
  onDone,
}: IDeleteDebitFormProps) {
  const [deleteDebit, { isLoading }] = useDeleteDebitMutation();

  const form = useForm<IDeleteDebitFormData>({
    defaultValues: {
      description: "",
    },
    resolver: zodResolver(deleteDebitSchema),
  });

  const _handleSubmit = async (values: IDeleteDebitFormData) => {
    try {
      await deleteDebit({ ...values, id: debit.id }).unwrap();

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
          <FormInput name="description" label="Description" />
          <LoadingButton
            loading={isLoading}
            variant="contained"
            disabled={isLoading}
            type="submit"
          >
            Delete
          </LoadingButton>
        </FormLayout>
      </FormProvider>
    </div>
  );
}
