import { Grid, Box, TextField, Typography, Button, Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { url } from "../../../constants";
import axios from "axios";

export const AddIndustry = (props) => {
  const formik = useFormik({
    initialValues: { category: "" },
    validationSchema: Yup.object({
      category: Yup.string().max(255).required("Category is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const data = { industry: values.category };
        const res = await axios.post(`${url}/industry/add`, data);
        if (res.data.status === 1) {
          alert("Success")
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
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
                    error={!!(formik.touched.category && formik.errors.category)}
                    fullWidth
                    helperText={formik.touched.category && formik.errors.category}
                    label="Category"
                    name="category"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.category}
                  />
                </Grid>
              </Grid>
                <Grid container spacing={2} margin={2}>
                <Grid item xs={2}>
                <Button fullWidth size="small" type="submit" variant="contained">Add Industry</Button>
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
