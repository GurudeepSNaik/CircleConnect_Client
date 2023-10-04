import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import { Stack } from "@mui/system";
import { useState } from "react";

export const CustomersSearch = ({ customersSelection }) => {
  const { getJobs, deleteJob } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let debounceTimer;

  const debounce = (callback, time) => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback, time);
  };

  const search = (e) => {
    debounce(() => {
      if (e.target.value === "") {
        getJobs();
      } else {
        getJobs(e.target.value);
      }
    }, 500);
  };

  const handleDelete = () => {
    customersSelection.selected.map(async (each) => {
      await deleteJob(each);
    });
    handleClose();
  };
  return (
    <Card sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" spacing={4}>
        <OutlinedInput
          onChange={search}
          fullWidth
          placeholder="Search Jobs"
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500 }}
        />

        <div>
          {/* {customersSelection.selected.length > 0 && (
            <Button
              onClick={handleOpen}
              startIcon={
                <SvgIcon fontSize="small">
                  <TrashIcon />
                </SvgIcon>
              }
              variant="contained"
              color="error"
              className="dropdown-item discard"
              data-bs-toggle="modal"
              data-bs-target="#exampleModals"
            >
              Delete
            </Button>
          )} */}
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete this Job?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Note: Once deleted cannot be restored!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleDelete} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Card>
  );
};
