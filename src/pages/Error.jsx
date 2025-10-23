import { useRouteError } from "react-router";
import Header from "../components/Header";
import { NavLink } from 'react-router';

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <Header></Header>
      <div className='flex justify-center items-center mt-[50px]'>
        <div>
          <div>
            <img className='w-[600px] h-[400px] rounded-2xl shadow-lg' src="https://i.ibb.co.com/8ncBh8YS/images.png" alt="error image" />
          </div>
          <div className='text-center'>
            <NavLink to={'/'} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl underline mt-[30px] transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg">
              Go Home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;