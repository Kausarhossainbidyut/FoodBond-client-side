import React, { useEffect, useState, useContext } from 'react';
import Card2 from '../ShareingPage/Card2';
import { FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';    // <-- import করলাম

const ManageFoods = () => {
    const { user } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        fetchFoods();
    }, [user]);

    const fetchFoods = () => {
        if (!user || !user.getIdToken) return;  // getIdToken আছে কি চেক

        user.getIdToken().then(token => {
            axios.get(`http://localhost:5000/manage-my-food`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                setFoods(res.data);
            }).catch(err => {
                console.error("Fetch error:", err);
                Swal.fire('Error', 'Failed to fetch foods.', 'error');
            });
        });
    };


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
            try {
                const token = await user.getIdToken();

                const res = await axios.delete(`http://localhost:5000/manage-my-food/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.data.deletedCount > 0) {
                    setFoods(foods.filter(food => food._id !== id));

                    Swal.fire(
                        'Deleted!',
                        'Food has been deleted.',
                        'success'
                    );
                } else {
                    Swal.fire('Error', 'Food could not be deleted.', 'error');
                }
            } catch (error) {
                console.error("Delete error:", error);
                Swal.fire('Error', 'Failed to delete food.', 'error');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 px-4 py-6">
            <div className="px-5 mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage My Foods</h1>
                    <Link to={'/add-food'}>
                        <button className="flex items-center gap-1 sm:gap-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm sm:text-base py-2 px-3 sm:px-4 rounded-lg transition">
                            <FaPlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Add New Food</span>
                        </button>
                    </Link>
                </div>

                <p className="text-gray-600 mb-6">View, edit, or delete your shared food items.</p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {foods.map(food => (
                        <Card2
                            food={food}
                            key={food._id}
                            handleDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageFoods;
