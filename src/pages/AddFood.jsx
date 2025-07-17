import React from 'react';

const AddFood = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const quantity = parseInt(formData.get("quantity"));
    if (quantity < 1) {
      alert("❗ Quantity must be at least 1");
      return;
    }

    console.log("Food Name:", formData.get("foodName"));
    console.log("Image URL:", formData.get("foodImage"));
    console.log("Quantity:", quantity);
    console.log("Expiration Date:", formData.get("expirationDate"));
    console.log("Pickup Location:", formData.get("location"));
    console.log("Notes:", formData.get("notes"));
    // TODO: Add your submission logic here
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          🍽️ Share Surplus Food
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Food Name
          </label>
          <input
            type="text"
            name="foodName"
            placeholder="e.g., Vegetable Soup"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Food Image URL
          </label>
          <input
            type="url"
            name="foodImage"
            placeholder="Enter food image url..."
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              min="1"
              placeholder="Give here quantity of food.."
              className="w-full border rounded-lg px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiration Date
            </label>
            <input
              type="date"
              name="expirationDate"
              className="w-full border rounded-lg px-3 py-2 text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Location
          </label>
          <input
            type="text"
            name="location"
            placeholder="e.g., 123 Main St."
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            placeholder="Optional notes"
            rows="2"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 text-sm font-medium"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
