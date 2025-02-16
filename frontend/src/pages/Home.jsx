import { useEffect, useState } from "react";
import { getBlogs } from "../services/blogService";
import BlogCard from "../components/BlogCard";
import { Container, Typography, Grid, CircularProgress, Box } from "@mui/material";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        console.log("Fetched blogs:", data); // Debugging log

        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          console.error("Expected an array but got:", data);
          setBlogs([]); // Ensure blogs is always an array
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]); // Fallback to an empty array
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        Latest Blogs
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : blogs.length > 0 ? (
        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <BlogCard blog={blog} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary" textAlign="center">
          No blogs available.
        </Typography>
      )}
    </Container>
  );
};

export default Home;
