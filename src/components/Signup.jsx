import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import { useRetailer } from "../context/retailerContext.jsx";
import { useSignup } from "../context/signupContext.jsx";
import { useCustomer } from "../context/customerContext.jsx";
import vite from "../../src/assets/bg-snacks.png"

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { role } = useSignup();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: role,
    phone: "",
    image: null,
    restaurant_name: "",
    restaurant_address: "",
    restaurant_image: vite,
    restaurant_phone: "",
    restaurant_email: "",
    document_good_conduct: null,
    document_food_hygiene: null
  });

  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");

  const { signup } = useAuth();
  const { createRetailerProfile, setRetailerProfile } = useRetailer();
  const { createCustomerProfile, setCustomerProfile } = useCustomer();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Step 1: General Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await signup(
        formData.username,
        formData.email,
        formData.password,
        formData.role
      );

      setUserId(response.userId);
      setStep(2); // move to profile step
    } catch (err) {
      setError(err.message || "Signup failed.");
    }
  };

  // Step 2: Profile Creation
  const handleProfile = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (formData.role === "retailer") {
        const profile = await createRetailerProfile({
          userId,
          restaurant_name: formData.restaurant_name,
          restaurant_image: formData.restaurant_image,
          restaurant_address: formData.restaurant_address,
          restaurant_phone: formData.restaurant_phone,
          restaurant_email: formData.restaurant_email,
          document_good_conduct: formData.document_good_conduct,
          document_food_hygiene: formData.document_food_hygiene,
        });
        setRetailerProfile(profile);
        navigate("/dashboard/retailer");
      } else {
        const profile = await createCustomerProfile({
          userId,
          image: formData.image,
          phone: formData.phone,
        });
        setCustomerProfile(profile);
        navigate("/dashboard/customer");
      }
    } catch (err) {
      setError(err.message || "Profile creation failed.");
    }
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center">
      <div className="bg-yellow-50 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-yellow-800 mb-6">
          {step === 1 ? "Create an Account" : "Complete Your Profile"}
        </h2>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        {step === 1 && (
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full p-3 rounded border"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 rounded border"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-3 rounded border"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-full p-3 rounded border"
            />

            <button type="submit" className="bg-yellow-600 text-white py-2 px-4 rounded w-full">
              Sign Up
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleProfile} className="space-y-4">
            {formData.role === "customer" && (
              <>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full p-3 rounded border"
                />
                <input type="file" name="image" onChange={handleChange} />
              </>
            )}

            {formData.role === "retailer" && (
              <>
                <input
                  type="text"
                  name="restaurant_name"
                  value={formData.restaurant_name}
                  onChange={handleChange}
                  placeholder="Business Name"
                  required
                  className="w-full p-3 rounded border"
                />
                <input
                  type="text"
                  name="restaurant_address"
                  value={formData.restaurant_address}
                  onChange={handleChange}
                  placeholder="Business Address"
                  required
                  className="w-full p-3 rounded border"
                />
                <input
                  type="tel"
                  name="restaurant_phone"
                  value={formData.restaurant_phone}
                  onChange={handleChange}
                  placeholder="Business Phone"
                  required
                  className="w-full p-3 rounded border"
                />
                <input
                  type="email"
                  name="restaurant_email"
                  value={formData.restaurant_email}
                  onChange={handleChange}
                  placeholder="Business Email"
                  required
                  className="w-full p-3 rounded border"
                />
                <input type="file" name="restaurant_image" onChange={handleChange} />
                <input type="file" name="document_good_conduct" onChange={handleChange} />
                <input type="file" name="document_food_hygiene" onChange={handleChange} />
              </>
            )}

            <button type="submit" className="bg-yellow-600 text-white py-2 px-4 rounded w-full">
              Create Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Signup;
