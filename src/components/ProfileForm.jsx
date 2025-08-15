export default function ProfileForm({ formData, handleChange, setCustomer, setView }) {
  const saveProfile = () => {
    setCustomer(formData);
    setView('dashboard');
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-xl shadow-md mt-6">
      <button onClick={() => setView('dashboard')} className="text-yellow-700 mb-4 hover:underline">
        ← Back to Dashboard
      </button>

      <input 
        type="text" 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        className="border p-2 rounded w-full mb-3"
      />
      <input 
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        className="border p-2 rounded w-full mb-3"
      />
      <input 
        type="file" 
        name="image" 
        accept="image/*" 
        onChange={handleChange} 
        className="w-full mb-4"
      />
      <button 
        onClick={saveProfile} 
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}
