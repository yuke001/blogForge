import { useEffect, useState } from "react";
import { getBlogs } from "../services/blogService";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Latest Blogs</h1>
      {loading ? (
        <Loader />
      ) : blogs.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No blogs available.</p>
      )}
    </div>
  );
};

export default Home;
