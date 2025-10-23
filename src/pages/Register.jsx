import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { BiEnvelope, BiImageAdd, BiKey, BiUser, BiShow, BiHide } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import happy from "../assets/happy.json";
import Social from "../components/Social";
import Title from "../components/Title";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidPassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUpperCase) {
      Swal.fire({
        title: "Error",
        text: "Password must have an uppercase letter",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
      return false;
    }
    if (!hasLowerCase) {
      Swal.fire({
        title: "Error",
        text: "Password must have a lowercase letter",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
      return false;
    }
    if (!isLongEnough) {
      Swal.fire({
        title: "Error",
        text: "Password must be at least 6 characters",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const email = form.email.value;
    const pass = form.pass.value;

    if (!isValidPassword(pass)) {
      setIsLoading(false);
      return;
    }

    createUser(email, pass)
      .then((res) => {
        updateUser({ displayName: name, photoURL: image })
          .then(() => {
            setUser({ ...res.user, displayName: name, photoURL: image });
            Swal.fire({
              title: "Success",
              text: "Registered successfully!",
              icon: "success",
              confirmButtonColor: "#16a34a",
            }).then(() => {
              navigate("/");
            });
          })
          .catch((err) => {
            console.error("Update profile error:", err);
            Swal.fire({
              title: "Profile Update Failed",
              text: "Your account was created but profile information could not be updated.",
              icon: "warning",
              confirmButtonColor: "#f59e0b",
            }).then(() => {
              navigate("/");
            });
          });
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          Swal.fire({
            title: "Already Registered",
            text: "This email is already registered. Please go to login.",
            icon: "warning",
            confirmButtonText: "Go to Login",
            confirmButtonColor: "#16a34a",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        } else {
          Swal.fire({
            title: "Registration Failed",
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
                <Lottie animationData={happy} loop={true} />
              </div>
            </div>

            {/* Right side - Registration Form */}
            <div className="lg:w-1/2 w-full max-w-md">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="bg-green-600 p-2 rounded-lg">
                      <BiUser className="text-white text-xl" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
                  </div>
                  <p className="text-gray-600">Join FoodBond to start sharing food</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BiUser className="text-green-600" size={18} />
                      </div>
                      <input
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Image URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BiImageAdd className="text-green-600" size={18} />
                      </div>
                      <input
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                        type="text"
                        name="image"
                        placeholder="Enter image URL"
                        required
                      />
                    </div>
                  </div>

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
                        placeholder="Create a password"
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
                    <p className="text-xs text-gray-500 mt-1">
                      Password must be at least 6 characters with uppercase and lowercase letters
                    </p>
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
                        Creating Account...
                      </span>
                    ) : (
                      "Create Your Account"
                    )}
                  </button>

                  <div className="border-t border-gray-200 pt-5">
                    <p className="text-center text-gray-600 text-sm">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-green-600 hover:text-green-700 font-medium transition-colors"
                      >
                        Sign In
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

export default Register;