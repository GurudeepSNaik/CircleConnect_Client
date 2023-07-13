import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/applications/customers-table";
import { CustomersSearch } from "src/sections/applications/customers-search";
import { JobDetails } from "src/sections/applications/JobDetails";
import { applyPagination } from "src/utils/apply-pagination";
import { useAuth } from "src/hooks/use-auth";
import ListBulletIcon from "@heroicons/react/24/solid/ListBulletIcon";

const Page = () => {
  const auth = useAuth();
  const { applications, getApplications } = auth;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [component, setComponent] = useState("APPLICATIONS");
  const [detail, setDetail] = useState({});
  const useCustomers = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(applications, page, rowsPerPage);
    }, [page, rowsPerPage, applications]);
  };

  const useCustomerIds = (customers) => {
    return useMemo(() => {
      return customers.map((customer) => customer.jobId);
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
    getApplications();
  }, []);

  const onDetailClick = (detail) => {
    setDetail(detail);
    setComponent("APPLICATION_DETAILS");
  };
  return (
    <>
      <Head>
        <title>Applications | Circle Connect</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Applications</Typography>
              </Stack>
              {component === "APPLICATION_DETAILS" && (
                <Button
                  onClick={() => setComponent("APPLICATIONS")}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ListBulletIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  sx={{
                    backgroundColor: "#ec3e97",
                    "&:hover": {
                      backgroundColor: "#50c2b5",
                    },
                  }}
                >
                  List
                </Button>
              )}
            </Stack>
            {component === "APPLICATIONS" && (
              <>
                <CustomersSearch customersSelection={customersSelection} />
                {applications.length > 0 && (
                  <CustomersTable
                    count={applications.length}
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
                )}
              </>
            )}
            {component === "APPLICATION_DETAILS" && (
              <JobDetails setComponent={setComponent} details={detail} />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
