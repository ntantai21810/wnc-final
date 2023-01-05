//layouts
import AdminLayout from "../../layouts/admin-layout";
//types
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ContentLayout from "../../layouts/content-layout";
//others
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ITransaction } from "../../model/transaction";
import {
  useGetBankQuery,
  useGetTransactionByUserQuery,
} from "../../redux/apiSlice";

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

export interface IAccountTransactionPageProps {}

const AccountTransactionPage = (props: IAccountTransactionPageProps) => {
  const params = useParams();
  const id = +(params.id || "0");
  const { data, isFetching } = useGetTransactionByUserQuery(id);
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
        <Box height={400} mt={3}>
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
            loading={isFetching}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            getRowClassName={(params) => `row-${params.row.type.toLowerCase()}`}
          />
        </Box>
      </Box>
    </ContentLayout>
  );
};

AccountTransactionPage.getLayout = AdminLayout;

export default AccountTransactionPage;
