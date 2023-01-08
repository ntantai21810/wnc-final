//layouts
import AdminLayout from "../../layouts/admin-layout";
//types
import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ContentLayout from "../../layouts/content-layout";
//others
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import FormDatePicker from "../../components/DatePicker/FormDatePicker";
import FormSelect from "../../components/Select/FormSelect";
import { axiosClient } from "../../configs/axios";
import { ITransaction } from "../../model/transaction";
import { useGetBankQuery } from "../../redux/apiSlice";

export interface IAdminTransactionPageProps {}

const TYPE_FILTER = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Transaction",
    value: "Transaction",
  },
  {
    label: "Debit",
    value: "Debit",
  },
  {
    label: "Charge",
    value: "Charge",
  },
];

const AdminTransactionPage = (props: IAdminTransactionPageProps) => {
  const [data, setData] = useState<ITransaction[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const { data: bankData } = useGetBankQuery();
  const [totalAmount, setTotalAmount] = useState(0);

  const form = useForm<{
    dateStart: string | null | Dayjs;
    dateEnd: string | null | Dayjs;
    type: string | null;
    bankDestinationId: number | "" | null;
    bankSourceId: number | "" | null;
  }>({
    defaultValues: {
      dateStart: null,
      dateEnd: null,
      type: "all",
      bankDestinationId: "",
      bankSourceId: "",
    },
  });

  const columns: GridColDef<ITransaction>[] = [
    {
      field: "time",
      headerName: "Time",
      width: 200,
      renderCell: (params) => (
        <Typography>{dayjs(params.row.time).format("DD/MM/YYYY")}</Typography>
      ),
    },
    {
      field: "fromAccountNumber",
      headerName: "From Account Number",
      width: 200,
    },
    {
      field: "toAccountNumber",
      headerName: "To Account Number",
      width: 200,
    },
    {
      field: "fromUser",
      headerName: "From User",
      width: 200,
    },
    {
      field: "toUser",
      headerName: "To User",
      width: 200,
    },
    {
      field: "type",
      headerName: "Type",
      width: 200,
    },
    {
      field: "bankSourceId",
      headerName: "Bank Source",
      width: 200,
      renderCell: (params) => (
        <Typography>
          {bankData?.find((item) => item.id === params.row.bankSourceId)
            ?.name || ""}
        </Typography>
      ),
    },
    {
      field: "bankDestinationId",
      headerName: "Bank Destination",
      width: 200,
      renderCell: (params) => (
        <Typography>
          {bankData?.find((item) => item.id === params.row.bankDestinationId)
            ?.name || ""}
        </Typography>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 200,
    },
  ];

  const dateStart = useWatch({ name: "dateStart", control: form.control });
  const dateEnd = useWatch({ name: "dateEnd", control: form.control });
  const type = useWatch({ name: "type", control: form.control });
  const bankDestinationId = useWatch({
    name: "bankDestinationId",
    control: form.control,
  });

  useEffect(() => {
    const _getData = async () => {
      setIsFetching(true);
      try {
        const res = await axiosClient.post("/Admin/list-transactions", {
          dateStart: dateStart ? (dateStart as Dayjs).toISOString() : null,
          dateEnd: dateEnd ? (dateEnd as Dayjs).toISOString() : null,
          type: type !== "all" ? type : null,
          bankDestinationId: bankDestinationId || null,
          bankSourceId: null,
        });

        setData(res.data.transactionList);

        let amount = 0;
        (res.data.transactionList as ITransaction[]).forEach((item) => {
          amount += item.amount;
        });
        setTotalAmount(amount);
      } catch (e) {
        console.log(e);
      }
      setIsFetching(false);
    };

    _getData();
  }, [bankDestinationId, dateStart, dateEnd, type]);

  return (
    <ContentLayout title="Transaction page" isBack>
      <Box p={3}>
        <FormProvider {...form}>
          <Stack
            direction="row"
            sx={{
              "& > *:not(:last-child)": {
                marginRight: 3,
              },
            }}
            mb={3}
          >
            <FormDatePicker name="dateStart" label="From Date" />
            <FormDatePicker name="dateEnd" label="To Date" />
            <FormSelect name="type" label="Type" options={TYPE_FILTER} />
            <FormSelect
              name="bankDestinationId"
              label="Bank"
              options={
                bankData?.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || []
              }
            />
            <Box display="none">
              <FormSelect
                name="bankDestinationId"
                label="Bank"
                options={
                  bankData?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
                }
              />
            </Box>
          </Stack>
          <Button variant="contained" onClick={() => form.reset()}>
            Clear filter
          </Button>
        </FormProvider>
        <Box height={400} mt={3}>
          <DataGrid
            rows={data || []}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            loading={isFetching}
            experimentalFeatures={{ newEditingApi: true }}
            getRowClassName={(params) => `row-${params.row.type.toLowerCase()}`}
          />
        </Box>
        <Box mt={3}>
          <Typography>{`Total amount: ${totalAmount}`}</Typography>
        </Box>
      </Box>
    </ContentLayout>
  );
};

AdminTransactionPage.getLayout = AdminLayout;

export default AdminTransactionPage;
