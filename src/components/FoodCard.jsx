import { useNavigate } from "react-router-dom";

const FoodCard = ({ food }) => {
  const navigate = useNavigate();
  return (
    <div className="shadow-xl rounded-lg relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <img
        className="hover:-mt-2 transition-all z-10 hover:-z-10 object-cover duration-300 rounded-lg"
        src={food?.strMealThumb}
        alt={food?.strMeal}
      />
      <div className="w-full h-full bg-opacity-60 duration-75 absolute inset-0 opacity-0 hover:opacity-100 p-2 gap-5 bg-black flex justify-center items-center flex-col">
        <p className="text-white text-center font-medium">{food?.strMeal}</p>
        <button
          onClick={() => navigate(`/recipie/${food._id}`)}
          className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          See This Recipe
        </button>
      </div>
    </div>
  );
};

export default FoodCard;