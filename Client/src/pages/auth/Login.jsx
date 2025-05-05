import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { AuthStore } from "../../store/AuthStore"; // Adjust path as needed

const Login = () => {
  const { user } = AuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Login, isLoggedIn, errorMsg } = AuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }
    try {
      const success = await Login({ email, password });
      if (success) {
        const user = AuthStore.getState().user; // Get the latest user state
        if (user?.role === "user") {
          navigate("/");
        } else if (user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/login");
        }
      } else {
        toast.error(errorMsg);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {errorMsg && <p className="text-red-500 mb-4 text-center">{errorMsg}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={isLoggedIn}
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={isLoggedIn}
          />
        </div>
        <div className="text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${
            isLoggedIn ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoggedIn}
        >
          {isLoggedIn ? "Logging In..." : "Login"}
        </button>
        <p className="text-center text-sm text-gray-600 mt-2">
          Create New Account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
