import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import {useTheme } from "@mui/material";
import axios from "axios";

const Form = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Send a POST request to the server with the form data 
      const response = await axios.post("http://localhost:8800/api/createuser", values);
      
      // Log the response from the server
      console.log(response.data);

      // Reset the form after submission
      setSubmitting(false);
    } catch (error) {
      console.log("Error", error);
    }
  }

  //for gender values
  const genderOptions = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Non-Binary",
      value: "non-binary",
    },
  ];

  const departmentOptions = [
    {
      label: "SAFAD",
      value: "SAFAD",
    },
    {
      label: "SAS",
      value: "SAS",
    },
    {
      label: "SBE",
      value: "SBE",
    },
    {
      label: "SOE",
      value: "SOE",
    },
  ];

  //for values in form
  const checkoutSchema = yup.object().shape({
    firstname: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
    username: yup.string().required("Username is required"),
    genderCode: yup.string().required("Gender is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    department: yup.string().required("Department is required"),
    jobPosition: yup.string().required("Job position is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });
  
  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    genderCode: "",
    email: "",
    department: "",
    jobPosition: "",
    password: "",
    confirmpassword: "",
  };

  return (
    <Box m="20px" >
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              backgroundColor={colors.primary[400]}
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              padding="35px"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstname}
                name="firstname"
                error={!!touched.firstname && !!errors.firstname}
                helperText={touched.firstname && errors.firstname}
                sx={{ gridColumn: "span 2"}}
              />
              
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastname}
                name="lastname"
                error={!!touched.lastname && !!errors.lastname}
                helperText={touched.lastname && errors.lastname}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                select
                fullWidth
                variant="outlined"
                label="Gender"
                value={values.genderCode}
                name="genderCode"
                onChange={handleChange}
                error={!!touched.genderCode && !!errors.genderCode}
                helperText={touched.genderCode && errors.genderCode}
                sx={{ gridColumn: "span 4" }}
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="outlined"
                type="email"
                label="Email Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                select
                fullWidth
                variant="outlined"
                label="Department"
                value={values.department}
                name="department"
                onChange={handleChange}
                error={!!touched.department && !!errors.department}
                helperText={touched.department && errors.department}
                sx={{ gridColumn: "span 4" }}
               >
                {departmentOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Job Position"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.jobPosition}
                name="jobPosition"
                error={!!touched.jobPosition && !!errors.jobPosition}
                helperText={touched.jobPosition && errors.jobPosition}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmpassword}
                name="confirmpassword"
                error={!!touched.confirmpassword && !!errors.confirmpassword}
                helperText={touched.confirmpassword && errors.confirmpassword}
                sx={{ gridColumn: "span 4" }}
              />           
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="primary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
    );
  };

export default Form;
