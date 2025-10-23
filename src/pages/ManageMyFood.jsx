import React, { useContext } from 'react';
import Card1 from '../ShareingPage/Card1';
import { FaPlusCircle, FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useMyManagedFoods, useDeleteFood } from '../hooks/useFoods';
import LoadingSpinner from '../components/LoadingSpinner';

const ManageFoods = () => {
  const { user } = useContext(AuthContext);
  const { data: foods = [], isLoading, isError, error } = useMyManagedFoods(user?.accessToken);
  const deleteFood = useDeleteFood();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      deleteFood.mutate(id, {
        onSuccess: () => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Food has been deleted.',
            icon: 'success',
            confirmButtonColor: '#16a34a',
          });
        },
        onError: (error) => {
          console.error("Delete error:", error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to delete food.',
            icon: 'error',
            confirmButtonColor: '#dc2626',
          });
        }
      });
    }
  };

  // Add handleDelete to food objects for Card1 component
  const foodsWithDelete = foods.map(food => ({
    ...food,
    handleDelete: () => handleDelete(food._id)
  }));

  if (isLoading) {
    return <LoadingSpinner size="large" message="Loading your foods..." />;
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-6 rounded-lg shadow-sm max-w-md border border-gray-200 transition-all duration-300 hover:shadow-lg">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaUtensils className="text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Error Loading Foods</h3>
          <p className="text-gray-600 text-sm mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 transition-colors duration-300 hover:text-green-600">
              Manage My Foods
            </h1>
            <p className="text-gray-600 text-sm mt-1">View, edit, or delete your shared food items</p>
          </div>
          <Link to={'/dashboard/add-food'}>
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              <FaPlusCircle size={16} />
              <span>Add New Food</span>
            </button>
          </Link>
        </div>

        {foods.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200 transition-all duration-300 hover:shadow-lg">
            <div className="mb-6">
              <div className="inline-block p-4 bg-green-100 rounded-full">
                <FaPlusCircle className="text-green-600 text-4xl" />
              </div>
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">No food items yet</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
              Start sharing by adding your first food item and make a difference!
            </p>
            <Link to="/dashboard/add-food" className="inline-block">
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                <FaUtensils size={16} />
                Add First Food Item
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {foodsWithDelete.map(food => (
              <Card1 food={food} key={food._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageFoods;