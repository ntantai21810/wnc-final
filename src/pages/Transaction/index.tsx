//layouts
import AdminLayout from "../../layouts/admin-layout";
//types
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ContentLayout from "../../layouts/content-layout";
//others
import dayjs from "dayjs";
import { ITransaction } from "../../model/transaction";
import { useGetBankQuery, useGetTransactionQuery } from "../../redux/apiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FILTER_OPTS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Transaction",
    value: "Transaction",
  },
  {
    label: "Receive",
    value: "Receive",
  },
  {
    label: "Debit",
    value: "Debit",
  },
];

export interface ITransactionPageProps {}

const TransactionPage = (props: ITransactionPageProps) => {
  const { data, isFetching } = useGetTransactionQuery();
  const { data: bankData } = useGetBankQuery();
  const navigate = useNavigate();
  const [type, setType] = useState("all");

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

  return (
    <ContentLayout
      title="Transaction page"
      isBack
      rightAction={
        <Button
          onClick={() => navigate("/transaction/add")}
          variant="contained"
        >
          Add
        </Button>
      }
    >
      <Box p={3}>
        <Box
          sx={{
            "& > *:not(:last-child)": {
              marginRight: 3,
            },
          }}
          mb={3}
        >
          {FILTER_OPTS.map((item) => (
            <Button
              key={item.value}
              variant={type === item.value ? "contained" : "outlined"}
              onClick={() => setType(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </Box>
        <Box height={700} mt={3}>
          <DataGrid
            sx={{
              backgroundColor: "#fff",
              ".MuiDataGrid-columnHeaders": {
                backgroundColor: "#eee",
              },

              "& .row-transaction": {
                bgcolor: "#d6d6ff",
                cursor: "pointer",

                "&:hover": {
                  backgroundColor: "#eee",
                },
              },
              "& .row-debit": {
                bgcolor: "#ffc8c8",
                cursor: "pointer",

                "&:hover": {
                  backgroundColor: "#eee",
                },
              },
              "& .row-receive": {
                bgcolor: "#b4f6b4",
                cursor: "pointer",

                "&:hover": {
                  backgroundColor: "#eee",
                },
              },
            }}
            rows={(data || []).filter((item) =>
              type === "all" ? true : item.type === type
            )}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            loading={isFetching}
            experimentalFeatures={{ newEditingApi: true }}
            getRowClassName={(params) => `row-${params.row.type.toLowerCase()}`}
          />
        </Box>
      </Box>
    </ContentLayout>
  );
};

TransactionPage.getLayout = AdminLayout;

export default TransactionPage;
