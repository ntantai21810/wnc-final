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

export interface ITransactionPageProps {}

const TransactionPage = (props: ITransactionPageProps) => {
  const { data } = useGetTransactionQuery();
  const { data: bankData } = useGetBankQuery();
  const navigate = useNavigate();

  const columns: GridColDef<ITransaction>[] = [
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
    {
      field: "time",
      headerName: "Time",
      width: 200,
      renderCell: (params) => (
        <Typography>{dayjs(params.row.time).format("DD/MM/YYYY")}</Typography>
      ),
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
        <Box height={400} mt={3}>
          <DataGrid
            sx={{
              backgroundColor: "#fff",
              ".MuiDataGrid-columnHeaders": {
                backgroundColor: "#eee",
              },
            }}
            rows={data || []}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </Box>
    </ContentLayout>
  );
};

TransactionPage.getLayout = AdminLayout;

export default TransactionPage;
