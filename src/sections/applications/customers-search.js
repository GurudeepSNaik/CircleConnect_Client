import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Stack } from "@mui/system";

export const CustomersSearch = () => {
  const { getApplications } = useAuth();
  let debounceTimer;

  const debounce = (callback, time) => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback, time);
  };

  const search = (e) => {
    debounce(() => {
      if (e.target.value === "") {
        getApplications();
      } else {
        getApplications(e.target.value);
      }
    }, 500);
  };

  return (
    <Card sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" spacing={4}>
        <OutlinedInput
          onChange={search}
          fullWidth
          placeholder="Search Applications"
          startAdornment={
            <InputAdornment position="start">
              <SvgIcon color="action" fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </InputAdornment>
          }
          sx={{ maxWidth: 500 }}
        />
      </Stack>
    </Card>
  );
};
