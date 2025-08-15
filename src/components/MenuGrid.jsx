export default function MenuGrid({ menu, addToCart, cartCount, handleCheckout }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {menu.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img src={item.img} alt={item.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-gray-600">Ksh {item.price}</p>
              <button
                onClick={() => addToCart(item)}
                className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={handleCheckout}
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600"
        >
          Go to Checkout ({cartCount} items)
        </button>
      </div>
    </>
  );
}
