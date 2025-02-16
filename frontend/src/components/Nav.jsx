import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Nav = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          MyBlog
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          {user && <Link to="/create" className="hover:text-gray-400">Create Blog</Link>}
        </div>

        {/* User Section */}
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/profile" className="hover:text-gray-400">{user.username}</Link>
              <button onClick={logout} className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-400">Login</Link>
              <Link to="/register" className="hover:text-gray-400">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
