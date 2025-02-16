import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../services/blogService";
import Loader from "../components/Loader";
import CommentSection from "../components/CommentSection";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlog(slug);
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <Loader />;
  
  if (!blog) return <p className="text-center text-gray-600">Blog not found</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-gray-500">By {blog.author?.username} | {new Date(blog.createdAt).toLocaleDateString()}</p>
      
      {blog.featuredImage && (
        <img src={blog.featuredImage} alt={blog.title} className="w-full my-4 rounded-lg" />
      )}

      <p className="text-lg">{blog.content}</p>

      <CommentSection blogId={blog._id} />
    </div>
  );
};

export default BlogDetails;

