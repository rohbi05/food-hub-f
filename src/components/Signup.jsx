import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/authContext.jsx';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer"
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const { signup } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Signup submitted:", formData);
    try {
      await signup(
        formData.username,
        formData.email,
        formData.password,
        formData.role
      );
      if (formData.role === "retailer") {
        navigate("/dashboard/retailer");
      } else {
        navigate("/dashboard/customer");
      }
      } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center">
      <div className="bg-yellow-50 bg-opacity-90 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-yellow-800 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-3 rounded border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 rounded border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 rounded border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-3 rounded border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            required
          />

          <div className="flex justify-around items-center text-sm font-medium text-yellow-800">
            <label>
              <input
                type="radio"
                name="role"
                value="customer"
                checked={formData.role === "customer"}
                onChange={handleChange}
                className="mr-2"
              />
              Customer
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="retailer"
                checked={formData.role === "retailer"}
                onChange={handleChange}
                className="mr-2"
              />
              Retailer
            </label>
          </div>

          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded w-full transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-yellow-700 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold hover:text-yellow-900">
            Log in
          </Link>
        </p>

        {/* <p className="text-center text-xs text-yellow-600 mt-2">
          <Link to="//PasswordResetRequest" className="hover:underline">
            Forgot Password?
          </Link>
        </p> */}
      </div>
    </div>
  );
}

export default Signup;
