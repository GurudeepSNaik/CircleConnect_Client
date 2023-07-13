import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    onRowClick,
  } = props;
  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Cover Letter</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Job Location</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.applicationId);
                let ApplicationStatus = "";
                if (customer.accepted === 1) {
                  ApplicationStatus = "Accepted";
                }
                if (customer.rejected === 1) {
                  ApplicationStatus = "Rejected";
                }
                if (customer.accepted === 0 && customer.rejected === 0) {
                  ApplicationStatus = "Pending";
                }
                if (customer.accepted === 1 && (customer.job_rating || customer.job_review)) {
                  ApplicationStatus = "Completed";
                }
                return (
                  <TableRow hover key={customer.applicationId} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.applicationId);
                          } else {
                            onDeselectOne?.(customer.applicationId);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell onClick={() => onRowClick(customer)}>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{customer.applicationId}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell onClick={() => onRowClick(customer)}>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{customer.coverletter}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell onClick={() => onRowClick(customer)}>
                      {customer.jobcompanyname}
                    </TableCell>
                    <TableCell onClick={() => onRowClick(customer)}>{customer.username}</TableCell>
                    <TableCell onClick={() => onRowClick(customer)}>
                      {customer.joblocation}
                    </TableCell>
                    <TableCell onClick={() => onRowClick(customer)}>{ApplicationStatus}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

// CustomersTable.propTypes = {
//   count: PropTypes.number,
//   items: PropTypes.array,
//   onDeselectAll: PropTypes.func,
//   onDeselectOne: PropTypes.func,
//   onPageChange: PropTypes.func,
//   onRowsPerPageChange: PropTypes.func,
//   onSelectAll: PropTypes.func,
//   onSelectOne: PropTypes.func,
//   page: PropTypes.number,
//   rowsPerPage: PropTypes.number,
//   selected: PropTypes.array,
// };
