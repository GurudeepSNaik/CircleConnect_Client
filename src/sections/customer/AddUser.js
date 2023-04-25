import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Autocomplete,
  Grid,
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  Item,
} from "@mui/material";
import CountrySelect from "./Country";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { url } from '../../../constants';
import axios from 'axios';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "400px",
    },
  },
};

const names = ["Worker", "Job Poster"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export const AddUser = (props) => {
  const {setComponent}=props.setComponent
  const router = useRouter();
  const auth = useAuth();
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [country, setCountry] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      name: Yup.string().max(255).required("Name is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log(values,personName,country);
       const data= { 
            "type":personName[0], 
            "username":values.name,
            "password":values.password, 
            "mobile":values.phone,
            "email":values.email,
            "country":country,
            "province":values.state,
            "city":values.city ,
            "pin":values.pin
             }
        const res=await axios.post(`${url}/user/adduser`,data);
        if(res.data.status===1){
            window.location.reload()
          }else{
            alert(res.data.message)
          }
        
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    //   <Card sx={{ p: 2 }}>
    //        <CountrySelect/>
    //   </Card>
    <>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "90%",
            width: "100%",
          }}
        >
          <div>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{
                display: "flex",
              }}
            >
              <Grid container spacing={2} margin={2}>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="Name"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} margin={2}>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.phone && formik.errors.phone)}
                    fullWidth
                    helperText={formik.touched.phone && formik.errors.phone}
                    label="Mobile Number"
                    name="phone"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.phone}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} margin={2}>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.city && formik.errors.city)}
                    fullWidth
                    helperText={formik.touched.city && formik.errors.city}
                    label="City"
                    name="city"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.city}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.state && formik.errors.state)}
                    fullWidth
                    helperText={formik.touched.state && formik.errors.state}
                    label="Province"
                    name="state"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.state}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} margin={2}>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <InputLabel id="demo-multiple-name-label" sx={{ fontSize: "15px" }}>
                    Type
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    sx={{ width: "400px" }}
                    single
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.pin && formik.errors.pin)}
                    fullWidth
                    helperText={formik.touched.pin && formik.errors.pin}
                    label="Pin"
                    name="pin"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.pin}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} margin={2}>
                <Grid item xs={6}>
                  <CountrySelect setCountry={setCountry} />
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth size="large" type="submit" variant="contained">
                    Add User
                  </Button>
                </Grid>
              </Grid>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};
