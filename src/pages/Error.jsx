import { useRouteError } from "react-router";
import Header from "../components/Header";
import { NavLink } from 'react-router';

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <Header></Header>
      <div className='flex justify-center items-center mt-[50px] '>
        <div>
          <div>
            <img className='w-[600px] h-[400px] rounded-2xl' src="https://i.ibb.co.com/8ncBh8YS/images.png" alt="error image" />
          </div>
          <div className='text-center'>
            <NavLink to={'/'} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl bg-[#a8de57] hover:bg-[#7bbd19] text-blue-700 hover:text-blue-100 font-bold rounded-2xl underline mt-[30px]">Go Home</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
