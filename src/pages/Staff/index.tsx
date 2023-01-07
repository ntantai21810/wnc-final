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
import { useAppDispatch } from "../../hooks/redux";
import { useDialog } from "../../hooks/useDialog";
import { IStaff } from "../../model/staff";
import {
  useDeleteRecipientMutation,
  useGetStaffQuery,
} from "../../redux/apiSlice";
import { openNotification } from "../../redux/notificationSlice";

export interface IStaffPageProps {}

const StaffPage = (props: IStaffPageProps) => {
  const { data: staffs, isFetching } = useGetStaffQuery();
  const [deleteRecipient] = useDeleteRecipientMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dialog = useDialog();
  const dispatch = useAppDispatch();

  const columns: GridColDef<IStaff>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "role",
      headerName: "Role",
      width: 200,
    },
    {
      field: "address",
      headerName: "Address",
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
  const _handleDelete = (staff: IStaff) => {
    dialog.createDialog({
      type: "delete",
      onAction: async () => {
        try {
          await deleteRecipient(staff.id).unwrap();

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
      title="Staffs"
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
          rows={staffs || []}
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

StaffPage.getLayout = AdminLayout;

export default StaffPage;
