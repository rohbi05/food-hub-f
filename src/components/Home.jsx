// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import { FiUser, FiShoppingBag, FiClipboard, FiShield, FiBell, FiTruck, FiCheckCircle } from "react-icons/fi";
import { useSignup } from "../context/signupContext";

export default function Home() {
  const navigate = useNavigate();
  const { setRole } = useSignup();

  const handleRoleSelect = (role) => {
    setRole(role); // ✅ just set role
    navigate("/signup"); // ✅ always go to common signup
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ─── Navbar ─── */}
      <nav className="fixed w-full bg-white border-b border-gray-100 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-[#f0b100] rounded-lg flex items-center justify-center">
              <FiShoppingBag className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-gray-800">Atlancis Foodhub</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => navigate('/login')}
              className="text-gray-600 hover:text-[#f0b100] font-medium px-3 py-1.5 transition-colors"
            >
              Login
            </button>
            <div className="flex space-x-3">
              <button 
                onClick={() => handleRoleSelect("customer")}
                className="px-4 py-2 border border-[#f0b100] text-[#f0b100] font-medium rounded hover:bg-[#fff3cc] transition-colors"
              >
                Join as Employee
              </button>
              <button 
                onClick={() => handleRoleSelect("retailer")}
                className="px-4 py-2 bg-[#f0b100] text-white font-medium rounded hover:bg-[#d89f00] transition-colors"
              >
                Register Retailer
              </button>
            </div>
          </div>
          <button className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-[#fff3cc] to-white">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-16 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Atlancis Internal<br />
              <span className="text-[#f0b100]">Food Delivery System</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-lg">
              Exclusive platform for Atlancis employees to order meals from approved vendors. 
              Retailers can manage menus and orders after verification.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => handleRoleSelect("customer")}
                className="px-6 py-3.5 bg-[#f0b100] text-white font-medium rounded-lg shadow-sm hover:bg-[#d89f00] transition-colors flex items-center"
              >
                <FiUser className="mr-2" /> Employee Sign Up
              </button>
              <button
                onClick={() => handleRoleSelect("retailer")}
                className="px-6 py-3.5 bg-white border border-[#f0b100] text-[#f0b100] font-medium rounded-lg shadow-sm hover:bg-[#fff3cc] transition-colors flex items-center"
              >
                <FiShoppingBag className="mr-2" /> Retailer Registration
              </button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative bg-white p-1 rounded-2xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Office food delivery"
                className="rounded-xl w-full"
              />
              <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-md flex items-center">
                <FiTruck className="text-[#f0b100] mr-2" />
                <span className="font-medium text-sm">Verified Retailers Only</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Retailer Verification ─── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Retailer Verification</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              All food vendors must complete our compliance process before serving Atlancis employees
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <FiClipboard className="text-2xl text-[#f0b100]" />,
                title: "Document Upload",
                description: "Submit Certificate of Good Conduct and Health Compliance Certificate"
              },
              {
                icon: <FiShield className="text-2xl text-[#f0b100]" />,
                title: "Admin Review",
                description: "Atlancis team verifies your documents (1-2 business days)"
              },
              {
                icon: <FiCheckCircle className="text-2xl text-[#f0b100]" />,
                title: "Approval",
                description: "Start uploading your menu and receiving orders"
              }
            ].map((step, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-[#fff3cc] rounded-full flex items-center justify-center mb-5">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-16 bg-[#f0b100] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the Atlancis internal food delivery system today
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => handleRoleSelect("customer")}
              className="px-8 py-3.5 bg-white text-[#f0b100] font-medium rounded-lg shadow-md hover:bg-gray-100 transition-colors"
            >
              I'm an Employee
            </button>
            <button
              onClick={() => handleRoleSelect("retailer")}
              className="px-8 py-3.5 bg-[#d89f00] text-white font-medium rounded-lg shadow-md hover:bg-[#b37e00] transition-colors"
            >
              I'm a Retailer
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#f0b100] rounded-lg flex items-center justify-center">
                  <FiShoppingBag className="text-white" />
                </div>
                <span className="text-xl font-bold">Atlancis Foodhub</span>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Atlancis Internal System. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
