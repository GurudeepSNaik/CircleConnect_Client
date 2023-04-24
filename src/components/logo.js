import { useTheme } from '@mui/material/styles';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <img
    width="80px"
    height="80px"
    alt="Logo"
    src="/assets/CirclesConnect.png"
  />
  );
};
