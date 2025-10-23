import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { useReceivedFoodRequests, useUpdateRequestStatus } from '../hooks/useFoods';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaInbox, FaCheck, FaTimes, FaClipboardList } from 'react-icons/fa';

const MyReceivedRequests = () => {
  const { user } = useContext(AuthContext);
  const { data: requests = [], isLoading } = useReceivedFoodRequests(user?.accessToken);
  const updateRequestStatus = useUpdateRequestStatus();

  const handleUpdateStatus = (id, status) => {
    const statusText = status === 'accepted' ? 'accept' : status === 'rejected' ? 'reject' : 'complete';
    
    Swal.fire({
      title: `Confirm ${statusText}?`,
      text: `Are you sure you want to ${statusText} this request?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${statusText} it!`
    }).then((result) => {
      if (result.isConfirmed) {
        updateRequestStatus.mutate(
          { id, status, token: user.accessToken },
          {
            onSuccess: () => {
              Swal.fire(
                `${statusText.charAt(0).toUpperCase() + statusText.slice(1)}!`, 
                `The request has been ${statusText}ed.`, 
                "success"
              );
            },
            onError: (err) => {
              console.error(err);
              Swal.fire("Error!", `Could not ${statusText} the request.`, "error");
            }
          }
        );
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner size="large" message="Loading received requests..." />;
  }

  // Filter requests by status
  const pendingRequests = requests.filter(request => request.status === 'pending');
  const acceptedRequests = requests.filter(request => request.status === 'accepted');
  const rejectedRequests = requests.filter(request => request.status === 'rejected');
  const completedRequests = requests.filter(request => request.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 flex items-center gap-3">
            <FaInbox className="text-green-600" />
            Received Requests
          </h1>
          <p className="text-gray-600 text-lg">
            Manage requests for your shared food items
          </p>
        </div>
        
        {requests.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-16 text-center border border-gray-200">
            <div className="mb-6">
              <div className="inline-block p-6 bg-gray-100 rounded-full">
                <FaInbox className="text-gray-400 text-6xl" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No requests yet</h2>
            <p className="text-gray-600 text-lg mb-6">
              When someone requests your food, it will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Pending Requests */}
            {pendingRequests.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaClipboardList className="text-orange-600" />
                  Pending Requests ({pendingRequests.length})
                </h2>
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request._id} className="bg-white rounded-xl shadow p-5 border-l-4 border-orange-600">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800">{request.foodName}</h3>
                          <p className="text-gray-600">Requested by: {request.requesterEmail}</p>
                          <p className="text-gray-600">Quantity: {request.requestedQuantity} portion(s)</p>
                          <p className="text-sm text-gray-500">
                            Requested on: {new Date(request.requestDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateStatus(request._id, 'accepted')}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition"
                          >
                            <FaCheck /> Accept
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(request._id, 'rejected')}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition"
                          >
                            <FaTimes /> Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accepted Requests */}
            {acceptedRequests.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaCheck className="text-green-600" />
                  Accepted Requests ({acceptedRequests.length})
                </h2>
                <div className="space-y-4">
                  {acceptedRequests.map((request) => (
                    <div key={request._id} className="bg-white rounded-xl shadow p-5 border-l-4 border-green-600">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800">{request.foodName}</h3>
                          <p className="text-gray-600">Requested by: {request.requesterEmail}</p>
                          <p className="text-gray-600">Quantity: {request.requestedQuantity} portion(s)</p>
                          <p className="text-sm text-gray-500">
                            Accepted on: {new Date(request.requestDate).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleUpdateStatus(request._id, 'completed')}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
                        >
                          Mark as Completed
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rejected Requests */}
            {rejectedRequests.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaTimes className="text-red-600" />
                  Rejected Requests ({rejectedRequests.length})
                </h2>
                <div className="space-y-4">
                  {rejectedRequests.map((request) => (
                    <div key={request._id} className="bg-white rounded-xl shadow p-5 border-l-4 border-red-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{request.foodName}</h3>
                          <p className="text-gray-600">Requested by: {request.requesterEmail}</p>
                          <p className="text-gray-600">Quantity: {request.requestedQuantity} portion(s)</p>
                          <p className="text-sm text-gray-500">
                            Rejected on: {new Date(request.requestDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Requests */}
            {completedRequests.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaCheck className="text-blue-600" />
                  Completed Requests ({completedRequests.length})
                </h2>
                <div className="space-y-4">
                  {completedRequests.map((request) => (
                    <div key={request._id} className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{request.foodName}</h3>
                          <p className="text-gray-600">Requested by: {request.requesterEmail}</p>
                          <p className="text-gray-600">Quantity: {request.requestedQuantity} portion(s)</p>
                          <p className="text-sm text-gray-500">
                            Completed on: {new Date(request.requestDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReceivedRequests;