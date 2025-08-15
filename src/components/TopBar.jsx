export default function TopBar({ customer, setView }) {
  return (
    <div className="flex justify-between items-center bg-yellow-200 p-4 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-yellow-900">Customer Dashboard</h1>
      {customer && (
        <button 
          onClick={() => setView('profile')} 
          className="text-yellow-800 font-semibold hover:underline"
        >
          {customer.name}
        </button>
      )}
    </div>
  );
}
