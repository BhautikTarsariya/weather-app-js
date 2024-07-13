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
import { login } from "../api/api";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

const defaultTheme = createTheme();

interface iNotify {
  show: boolean;
  type: "success" | "error";
}

const Login = ({ setToken }: any) => {
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
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const Form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await login(values);
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
            Sign in
          </Typography>
          <form onSubmit={Form.handleSubmit}>
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
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/register" className="text-decoration-none">
                  {"Don't have an account? Sign Up"}
                </Link>
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
            ? "Login Successfully"
            : "Can not Login. Try again later."}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Login;
