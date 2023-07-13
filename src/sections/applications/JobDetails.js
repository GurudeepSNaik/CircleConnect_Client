import { Grid, Box, Typography, Item, Paper, ImageListItem } from "@mui/material";
import { url } from "../../../constants";
export const JobDetails = ({ details }) => {
  const getComponents = () => {
    const components = [];
    for (let property in details) {
      if (
        details[property] !== null &&
        property !== "rejected" &&
        property !== "accepted" &&
        property !== "jobpopular" &&
        property !== "usertype"
      ) {
        let propertyName = "";
        if (property === "applicationId") propertyName = "Id";
        else if (property === "coverletter") propertyName = "Cover Letter";
        else if (property === "applicationjobId") propertyName = "Job Id";
        else if (property === "applicationuserId") propertyName = "Employee Id";
        else if (property === "applicationownerId") propertyName = "Owner Id";
        else if (property === "job_rating") propertyName = "Job Rating";
        else if (property === "job_review") propertyName = "Job Review";
        else if (property === "applicant_rating") propertyName = "Applicant Rating";
        else if (property === "applicant_review") propertyName = "Applicant Review";
        else if (property === "username") propertyName = "Employee Name";
        else if (property === "useremail") propertyName = "Employee Email";
        else if (property === "usertype") propertyName = "Employee Type";
        else if (property === "usermobile") propertyName = "Employee Mobile Number";
        else if (property === "usercity") propertyName = "Employee City";
        else if (property === "userstate") propertyName = "Employee State";
        else if (property === "usercountry") propertyName = "Employee Country";
        else if (property === "jobcompanyname") propertyName = "Company Name";
        else if (property === "joblocation") propertyName = "Job Location";
        else if (property === "jobdresscode") propertyName = "Dress Code";
        else if (property === "jobnumberofapplicants") propertyName = "Maximun Applicants";
        else if (property === "jobfixedcost") propertyName = "Fixed Cost";
        else if (property === "jobvariablecost") propertyName = "Variable Cost";
        else if (property === "jobtermsandconditions") propertyName = "Terms And Condition";
        else if (property === "jobrequiredskill") propertyName = "Required Skill";
        else if (property === "jobminexp") propertyName = "Min Experience";
        else if (property === "jobtype") propertyName = "Job Type";
        else if (property === "jobdescription") propertyName = "Job Description";
        else if (property === "jobStatus") propertyName = "Job Status";
        else propertyName = property;

        if(property==="jobminexp"){
          details[property]=details[property].split(" ")[0]+" Years"
        }else if (property==="jobStatus" && (details[property]=== 1 || details[property]=== 0)){
          details[property]=details[property]=== 1 ? "Active" : "Completed"
        }
        components.push(
          <Grid item xs={6} key={property}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {propertyName.toUpperCase()}
              </Typography>
              <Typography variant="body1">{details[property]}</Typography>
            </Paper>
          </Grid>
        );
      }
    }

    return components;
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
          <Grid container spacing={2} margin={2}>
            {details.profilePic && (
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "192px",
                    height: "192px",
                    border: "6px solid #f4f4f4",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    style={{
                      width: "182px",
                      height: "182px",
                      objectFit: "cover",
                      borderRadius: "100%",
                      background: "#f2f2f2",
                      margin: "0px auto",
                      marginBottom: "40px",
                    }}
                    src={`${url}/uploads/${details.profilePic}`}
                    alt="Profile"
                  />
                </div>
              </Grid>
            )}

            {getComponents()}
          </Grid>
        </Box>
      </Box>
    </>
  );
};
