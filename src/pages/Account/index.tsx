//layouts
import AdminLayout from "../../layouts/admin-layout";
//types
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ContentLayout from "../../layouts/content-layout";
//others
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChargeMoneyForm from "../../components/pages/Account/ChargeMoneyForm";
import { useAppDispatch } from "../../hooks/redux";
import { useDialog } from "../../hooks/useDialog";
import { IAccount } from "../../model/account";
import { useGetAccountByEmployeeQuery } from "../../redux/apiSlice";
import { openNotification } from "../../redux/notificationSlice";

export interface IAccountPageProps {}

const AccountPage = (props: IAccountPageProps) => {
  const { data: users, isFetching } = useGetAccountByEmployeeQuery();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dialog = useDialog();
  const dispatch = useAppDispatch();

  const columns: GridColDef<IAccount>[] = [
    {
      field: "fullName",
      headerName: "Name",
      width: 200,
    },
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
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const open = !!(
          anchorEl &&
          document.getElementById(`action-${params.row.bankAccountId}`) &&
          anchorEl ===
            document.getElementById(`action-${params.row.bankAccountId}`)
        );

        return (
          <Box>
            <IconButton
              aria-label="more"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              id={`action-${params.row.bankAccountId}`}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={(e) => {
                const anchorEl = document.getElementById(
                  `action-${params.row.bankAccountId}`
                );

                return anchorEl!;
              }}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  _handleAddMoney(params.row);
                  handleClose();
                }}
              >
                Add money to account
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(`/account/${params.row.bankAccountId}/transaction`);
                  handleClose();
                }}
              >
                View transactions
              </MenuItem>
            </Menu>
          </Box>
        );
      },
    },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const _handleAddMoney = async (user: IAccount) => {
    try {
      dialog.createDialog({
        title: "Charge money to account",
        children: (
          <ChargeMoneyForm
            account={user}
            onDone={() => {
              dispatch(
                openNotification({
                  type: "success",
                  message: "Charge money successfully.",
                })
              );

              dialog.closeDialog();
            }}
          />
        ),
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ContentLayout
      title="Account"
      isBack
      rightAction={
        <Link to={`/account/add`}>
          <Button variant="contained">Add</Button>
        </Link>
      }
    >
      <Box sx={{ width: "100%", height: 600 }}>
        <DataGrid
          sx={{
            backgroundColor: "#fff",
            ".MuiDataGrid-columnHeaders": {
              backgroundColor: "#eee",
            },
          }}
          rows={users || []}
          columns={columns}
          pageSize={10}
          loading={isFetching}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.bankAccountId}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </ContentLayout>
  );
};

AccountPage.getLayout = AdminLayout;

export default AccountPage;
