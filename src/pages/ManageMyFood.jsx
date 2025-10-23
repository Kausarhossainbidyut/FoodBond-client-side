import React, { useContext } from 'react';
import Card2 from '../ShareingPage/Card2';
import { FaPlusCircle, FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useMyManagedFoods, useDeleteFood } from '../hooks/useFoods';
import LoadingSpinner from '../components/LoadingSpinner';

const ManageFoods = () => {
  const { user } = useContext(AuthContext);
  const { data: foods = [], isLoading } = useMyManagedFoods(user?.accessToken);
  const deleteFood = useDeleteFood();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      deleteFood.mutate(id, {
        onSuccess: () => {
          Swal.fire('Deleted!', 'Food has been deleted.', 'success');
        },
        onError: (error) => {
          console.error("Delete error:", error);
          Swal.fire('Error', 'Failed to delete food.', 'error');
        }
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="large" message="Loading your foods..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
              Manage My Foods
            </h1>
            <p className="text-gray-600 mt-2 text-lg">View, edit, or delete your shared food items</p>
          </div>
          <Link to={'/add-food'}>
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg">
              <FaPlusCircle className="w-5 h-5" />
              <span>Add New Food</span>
            </button>
          </Link>
        </div>

        {foods.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-20 text-center border border-gray-200">
            <div className="mb-8">
              <div className="inline-block p-8 bg-gray-100 rounded-full">
                <FaPlusCircle className="text-gray-400 text-7xl" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No food items yet</h2>
            <p className="text-gray-600 text-xl mb-8 max-w-md mx-auto">
              Start sharing by adding your first food item and make a difference!
            </p>
            <Link to="/add-food" className="inline-block">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-xl transition-all transform hover:scale-105 shadow-lg">
                <span className="flex items-center gap-2">
                  <FaUtensils className="text-white" />
                  Add First Food Item
                </span>
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {foods.map(food => (
              <Card2
                food={food}
                key={food._id}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageFoods;