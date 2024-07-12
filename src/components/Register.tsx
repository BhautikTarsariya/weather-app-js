import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../api/api";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const defaultTheme = createTheme();

interface iNotify {
  show: boolean;
  type: "success" | "error";
}

const Register = ({ setToken }: any) => {
  const navigate = useNavigate();

  const [notify, setNotify] = useState<iNotify>({
    show: false,
    type: "success",
  });

  const handleClose = (_event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({ show: false, type: "success" });
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is Required"),
    last_name: Yup.string().required("Last Name is Required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const Form = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await register(values);
        setToken(response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        setNotify({ show: true, type: "success" });
        navigate("/home");
      } catch (err) {
        setNotify({ show: true, type: "error" });
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={Form.handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="First Name"
              name="first_name"
              autoComplete="first_name"
              value={Form.values.first_name}
              onChange={Form.handleChange}
              onBlur={Form.handleBlur}
              helperText={Form.touched.first_name && Form.errors.first_name}
              error={Boolean(Form.touched.first_name && Form.errors.first_name)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Last Name"
              name="last_name"
              autoComplete="last_name"
              value={Form.values.last_name}
              onChange={Form.handleChange}
              onBlur={Form.handleBlur}
              helperText={Form.touched.last_name && Form.errors.last_name}
              error={Boolean(Form.touched.last_name && Form.errors.last_name)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              value={Form.values.email}
              onChange={Form.handleChange}
              onBlur={Form.handleBlur}
              helperText={Form.touched.email && Form.errors.email}
              error={Boolean(Form.touched.email && Form.errors.email)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={Form.values.password}
              onChange={Form.handleChange}
              onBlur={Form.handleBlur}
              helperText={Form.touched.password && Form.errors.password}
              error={Boolean(Form.touched.password && Form.errors.password)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
      <Snackbar
        open={notify.show}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert variant="filled" severity={notify.type}>
          {notify.type === "success"
            ? "Registration Successfully"
            : "Can not Registration. Try again later."}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Register;
