import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await API.get("/blog");
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h2>
            <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
          </h2>
          <p>{blog.content.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

export default Home;