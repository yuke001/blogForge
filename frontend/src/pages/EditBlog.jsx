// frontend/src/pages/EditBlog.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlog, updateBlog } from "../services/blogService";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const EditBlog = () => {
    const { user } = useAuth();
    const { slug } = useParams();
    const navigate = useNavigate();
    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
        categories: "",
        featuredImage: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await getBlog(slug);
                setBlogData({
                    title: response.title,
                    content: response.content,
                    categories: response.categories,
                    featuredImage: null,
                });

                // Validate if the slug matches the fetched blog title (basic check)
                const expectedSlug = response.title.toLowerCase().replace(/\s+/g, "-");  // basic slug generation
                if (slug !== expectedSlug) {
                    toast.error("Invalid blog URL."); // Display error if slug doesn't match
                    navigate("/"); // Redirect to home page or another appropriate page
                }
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch blog.");
                toast.error(err.response?.data?.message || "Failed to fetch blog.");  //Display the error to the user
                navigate("/");  //Redirect the user if fetch fails
            }
        };
        fetchBlog();
    }, [slug, navigate]);

    if (!user || (user.role !== "admin" && user.role !== "author")) {
        return <p className="text-center text-red-500">Access Denied!</p>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setBlogData((prev) => ({ ...prev, featuredImage: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("title", blogData.title);
            formData.append("content", blogData.content);
            formData.append("categories", blogData.categories);
            if (blogData.featuredImage) {
                formData.append("featuredImage", blogData.featuredImage);
            }

            const token = localStorage.getItem("token");
            await updateBlog(slug, formData, token);
            navigate(`/blog/${slug}`);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
            toast.error(err.response?.data?.message || "Something went wrong.");  //Display the error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Edit Blog</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={blogData.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    value={blogData.content}
                    onChange={handleChange}
                    className="w-full p-2 border rounded h-40"
                    required
                />
                <input
                    type="text"
                    name="categories"
                    placeholder="Category (e.g., Technology, Lifestyle)"
                    value={blogData.categories}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />

                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? <Loader /> : "Update Blog"}
                </button>
            </form>
        </div>
    );
};

export default EditBlog;