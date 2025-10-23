import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { BiEnvelope, BiKey, BiShow, BiHide } from "react-icons/bi";
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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        console.log(err.code);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left side - Illustration */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="w-full max-w-sm">
                <Lottie animationData={loginAnimation} loop={true} />
              </div>
            </div>

            {/* Right side - Login Form */}
            <div className="lg:w-1/2 w-full max-w-md">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="bg-green-600 p-2 rounded-lg">
                      <BiEnvelope className="text-white text-xl" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
                  </div>
                  <p className="text-gray-600">Sign in to your FoodBond account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BiEnvelope className="text-green-600" size={18} />
                      </div>
                      <input
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BiKey className="text-green-600" size={18} />
                      </div>
                      <input
                        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                        type={showPassword ? "text" : "password"}
                        name="pass"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <BiHide className="text-gray-400 hover:text-green-600" size={18} />
                        ) : (
                          <BiShow className="text-gray-400 hover:text-green-600" size={18} />
                        )}
                      </button>
                    </div>
                    <p className="text-right text-xs text-gray-500 mt-1">
                      <a href="#" className="hover:text-green-600 transition-colors">
                        Forgot password?
                      </a>
                    </p>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Signing In...
                      </span>
                    ) : (
                      "Login to Your Account"
                    )}
                  </button>

                  <div className="border-t border-gray-200 pt-5">
                    <p className="text-center text-gray-600 text-sm">
                      New to FoodBond?{" "}
                      <Link
                        to="/registration"
                        className="text-green-600 hover:text-green-700 font-medium transition-colors"
                      >
                        Create an Account
                      </Link>
                    </p>
                  </div>
                </form>

                <div className="mt-6">
                  <Social />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;