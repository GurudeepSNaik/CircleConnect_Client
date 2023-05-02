import PropTypes from 'prop-types';
import { format } from 'date-fns';
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
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';

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
    onRowClick
  } = props;
  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
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
                <TableCell>
                  Id
                </TableCell>
                <TableCell>
                  Category
                </TableCell>
                <TableCell>
                  Company Name
                </TableCell>
                <TableCell>
                  Fixed Cost
                </TableCell>
                <TableCell>
                  Variable Cost
                </TableCell>
                <TableCell>
                  Type
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Date And Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.jobId);
                const dateAndTime = format(new Date(customer.dateAndTime), 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={customer.jobId}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.jobId);
                          } else {
                            onDeselectOne?.(customer.jobId);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell onClick={()=>onRowClick(customer)}>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="subtitle2">
                          {customer.jobId}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell onClick={()=>onRowClick(customer)}>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="subtitle2">
                          {customer.industry}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell  onClick={()=>onRowClick(customer)}>
                      {customer.companyName}
                    </TableCell>
                    <TableCell onClick={()=>onRowClick(customer)}>
                      {customer.fixedCost}
                    </TableCell>
                    <TableCell onClick={()=>onRowClick(customer)}>
                      {customer.variableCost}
                    </TableCell>
                    <TableCell onClick={()=>onRowClick(customer)}>
                      {customer.jobType}
                    </TableCell>
                    <TableCell onClick={()=>onRowClick(customer)}>
                      {customer.location}
                    </TableCell>
                    <TableCell onClick={()=>onRowClick(customer)}>
                      {dateAndTime}
                    </TableCell>
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

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
