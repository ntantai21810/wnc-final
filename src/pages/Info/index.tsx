//layouts
import AdminLayout from "../../layouts/admin-layout";
//types
import { Box, Grid, Switch, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ContentLayout from "../../layouts/content-layout";
//others
import { useAppSelector } from "../../hooks/redux";

export interface IInfoPageProps {}

const InfoPage = (props: IInfoPageProps) => {
  const auth = useAppSelector((state) => state.auth);

  const columns: GridColDef<{
    accountNumber: string;
    balance: number;
    isActive: boolean;
  }>[] = [
    {
      field: "accountNumber",
      headerName: "Account Number",
      width: 200,
    },
    {
      field: "balance",
      headerName: "Balance",
      width: 200,
    },
    {
      field: "isActive",
      headerName: "Active",
      width: 200,
      renderCell: (params) => (
        <Switch
          defaultChecked={params.row.isActive}
          onChange={(e, value) => {}}
        />
      ),
    },
  ];

  return (
    <ContentLayout title="Settings" isBack>
      <Box p={3}>
        <Grid>
          <Grid item xs={6}>
            <Typography fontSize="20px" fontWeight="bold">
              Full name
            </Typography>
            <Typography mt={1}>{auth.fullName}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography fontSize="20px" fontWeight="bold">
              Email
            </Typography>
            <Typography mt={1}>{auth.email}</Typography>
          </Grid>
        </Grid>
        <Typography mt={3} component="h2" fontSize="24px">
          Accounts:
        </Typography>
        <Box height={250} mt={3}>
          <DataGrid
            sx={{
              backgroundColor: "#fff",
              ".MuiDataGrid-columnHeaders": {
                backgroundColor: "#eee",
              },
            }}
            rows={[
              {
                accountNumber: auth.accountNumber,
                balance: auth.balance,
                isActive: auth.isActive,
              },
            ]}
            columns={columns}
            getRowId={(params) => params.accountNumber}
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

InfoPage.getLayout = AdminLayout;

export default InfoPage;
