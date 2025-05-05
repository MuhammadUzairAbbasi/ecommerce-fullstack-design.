import { useState } from "react";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthStore } from "../../store/AuthStore"; // Adjust path as needed

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { SignUp, isSigningUp } = AuthStore();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password length must be greater than 6");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords does not Match");
      return;
    }
    const success = await SignUp({ name, email, password });
    if (success) {
      if (user.role == "user") {
        navigate("/");
      } else if (user.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/login");
      } // Redirect to home or dashboard after successful signup
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={isSigningUp}
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={isSigningUp}
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
            disabled={isSigningUp}
          />
        </div>
        <div>
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={isSigningUp}
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${
            isSigningUp ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSigningUp}
        >
          {isSigningUp ? "Signing Up..." : "Sign Up"}
        </button>
        <p className="text-center text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500 hover:text-blue-700">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
