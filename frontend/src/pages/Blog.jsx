import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";

const Blog = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await API.get(`/blog/${slug}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [slug]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>Views: {blog.views}</p>
      <p>Likes: {blog.likes.length}</p>
      <h2>Comments</h2>
      {blog.comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.content}</p>
          <p>By: {comment.user.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Blog;