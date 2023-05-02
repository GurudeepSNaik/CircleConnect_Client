import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/job/customers-table';
import { CustomersSearch } from 'src/sections/job/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { useAuth } from 'src/hooks/use-auth';
import { AddJob, AddUser } from 'src/sections/job/AddJob';
import { JobDetails } from 'src/sections/job/JobDetails';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';

const Page = () => {
  const auth = useAuth();
  const {getJobs,jobs}=auth
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [component, setComponent] = useState("JOBS");
  const [detail, setDetail] = useState({});
  console.log(jobs)
  const useCustomers = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(jobs, page, rowsPerPage);
      },
      [page, rowsPerPage,jobs]
    );
  };
  
  const useCustomerIds = (customers) => {
    return useMemo(
      () => {
        return customers.map((customer) => customer.jobId);
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
    getJobs();
  },[])
  const handleAddUser=(to)=>{
    setComponent(to)
}
  const onDetailClick=(detail)=>{
    setDetail(detail);
    setComponent("JOB_DETAILS");
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
                  Jobs
                </Typography>
              </Stack>
              <div>
                <Button
                  onClick={()=>handleAddUser(component==="JOBS" ? "ADD_JOBS":"JOBS")}
                  startIcon={(
                    component==="USERS" && 
                    <SvgIcon fontSize="small">
                    <PlusIcon />
                    </SvgIcon>
                    ||
                    component==="ADD_JOBS" && 
                    <SvgIcon fontSize="small">
                    <ListBulletIcon/>
                    </SvgIcon>
                    
                  )}
                  variant="contained"
                >
                  {component==="JOBS" && "Add"}
                  {component==="ADD_JOBS" && "List"}
                  {component==="JOB_DETAILS" && "List"}
                </Button>
              </div>
            </Stack>
          {component==="JOBS" &&
          <>
          <CustomersSearch />
            {
              jobs.length >0 && <CustomersTable
              count={jobs.length}
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
           {component==="ADD_JOBS" &&
           <AddJob
            setComponent={setComponent}
           />
           }
           {component==="JOB_DETAILS" &&
           <JobDetails
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
