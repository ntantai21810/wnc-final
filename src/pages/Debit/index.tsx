//layouts
import AdminLayout from "../../layouts/admin-layout";
//types
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ContentLayout from "../../layouts/content-layout";
//others
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dayjs from "dayjs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteDebitForm from "../../components/pages/Debit/DeleteDebitForm";
import { useAppDispatch } from "../../hooks/redux";
import { useDialog } from "../../hooks/useDialog";
import { IDebit } from "../../model/debit";
import { useGetDebitQuery, usePayDebitMutation } from "../../redux/apiSlice";
import { openNotification } from "../../redux/notificationSlice";

export interface IDebitPageProps {}

const DebitPage = (props: IDebitPageProps) => {
  const { data: debits, isFetching } = useGetDebitQuery();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [payDebit] = usePayDebitMutation();
  const dialog = useDialog();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const columns: GridColDef<IDebit>[] = [
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
      field: "bankSourceId",
      headerName: "Bank Source",
      width: 200,
    },
    {
      field: "bankDestinationId",
      headerName: "Bank Destination",
      width: 200,
    },
    {
      field: "amount",
      headerName: "amount",
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
    {
      field: "dateDue",
      headerName: "Date Due",
      width: 200,
      renderCell: (params) => (
        <Typography>
          {dayjs(params.row.dateDue).format("DD/MM/YYYY")}
        </Typography>
      ),
    },
    {
      field: "isPaid",
      headerName: "Paid",
      width: 200,
      renderCell: (params) => <Checkbox disabled checked={params.row.isPaid} />,
    },
    {
      field: "",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const open = !!(
          anchorEl &&
          document.getElementById(`action-${params.row.id}`) &&
          anchorEl === document.getElementById(`action-${params.row.id}`)
        );

        return (
          <Box>
            <IconButton
              aria-label="more"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              id={`action-${params.row.id}`}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={(e) => {
                const anchorEl = document.getElementById(
                  `action-${params.row.id}`
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
                  _handlePay(params.row);
                  handleClose();
                }}
              >
                Pay
              </MenuItem>
              <MenuItem
                onClick={() => {
                  _handleDelete(params.row);
                  handleClose();
                }}
              >
                Delete
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
  const _handlePay = async (debit: IDebit) => {
    dialog.createDialog({
      type: "warning",
      onAction: async () => {
        try {
          await payDebit({ id: debit.id }).unwrap();

          dispatch(
            openNotification({
              type: "success",
              message: "Pay debit successfully",
            })
          );
        } catch (e) {
          console.log(e);
        } finally {
          dialog.closeDialog();
        }
      },
    });
  };
  const _handleDelete = (debit: IDebit) => {
    dialog.createDialog({
      title: "Delete debit",
      children: (
        <DeleteDebitForm
          debit={debit}
          onDone={() => {
            dispatch(
              openNotification({
                type: "success",
                message: "Delete debit successfully.",
              })
            );
            navigate("/debit");

            dialog.closeDialog();
          }}
        />
      ),
    });
  };

  return (
    <ContentLayout
      title="Debit"
      isBack
      rightAction={
        <Link to={`/debit/add`}>
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
          rows={debits || []}
          columns={columns}
          pageSize={10}
          loading={isFetching}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </ContentLayout>
  );
};

DebitPage.getLayout = AdminLayout;

export default DebitPage;
