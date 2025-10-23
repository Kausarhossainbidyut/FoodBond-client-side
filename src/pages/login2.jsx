import Lottie from "lottie-react";
import { useContext } from "react";
import { BiEnvelope, BiKey } from "react-icons/bi";
import Social from "../components/Social";
import Title from "../components/Title";
import { AuthContext } from "../providers/AuthProvider";

import { useLocation, useNavigate } from "react-router";
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
        Swal.fire({
          title: "Success!",
          text: "Login successful",
          icon: "success",
          confirmButtonColor: "#16a34a",
        });
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((err) => {
        console.log(err.code); // Debugging এর জন্য error.code দেখো
        if (err.code === "auth/user-not-found") {
          Swal.fire({
            title: "User Not Found",
            text: "This email is not registered. Please go for Register.",
            icon: "error",
            confirmButtonColor: "#dc2626",
          });
        } else if (err.code === "auth/wrong-password") {
          Swal.fire({
            title: "Login Failed",
            text: "Email or password is incorrect",
            icon: "error",
            confirmButtonColor: "#dc2626",
          });
        } else if (err.code === "auth/invalid-credential") {
          Swal.fire({
            title: "Login Failed",
            text: "Invalid login credentials. Try again or register first.",
            icon: "error",
            confirmButtonColor: "#dc2626",
          });
        } else {
          Swal.fire({
            title: "Login Failed",
            text: err.message,
            icon: "error",
            confirmButtonColor: "#dc2626",
          });
        }
      });

  };

  return (
    <div className=" bg-contain">
      <div className="bg-white bg-opacity-90 min-h-screen">
        <div className="w-11/12 mx-auto py-10 m-5 p-5">
          <div className="title mt-5">
            <Title>Login Now</Title>
          </div>

          <div className="flex justify-between items-center gap-5 pt-8">
            <div className="login-for flex-1">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-5 flex flex-col gap-8 backdrop-blur-sm bg-opacity-10 shadow-lg rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex justify-start items-center">
                  <BiEnvelope className="text-3xl text-green-600" />
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-green-500 transition-all duration-200"
                    type="email"
                    name="email"
                    placeholder="enter email"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-start items-center">
                    <BiKey className="text-3xl text-green-600" />
                    <input
                      className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-green-500 transition-all duration-200"
                      type="password"
                      name="pass"
                      placeholder="enter Password"
                      required
                    />
                  </div>
                  <p className="text-end text-[13px] text-slate-500 hover:text-green-600 transition-colors duration-300">forgot password?</p>
                </div>

                <div className="p-1 flex gap-3 -mt-4">
                  <input type="checkbox" name="remember me" className="text-green-600 focus:ring-green-500" />
                  Remember Me
                </div>

                <input type="submit" value="Login Now" className="btn cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg" />
              </form>
            </div>

            <Social />

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