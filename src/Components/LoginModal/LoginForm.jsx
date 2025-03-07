import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loadercomp/Loader"; 

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        sessionStorage.clear();
        localStorage.clear();
        
        setTimeout(() => {
          navigate("/"); 
        }, 1000);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Loader loading={loading} />
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Email" type="email" variant="outlined" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" variant="outlined" fullWidth required value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
