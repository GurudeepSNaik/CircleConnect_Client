import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Modal,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  TablePagination,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/user/customers-table";
import { CustomersSearch } from "src/sections/user/customers-search";
import { applyPagination } from "src/utils/apply-pagination";
import { url } from "../../constants";
import { useAuth } from "src/hooks/use-auth";
import { AddUser } from "src/sections/user/AddUser";
import { UserDetails } from "src/sections/user/UserDetails";
import ListBulletIcon from "@heroicons/react/24/solid/ListBulletIcon";
import { Scrollbar } from "src/components/scrollbar";
import { format } from "path";
import { baseAxios } from "src/contexts/utils/base-axios";
const VerifyGovtPhoto = () => {
  const auth = useAuth();
  const { getUsers, users } = auth;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [component, setComponent] = useState("USERS");
  const [detail, setDetail] = useState({});
  const useCustomers = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(users, page, rowsPerPage);
    }, [page, rowsPerPage, users]);
  };

  const useCustomerIds = (customers) => {
    return useMemo(() => {
      return customers.map((customer) => customer.userId);
    }, [customers]);
  };
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);
  useEffect(() => {
    getUsers();
  }, []);
  const handleAddUser = (to) => {
    setComponent(to);
  };
  const onDetailClick = (detail) => {
    setDetail(detail);
    setComponent("USER_DETAILS");
  };

  const handleOngovtPhotoStatusChange = async (value, userId) => {
    try {
      const reqData = {
        id: userId,
        govtPhotoStatus: value,
      };
      const res = await baseAxios.post("/user/govtPhotoStatus", reqData);
      getUsers();
    } catch (error) {
      console.log(error.message, "from handleOngovtPhotoStatusChange");
    }
  };
  return (
    <>
      {/* <Head>
          <title>
            Customers | Circle Connect
          </title>
        </Head> */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            {component === "USERS" && (
              <>
                <CustomersSearch customersSelection={customersSelection} />
                {users.length > 0 && (
                  <Card>
                    <Scrollbar>
                      <Box sx={{ minWidth: 800 }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Id</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell>Email</TableCell>
                              <TableCell>GovtPhoto</TableCell>
                              <TableCell>GovtPhotoStatus</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {users.map((customer) => {
                              console.log(customer);
                              //   const isSelected = selected.includes(customer.userId);
                              const createdAt = format(new Date(customer.createdAt), "dd/MM/yyyy");
                              return (
                                <TableRow hover key={customer.userId}>
                                  <TableCell onClick={() => onRowClick(customer)}>
                                    <Stack alignItems="center" direction="row" spacing={2}>
                                      <Typography variant="subtitle2">{customer.userId}</Typography>
                                    </Stack>
                                  </TableCell>
                                  <TableCell onClick={() => onRowClick(customer)}>
                                    <Stack alignItems="center" direction="row" spacing={2}>
                                      <Typography variant="subtitle2">{customer.name}</Typography>
                                    </Stack>
                                  </TableCell>
                                  <TableCell onClick={() => onRowClick(customer)}>
                                    {customer.email}
                                  </TableCell>
                                  <TableCell>
                                    <a href={`${url}/uploads/${customer.govtPhoto}`} download>
                                      <img
                                        src={`${url}/uploads/${customer.govtPhoto}`}
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                        }}
                                      />
                                    </a>
                                  </TableCell>
                                  <TableCell>
                                    <Select
                                      labelId="govtPhotoStatus"
                                      id="govtPhotoStatus"
                                      value={customer.govtPhotoStatus}
                                      onChange={(event) =>
                                        handleOngovtPhotoStatusChange(
                                          event.target.value,
                                          customer.userId
                                        )
                                      }
                                    >
                                      <MenuItem value={1}>Approved</MenuItem>
                                      <MenuItem value={0}>Rejected</MenuItem>
                                    </Select>
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
                      count={users.length}
                      onPageChange={handlePageChange}
                      //   onRowsPerPageChange={onRowsPerPageChange}
                      page={page}
                      rowsPerPage={rowsPerPage}
                      rowsPerPageOptions={[5, 10, 25]}
                    />
                  </Card>
                )}
              </>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

VerifyGovtPhoto.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default VerifyGovtPhoto;
