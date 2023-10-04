import { Grid, Box, Typography, Item, Paper, ImageListItem } from "@mui/material";
import { url } from "../../../constants";
export const JobDetails = ({ details }) => {
  const getComponents = () => {
    const components = [];
    for (let property in details) {
      if (
        details[property] !== null &&
        property !== "createdAt" &&
        property !== "updatedAt" &&
        property !== "status" && 
        property !== "popular"  && 
        property !== "companyImage"  

      ) {
        let propertyName = "";
        if (property === "jobId") propertyName = "Id";
        else if (property === "category") propertyName = "Industry Id";
        else if (property === "companyName") propertyName = "Company Name";
        else if (property === "dressCode") propertyName = "Dress Code";
        else if (property === "dateAndTime") propertyName = "Date And time";
        else if (property === "noa") propertyName = "Number Of Application";
        else if (property === "fixedCost") propertyName = "Fixed Cost";
        else if (property === "variableCost") propertyName = "Variable Cost";
        else if (property === "tnc") propertyName = "Terms & Conditions";
        else if (property === "requiredSkill") propertyName = "Required Skill";
        else if (property === "minExp") propertyName = "Minimum Experience";
        else if (property === "userId") propertyName = "User Id";
        else if (property === "jobType") propertyName = "Job Type";
        else if (property === "job_complete") propertyName = "Completed";
        else propertyName = property;
        components.push(
          <Grid item xs={6} key={property}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {propertyName.toUpperCase()}
              </Typography>
              <Typography variant="body1">{
                property==="job_complete" ?details[property]===0?"False":"True":details[property]
                }</Typography>
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
            {details.companyImage && (
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
                    src={`${url}/uploads/${details.companyImage}`}
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
