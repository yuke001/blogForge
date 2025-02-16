import { Box, Typography, Link, Stack } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.dark",
        color: "white",
        textAlign: "center",
        p: 2,
        mt: 5,
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} MyBlog. All rights reserved.
      </Typography>

      {/* Social Media Links */}
      <Stack direction="row" spacing={3} justifyContent="center" mt={1}>
        <Link href="#" color="inherit" sx={{ "&:hover": { color: "gray" } }}>
          Facebook
        </Link>
        <Link href="#" color="inherit" sx={{ "&:hover": { color: "gray" } }}>
          Twitter
        </Link>
        <Link href="#" color="inherit" sx={{ "&:hover": { color: "gray" } }}>
          Instagram
        </Link>
      </Stack>
    </Box>
  );
};

export default Footer;
