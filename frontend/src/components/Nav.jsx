import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AppBar, Toolbar, Typography, Button, Box, Stack } from "@mui/material";

const Nav = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static" sx={{ bgcolor: "primary.dark", p: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "inherit", fontWeight: "bold" }}
        >
          MyBlog
        </Typography>

        {/* Navigation Links */}
        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/" sx={{ color: "white" }}>
            Home
          </Button>
          {user && (
            <Button component={Link} to="/create" sx={{ color: "white" }}>
              Create Blog
            </Button>
          )}
        </Stack>

        {/* User Section */}
        <Box>
          {user ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <Button component={Link} to="/profile" sx={{ color: "white" }}>
                {user.username}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={logout}
                sx={{ textTransform: "none" }}
              >
                Logout
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2}>
              <Button component={Link} to="/login" sx={{ color: "white" }}>
                Login
              </Button>
              <Button component={Link} to="/register" sx={{ color: "white" }}>
                Register
              </Button>
            </Stack>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
