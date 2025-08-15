export default function CheckoutView({ cart, setView }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.map((item, idx) => (
        <div key={idx} className="flex justify-between border-b py-2">
          <span>{item.name}</span>
          <span>Ksh {item.price}</span>
        </div>
      ))}
      <div className="mt-4 font-bold">
        Total: Ksh {cart.reduce((sum, item) => sum + item.price, 0)}
      </div>
      <button
        onClick={() => alert("Checkout complete!")}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Confirm & Pay
      </button>
      <button
        onClick={() => setView('dashboard')}
        className="mt-4 ml-4 text-yellow-700 hover:underline"
      >
        ← Back
      </button>
    </div>
  );
}
