import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get("/users/profile");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handlePhotoUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    try {
      await API.patch(`/users/profile/${user._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile photo updated successfully!");
    } catch (error) {
      setError("Failed to update profile photo");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <img src={user.photo} alt="Profile" width="100" />
      <form onSubmit={handlePhotoUpload}>
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          required
        />
        <button type="submit">Update Photo</button>
      </form>
    </div>
  );
};

export default Profile;