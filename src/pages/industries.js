import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/industries/customers-table';
import { CustomersSearch } from 'src/sections/industries/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { useAuth } from 'src/hooks/use-auth';
import { AddIndustry } from 'src/sections/industries/AddIndustry';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';

const Page = () => {
  const {getIndustries,industries}= useAuth()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [component, setComponent] = useState("INDUSTRIES");
  const useCustomers = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(industries, page, rowsPerPage);
      },
      [page, rowsPerPage,industries]
    );
  };
  
  const useCustomerIds = (customers) => {
    return useMemo(
      () => {
        return customers.map((customer) => customer.industryId);
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
    getIndustries();
  },[])
  const handleAddUser=(to)=>{
    setComponent(to)
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
                  Industries
                </Typography>
              </Stack>
              <div>
                <Button
                  onClick={()=>handleAddUser(component==="INDUSTRIES" ? "ADD_INDUSTRY":"INDUSTRIES")}
                  startIcon={(
                    component==="INDUSTRIES" && 
                    (<SvgIcon fontSize="small">
                    <PlusIcon />
                    </SvgIcon>)
                    ||
                    component==="ADD_INDUSTRY" && 
                    <SvgIcon fontSize="small">
                    <ListBulletIcon/>
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  {component==="INDUSTRIES" && "Add"}
                  {component==="ADD_INDUSTRY" && "List"}
                </Button>
              </div>
            </Stack>
          {component==="INDUSTRIES" &&
          <>
          <CustomersSearch />
            {
              industries.length >0 && <CustomersTable
              count={industries.length}
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
            />
            }
          </>
           }  
           {component==="ADD_INDUSTRY" &&
           <AddIndustry
            setComponent={setComponent}
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
