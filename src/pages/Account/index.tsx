//layouts
import AdminLayout from "../../layouts/admin-layout";
//types
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ContentLayout from "../../layouts/content-layout";
//others
import { IRecipient } from "../../model/recipient";
import {
  useDeleteRecipientMutation,
  useGetRecipientQuery,
} from "../../redux/apiSlice";
import { Link, useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useDialog } from "../../hooks/useDialog";
import { useAppDispatch } from "../../hooks/redux";
import { openNotification } from "../../redux/notificationSlice";

export interface IAccountPageProps {}

const AccountPage = (props: IAccountPageProps) => {
  const { data: recipients, isFetching } = useGetRecipientQuery();
  const [deleteRecipient] = useDeleteRecipientMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dialog = useDialog();
  const dispatch = useAppDispatch();

  const columns: GridColDef<IRecipient>[] = [
    {
      field: "accountNumber",
      headerName: "Account Number",
      width: 200,
    },
    {
      field: "suggestedName",
      headerName: "Suggested Name",
      width: 200,
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
                  navigate(`/recipient/${params.row.id}`);
                  handleClose();
                }}
              >
                Edit
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
  const _handleDelete = (recipient: IRecipient) => {
    dialog.createDialog({
      type: "delete",
      onAction: async () => {
        try {
          await deleteRecipient(recipient.id).unwrap();

          dispatch(
            openNotification({
              type: "success",
              message: "Delete successfully",
            })
          );
        } catch (e: any) {
          console.log(e);
        } finally {
          dialog.closeDialog();
        }
      },
    });
  };

  return (
    <ContentLayout
      title="Recipients"
      isBack
      rightAction={
        <Link to={`/recipient/add`}>
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
          rows={recipients || []}
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

AccountPage.getLayout = AdminLayout;

export default AccountPage;
