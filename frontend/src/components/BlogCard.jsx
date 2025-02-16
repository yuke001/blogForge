import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {blog.featuredImage && (
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {blog.title}
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          {blog.content.substring(0, 100)}...
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-gray-500 text-sm">By {blog.author?.username || "Unknown"}</span>
          <Link
            to={`/blog/${blog.slug}`}
            className="text-blue-500 hover:underline text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
