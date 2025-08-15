export default function CustomerForm({ formData, setCustomer, handleChange }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return alert('Name and phone are required');
    setCustomer(formData);
  };

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-10"></div>
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-lg font-bold mb-4 text-center">Enter Your Details</h2>
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            className="border p-2 rounded w-full mb-3"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input 
            type="tel" 
            name="phone" 
            placeholder="Phone Number" 
            className="border p-2 rounded w-full mb-3"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input 
            type="file" 
            name="image" 
            accept="image/*" 
            className="w-full mb-4"
            onChange={handleChange}
          />
          <button 
            type="submit" 
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
