// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/authContext.jsx';

export default function Home() {
  const navbarHeight = "60px";
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowLogin(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login(formData.username, formData.password);
      console.log("Login successful:", response);
      if (response.user.role === 'retailer') {
      navigate('/dashboard/retailer');
      }
      else if (response.user.role === 'customer') {
        navigate('/dashboard/customer');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  

  return (
    <div
      className="h-screen overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(to right, #facc15 50%, white 50%)",
      }}
    >
      {/* ───── Navbar ───── */}
      <header
        style={{ height: navbarHeight }}
        className="fixed top-0 inset-x-0 bg-gray-100 flex items-center justify-between px-6 shadow z-20"
      >
        <h2 className="font-extrabold text-yellow-600 tracking-wide text-lg">
          Atlancis Food Hub
        </h2>
      </header>

      {/* ───── Landing ───── */}
      <main style={{ paddingTop: navbarHeight }} className="flex flex-1">
        {/* Yellow Side */}
        <div className="w-1/2 flex flex-col justify-start pl-12 pt-24">
          <h1 className="text-6xl font-extrabold leading-tight drop-shadow text-gray-900 tracking-tight">
            Atlancis <br /> Food Hub.
          </h1>
        </div>

        {/* White Side Image */}
        <div className="w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=1200&q=80"
            alt="Delicious food"
            className="w-full h-full object-cover"
          />
        </div>
      </main>

      {/* ───── Login Overlay ───── */}
      {showLogin && (
        <>
          {/* Dimmer (less blur) */}
          <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] animate-fade-in z-30" />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-40 animate-fade-in-up">
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl shadow-2xl p-10 w-full max-w-md">
              <h2 className="text-2xl font-extrabold text-center text-yellow-700 mb-6">
                Welcome Back
              </h2>
              {error && <div className="error-message">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  placeholder="Username"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-yellow-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-yellow-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 font-semibold transition duration-300"
                >
                  Login
                </button>
              </form>
              <p className="mt-4 text-center text-sm text-yellow-800">
                Don’t have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="font-semibold text-yellow-700 cursor-pointer hover:text-yellow-900"
                >
                  Sign up
                </span><br></br>
                <span
                  onClick={() => navigate("/PasswordResetRequest")}
                  className="font-semibold text-yellow-700 cursor-pointer hover:text-yellow-900"
                >
                  Forgot password?
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
