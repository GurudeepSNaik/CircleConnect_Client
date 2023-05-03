import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";

export const CustomersSearch = () => {
  const { getIndustries } = useAuth();
  let debounceTimer;

  const debounce = (callback, time) => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback, time);
  };

  const search = (e) => {
    debounce(() => {
      if (e.target.value === "") {
        getIndustries();
      } else {
        getIndustries(e.target.value);
      }
    }, 500);
  };
  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        fullWidth
        onChange={search}
        placeholder="Search Industries"
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 500 }}
      />
    </Card>
  );
};
