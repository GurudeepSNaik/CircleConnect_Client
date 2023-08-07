import { Grid, Box, TextField, Typography, Button, Alert, Input } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseAxios } from "src/contexts/utils/base-axios";
import PencilIcon from "@heroicons/react/24/solid/PencilSquareIcon";

export const AddIndustry = (props) => {
  const formik = useFormik({
    initialValues: { category: "" },
    validationSchema: Yup.object({
      category: Yup.string().max(255).required("Category is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const image = document.getElementById("imageUpload").files[0];
        const error_text = document.getElementById("error_message");
        if (image) {
          const formData = new FormData();
          formData.append("industry", values.category);
          formData.append("image", image);
          error_text.style.color = "black";
          const res = await baseAxios.post(`/industry/add`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.data.status === 1) {
            window.location.reload();
          } else {
            alert(res.data.message);
          }
        } else {
          error_text.style.color = "red";
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  const readURL = (input) => {
    if (input.target.files && input.target.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var imagePreview = document.getElementById("imagePreview");
        imagePreview.style.backgroundImage = "url(" + e.target.result + ")";
        imagePreview.style.display = "none";
        setTimeout(function () {
          imagePreview.style.display = "block";
        }, 650);
      };
      reader.readAsDataURL(input.target.files[0]);
    }
  };

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
                <Grid item xs={12}>
                  <div
                    style={{
                      position: "relative",
                      maxWidth: "205px",
                      margin: "0",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        right: "12px",
                        zIndex: 1,
                        top: "10px",
                      }}
                    >
                      <Input
                        type="file"
                        name="image"
                        id="imageUpload"
                        style={{ visibility: "hidden" }}
                        onChange={readURL}
                        accept=".png, .jpg, .jpeg"
                      />
                      <label style={{ position: "relative" }} htmlFor="imageUpload">
                        <PencilIcon
                          width={20}
                          height={20}
                          style={{
                            cursor: "pointer",
                            position: "absolute",
                            top: "2px",
                            right: "30px",
                          }}
                        />
                      </label>
                    </div>
                    <div
                      id="error_border"
                      style={{
                        width: "192px",
                        height: "192px",
                        position: "relative",
                        borderRadius: "100%",
                        border: "6px solid",
                        borderColor: "#f8f8f8",
                        boxShadow: " 0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div
                        id="imagePreview"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "100%",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundImage: `url("http://i.pravatar.cc/500?img=7")`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div id="error_message" style={{ textAlign: "left", marginTop: "2px" }}>
                    Please Add Image Of Industry.
                  </div>
                </Grid>
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
                  <Button
                    fullWidth
                    size="small"
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#ec3e97",
                      "&:hover": {
                        backgroundColor: "#50c2b5",
                      },
                    }}
                  >
                    Add Industry
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
