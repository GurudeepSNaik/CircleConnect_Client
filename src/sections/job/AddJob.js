import { Grid, Box, Button, TextField, Typography, FormControl, Input } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "src/hooks/use-auth";
import { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { url } from "../../../constants";
import axios from "axios";

export const AddJob = (props) => {
  const { industries, getIndustries } = useAuth();
  const formik = useFormik({
    initialValues: {
      category: "",
      companyName: "",
      location: "",
      dressCode: "",
      dateAndTime: "",
      noa: "",
      fixedCost: "",
      variableCost: "",
      tnc: "",
      requiredSkill: "",
      minExp: "",
      jobType: "",
      popular: "",
      description: "",
      submit: null,
      userId: 1,
    },
    validationSchema: Yup.object({
      category: Yup.string().max(255).required("Category is required"),
      companyName: Yup.string().max(255).required("Company Name is required"),
      location: Yup.string().max(255).required("location is required"),
      dressCode: Yup.string().max(255).required("Dress Code is required"),
      dateAndTime: Yup.string().max(255).required("Date And Time is required"),
      noa: Yup.string().max(255).required("Nymber Of Application is required"),
      fixedCost: Yup.string().max(255).required("Fixed Cost is required"),
      variableCost: Yup.string().max(255).required("Variable Cost is required"),
      tnc: Yup.string().max(255).required("Terms And Condition is required"),
      requiredSkill: Yup.string().max(255).required("Required Skill is required"),
      minExp: Yup.string().max(255).required("Minimun Experience is required"),
      jobType: Yup.string().max(255).required("Job Type is required"),
      popular: Yup.string().max(255).required("Popular is required"),
      description: Yup.string().max(255).required("description is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const res = await baseAxios.post(`/job/add`, values);
        if (res.data.status === 1) {
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
  useEffect(() => {
    getIndustries();
  }, []);
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
                  <FormControl fullWidth>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                      fullWidth
                      labelId="category-select-label"
                      id="category-select"
                      error={!!(formik.touched.category && formik.errors.category)}
                      helperText={formik.touched.category && formik.errors.category}
                      name="category"
                      onBlur={formik.handleBlur}
                      type="select"
                      value={formik.values.category}
                      onChange={(event) => {
                        formik.setFieldValue("category", event.target.value);
                        formik.setFieldTouched("category", true);
                      }}
                    >
                      {industries.length > 0 &&
                        industries.map((each) => {
                          return (
                            <MenuItem key={each.industryId} value={each.industryId}>
                              {each.industry}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.companyName && formik.errors.companyName)}
                    fullWidth
                    helperText={formik.touched.companyName && formik.errors.companyName}
                    label="Company Name"
                    name="companyName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.companyName}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} margin={2}>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.location && formik.errors.location)}
                    fullWidth
                    helperText={formik.touched.location && formik.errors.location}
                    label="Location"
                    name="location"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.location}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.dressCode && formik.errors.dressCode)}
                    fullWidth
                    helperText={formik.touched.dressCode && formik.errors.dressCode}
                    label="Dress Code"
                    name="dressCode"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.dressCode}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} margin={2}>
                <Grid item xs={6}>
                  <InputLabel id="dateAndTime-label">Date Time</InputLabel>
                  <Input
                    error={!!(formik.touched.dateAndTime && formik.errors.dateAndTime)}
                    fullWidth
                    helperText={formik.touched.dateAndTime && formik.errors.dateAndTime}
                    label="Date Time"
                    name="dateAndTime"
                    type="datetime-local"
                    min={new Date()}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.dateAndTime}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.noa && formik.errors.noa)}
                    fullWidth
                    helperText={formik.touched.noa && formik.errors.noa}
                    label="Number Of Application"
                    name="noa"
                    type="number"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.noa}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} margin={2}>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.fixedCost && formik.errors.fixedCost)}
                    fullWidth
                    helperText={formik.touched.fixedCost && formik.errors.fixedCost}
                    label="Fixed Cost"
                    name="fixedCost"
                    type="number"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.fixedCost}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.variableCost && formik.errors.variableCost)}
                    fullWidth
                    helperText={formik.touched.variableCost && formik.errors.variableCost}
                    label="Variable Cost"
                    name="variableCost"
                    type="number"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.variableCost}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} margin={2}>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.tnc && formik.errors.tnc)}
                    fullWidth
                    helperText={formik.touched.tnc && formik.errors.tnc}
                    label="Terms & Condition"
                    name="tnc"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.tnc}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.requiredSkill && formik.errors.requiredSkill)}
                    fullWidth
                    helperText={formik.touched.requiredSkill && formik.errors.requiredSkill}
                    label="Required Skill"
                    name="requiredSkill"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.requiredSkill}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} margin={2}>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.minExp && formik.errors.minExp)}
                    fullWidth
                    helperText={formik.touched.minExp && formik.errors.minExp}
                    label="Minimum Experience in Years"
                    name="minExp"
                    type="number"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.minExp}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={!!(formik.touched.description && formik.errors.description)}
                    fullWidth
                    helperText={formik.touched.description && formik.errors.description}
                    label="Description"
                    name="description"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} margin={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="jobType-select-label">Job Type</InputLabel>
                    <Select
                      fullWidth
                      labelId="jobType-select-label"
                      id="jobType-select"
                      error={!!(formik.touched.jobType && formik.errors.jobType)}
                      helperText={formik.touched.jobType && formik.errors.jobType}
                      name="jobType"
                      onBlur={formik.handleBlur}
                      type="select"
                      value={formik.values.jobType}
                      onChange={(event) => {
                        formik.setFieldValue("jobType", event.target.value);
                        formik.setFieldTouched("jobType", true);
                      }}
                    >
                      <MenuItem key="remote" value="remote">
                        Remote
                      </MenuItem>
                      <MenuItem key="onsite" value="onsite">
                        On Site
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="popular-select-label">Popular</InputLabel>
                    <Select
                      fullWidth
                      labelId="popular-select-label"
                      id="popular-select"
                      error={!!(formik.touched.popular && formik.errors.popular)}
                      helperText={formik.touched.popular && formik.errors.popular}
                      name="popular"
                      onBlur={formik.handleBlur}
                      type="select"
                      value={formik.values.popular}
                      onChange={(event) => {
                        formik.setFieldValue("popular", event.target.value);
                        formik.setFieldTouched("popular", true);
                      }}
                    >
                      <MenuItem key={true} value={true}>
                        True
                      </MenuItem>
                      <MenuItem key={false} value={false}>
                        False
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} margin={2}>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#ec3e97",
                      "&:hover": {
                        backgroundColor: "#50c2b5",
                      },
                    }}
                  >
                    Add Job
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
