// frontend/src/components/CommentSection.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';

const CommentSection = ({ blogId }) => { // Received blogId as prop
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL + "/blog";

    useEffect(() => {
        fetchComments();
    }, [blogId]);  //useEffect now depends on blogId

    const fetchComments = async () => {
        try {
            const res = await axios.get(`${API_URL}/${blogId}/comments`);
            setComments(res.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                `${API_URL}/${blogId}/comments`,
                { content: newComment },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.status === 200) {
                setNewComment("");
                fetchComments(); // Refresh comments
            }
        } catch (error) {
            console.error("Error posting comment:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold mb-3">Comments</h3>

            {/* Comment Input */}
            <form onSubmit={handleCommentSubmit} className="mb-4">
                <textarea
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Posting..." : "Post Comment"}
                </button>
            </form>

            {/* Comments List */}
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment._id} className="border-t py-2 flex gap-3">
                        <FaUserCircle className="text-gray-600 text-2xl" />
                        <div>
                            <p className="text-sm font-semibold">{comment.user.username}</p>
                            <p className="text-gray-700">{comment.content}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No comments yet.</p>
            )}
        </div>
    );
};

export default CommentSection;