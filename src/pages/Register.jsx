import React from "react";
import SendIcon from "@mui/icons-material/Send";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { registerUserThunk, reset } from "../features/user/userSlice";

const LoginContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: blue[400],
});

const FormWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "50px",
  width: "300px",
  [theme.breakpoints.down("md")]: {
    width: "200px",
  },
  gap: "10px",
  backgroundColor: "white",
}));

const LinkWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errState, setErrState] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isSuccess, isLoading, isError, errorMessage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setErrState(errorMessage);
    }
    if (isSuccess) {
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
      setSuccessMessage("Register success");
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, errorMessage, isSuccess, navigate, successMessage, dispatch]);

  const canSaveData =
    [username, email, password, confirmPassword].every(Boolean) && !isLoading;

  const handleUserRegistration = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setPasswordErr("Passwords do not match!");
    }

    if (canSaveData) {
      try {
        dispatch(registerUserThunk({ username, email, password }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <LoginContainer>
      <Typography variant="h1" fontSize="25px" color="white" mb={"20px"}>
        Register
      </Typography>
      {successMessage && <Typography>{successMessage}</Typography>}
      <form onSubmit={handleUserRegistration}>
        <FormWrapper>
          <Typography textAlign="center" variant="body1">
            Please fill information in the fields below
          </Typography>
          {errState && <Alert severity="error">{errState}</Alert>}

          <TextField
            autoComplete="off"
            autoFocus
            margin="normal"
            variant="standard"
            id="username"
            label="Username"
            type="text"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            autoComplete="off"
            autoFocus
            margin="normal"
            variant="standard"
            id="email"
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoComplete="off"
            autoFocus
            margin="normal"
            variant="standard"
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            inputProps={{ minLength: 6 }}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handlePasswordVisibility}
                    onMouseDown={handleMouseDown}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            autoComplete="off"
            autoFocus
            margin="normal"
            variant="standard"
            id="confirmpassword"
            label="Confirm Password"
            type={showCPassword ? "text" : "password"}
            fullWidth
            inputProps={{ minLength: 6 }}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleCPasswordVisibility}
                    onMouseDown={handleMouseDown}
                  >
                    {showCPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordErr && (
            <Alert severity="error">Passwords do not match!</Alert>
          )}
          {isLoading ? (
            <CircularProgress color="primary" />
          ) : (
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ color: "inherit" }}
              disabled={!canSaveData}
            >
              Submit
            </Button>
          )}
          <LinkWrapper>
            <Typography sx={{ mt: "10px" }} variant="caption">
              Do you have an account?
            </Typography>
            <Button LinkComponent={Link} to="/login">
              Login
            </Button>
          </LinkWrapper>
        </FormWrapper>
      </form>
    </LoginContainer>
  );
};

export default Register;
