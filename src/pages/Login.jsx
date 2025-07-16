import Lottie from "lottie-react";
import { useContext } from "react";
import { BiEnvelope, BiKey } from "react-icons/bi";
import Social from "../components/Social";
import Title from "../components/Title";
import { AuthContext } from "../providers/AuthProvider";

import { Link, useLocation, useNavigate } from "react-router";
import loginAnimation from "../assets/loginAnimation.json";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.pass.value;

    signIn(email, pass)
      .then((res) => {
        Swal.fire("Success!", "Login successful", "success");
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((err) => {
        console.log(err.code); // Debugging এর জন্য error.code দেখো
        if (err.code === "auth/user-not-found") {
          Swal.fire("User Not Found", "This email is not registered. Please go for Register.", "error");

        } else if (err.code === "auth/wrong-password") {
          Swal.fire("Login Failed", "Email or password is incorrect", "error");

        } else if (err.code === "auth/invalid-credential") {
          Swal.fire("Login Failed", "Invalid login credentials. Try again or register first.", "error");
        } 
        else {
          Swal.fire("Login Failed", err.message, "error");
        }
      });

  };

  return (
    <div className="bg-[url(/bg.png)] bg-contain">
      <div className="bg-white bg-opacity-90 min-h-screen">
        <div className="w-11/12 mx-auto py-10 m-5 p-5">
          <div className="title mt-5">
            <Title>Login Now</Title>
          </div>

          <div className="flex justify-between items-center gap-5 pt-8">
            <div className="login-for flex-1">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-5 flex flex-col gap-8 backdrop-blur-sm bg-opacity-10 shadow-lg rounded-lg"
              >
                <div className="flex justify-start items-center">
                  <BiEnvelope className="text-3xl text-slate-500" />
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200"
                    type="email"
                    name="email"
                    placeholder="enter email"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-start items-center">
                    <BiKey className="text-3xl text-slate-500" />
                    <input
                      className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200"
                      type="password"
                      name="pass"
                      placeholder="enter Password"
                      required
                    />
                  </div>
                  <p className="text-end text-[13px] text-slate-500">forgot password?</p>
                </div>

                <div className="p-1 flex gap-3 -mt-4">
                  <input type="checkbox" name="remember me" />
                  Remember Me
                </div>

                <input
                  type="submit"
                  value="Login Now"
                  className="cursor-pointer bg-[#E53935] hover:bg-[#D32F2F] text-white font-semibold py-2 px-4 rounded transition-all duration-300"
                />

                
              </form>
              <p className='border-t-black text-center border-t-2 pt-[10px]'>New to this site? Please <Link to={'/registration'} className='text-blue-400 underline' >Regestar</Link> </p>
               <Social />
            </div>

           

            <div className="lottie flex-1 mx-20">
              <Lottie animationData={loginAnimation} loop={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
