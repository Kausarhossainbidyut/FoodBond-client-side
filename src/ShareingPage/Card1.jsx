import React from "react";

const Card1 = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Featured Foods</h1>
        <p className="text-center text-gray-600 mb-10">
          Freshly added and abundant meals waiting for you.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-md relative w-full max-w-sm p-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full">
              Qty: 30
            </span>
            <img
              src="https://via.placeholder.com/400x200?text=Canned+Goods"
              alt="Canned Goods"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold mb-1">Canned Goods Assortment</h2>
            <div className="text-sm text-gray-700 mb-1">👤 Frank Black</div>
            <div className="text-sm text-gray-700 mb-1">📍 City Food Bank</div>
            <div className="text-sm text-gray-700 mb-2">⏰ Expires: 1/1/2026</div>
            <p className="text-sm text-gray-600 mb-4">
              Various canned vegetables, fruits, and soups. Long shelf life.
            </p>
            <button className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700 transition">
              View Details
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-md relative w-full max-w-sm p-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full">
              Qty: 25
            </span>
            <img
              src="https://via.placeholder.com/400x200?text=Cookies"
              alt="Cookies"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold mb-1">Chocolate Chip Cookies</h2>
            <div className="text-sm text-gray-700 mb-1">👤 Alice Johnson</div>
            <div className="text-sm text-gray-700 mb-1">📍 Downtown Community Center</div>
            <div className="text-sm text-gray-700 mb-2">⏰ Expires: 7/22/2025</div>
            <p className="text-sm text-gray-600 mb-4">
              Classic homemade cookies, baked with love. Contains nuts.
            </p>
            <button className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700 transition">
              View Details
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-md relative w-full max-w-sm p-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full">
              Qty: 20
            </span>
            <img
              src="https://via.placeholder.com/400x200?text=Bread"
              alt="Bread"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold mb-1">Artisan Bread Loaves</h2>
            <div className="text-sm text-gray-700 mb-1">👤 Bob Williams</div>
            <div className="text-sm text-gray-700 mb-1">📍 Maple Street Bakery</div>
            <div className="text-sm text-gray-700 mb-2">⏰ Expires: 7/18/2025</div>
            <p className="text-sm text-gray-600 mb-4">
              Freshly baked sourdough and whole wheat loaves. No preservatives.
            </p>
            <button className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700 transition">
              View Details
            </button>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl shadow-md relative w-full max-w-sm p-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full">
              Qty: 15
            </span>
            <img
              src="https://via.placeholder.com/400x200?text=Salad"
              alt="Salad"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold mb-1">Fresh Garden Salad</h2>
            <div className="text-sm text-gray-700 mb-1">👤 Alice Johnson</div>
            <div className="text-sm text-gray-700 mb-1">📍 Downtown Community Center</div>
            <div className="text-sm text-gray-700 mb-2">⏰ Expires: 7/15/2025</div>
            <p className="text-sm text-gray-600 mb-4">
              Mixed greens with cherry tomatoes, cucumbers, and a light vinaigrette.
            </p>
            <button className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700 transition">
              View Details
            </button>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-xl shadow-md relative w-full max-w-sm p-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full">
              Qty: 12
            </span>
            <img
              src="https://via.placeholder.com/400x200?text=Lasagna"
              alt="Lasagna"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold mb-1">Homemade Lasagna</h2>
            <div className="text-sm text-gray-700 mb-1">👤 John Doe</div>
            <div className="text-sm text-gray-700 mb-1">📍 Maple Street Bakery</div>
            <div className="text-sm text-gray-700 mb-2">⏰ Expires: 7/18/2025</div>
            <p className="text-sm text-gray-600 mb-4">
              Rich and cheesy beef lasagna. Comes in single-serving containers.
            </p>
            <button className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700 transition">
              View Details
            </button>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-xl shadow-md relative w-full max-w-sm p-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full">
              Qty: 10
            </span>
            <img
              src="https://via.placeholder.com/400x200?text=Lentil+Soup"
              alt="Lentil Soup"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold mb-1">Vegan Lentil Soup</h2>
            <div className="text-sm text-gray-700 mb-1">👤 Carol White</div>
            <div className="text-sm text-gray-700 mb-1">📍 Green Earth Cafe</div>
            <div className="text-sm text-gray-700 mb-2">⏰ Expires: 7/21/2026</div>
            <p className="text-sm text-gray-600 mb-4">
              Nutritious soup made with organic lentils and vegetables. Gluten-free.
            </p>
            <button className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700 transition">
              View Details
            </button>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">
            Show All Foods
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card1;
