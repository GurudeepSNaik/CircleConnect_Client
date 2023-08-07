import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography,Modal } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/user/customers-table';
import { CustomersSearch } from 'src/sections/user/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { url } from '../../constants';
import { useAuth } from 'src/hooks/use-auth';
import { AddUser } from 'src/sections/user/AddUser';
import { UserDetails } from 'src/sections/user/UserDetails';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';

const Page = () => {
  const auth = useAuth();
  const {getUsers,users}=auth
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [component, setComponent] = useState("USERS");
  const [detail, setDetail] = useState({});
  const useCustomers = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(users, page, rowsPerPage);
      },
      [page, rowsPerPage,users]
    );
  };
  
  const useCustomerIds = (customers) => {
    return useMemo(
      () => {
        return customers.map((customer) => customer.userId);
      },
      [customers]
    );
  };
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );
  useEffect(()=>{
    getUsers();
  },[])
  const handleAddUser=(to)=>{
      setComponent(to)
  }
  const onDetailClick=(detail)=>{
      setDetail(detail);
      setComponent("USER_DETAILS");
  }
  return (
    <>
      <Head>
        <title>
          Customers | Circle Connect
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Users
                </Typography>
              </Stack>
              <div>
                <Button
                  onClick={()=>handleAddUser(component==="USERS" ? "ADD_USER":"USERS")}
                  startIcon={(
                    component==="USERS" && 
                    <SvgIcon fontSize="small">
                    <PlusIcon />
                    </SvgIcon>
                    ||
                    component==="ADD_USER" && 
                    <SvgIcon fontSize="small">
                    <ListBulletIcon/>
                    </SvgIcon>
                  )}
                  variant="contained"
                  sx={{
                    backgroundColor: "#ec3e97",
                    "&:hover": {
                      backgroundColor: "#50c2b5",
                    },
                  }}
                >
                  {component==="USERS" && "Add"}
                  {component==="ADD_USER" && "List"}
                  {component==="USER_DETAILS" && "List"}
                </Button>
              </div>
            </Stack>
          {component==="USERS" &&
          <>
          <CustomersSearch customersSelection={customersSelection}/>
            {
              users.length >0 && <CustomersTable
              count={users.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
              onRowClick={onDetailClick}
            />
            }
          </>
           }  
           {component==="ADD_USER" &&
           <AddUser
            setComponent={setComponent}
           />
           }
           {component==="USER_DETAILS" &&
           <UserDetails
            setComponent={setComponent}
            details={detail}
           />
           }
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
