import Lottie from "lottie-react";
import { useContext } from "react";
import { BiEnvelope, BiImageAdd, BiKey, BiUser } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import happy from "../assets/happy.json";
import Social from "../components/Social";
import Title from "../components/Title";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const goTo = useNavigate();
  const { createUser, setUser, updateUser } = useContext(AuthContext);

  const isValidPassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUpperCase) {
      Swal.fire("Error", "Password must have an uppercase letter", "error");
      return false;
    }
    if (!hasLowerCase) {
      Swal.fire("Error", "Password must have a lowercase letter", "error");
      return false;
    }
    if (!isLongEnough) {
      Swal.fire("Error", "Password must be at least 6 characters", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const email = form.email.value;
    const pass = form.pass.value;

    if (!isValidPassword(pass)) return;

    createUser(email, pass)
      .then((res) => {
        updateUser({ displayName: name, photoURL: image }).then(() => {
          setUser({ ...res.user, displayName: name, photoURL: image });

          Swal.fire("Success", "Registered successfully!", "success").then(() => {
            goTo(`${location.state ? location.state : "/"}`);
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
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          });
        } else {
          Swal.fire("Registration Failed", err.message, "error");
        }
      });
  };

  return (
    <div className="bg-[url(/bg.png)] bg-contain">
      <div className="bg-white bg-opacity-90 min-h-screen">
        <div className="w-11/12 mx-auto py-10">
          <div className="title mt-5">
            <Title>Join with Us</Title>
          </div>

          <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-10 pt-8">
            {/* Form Area */}
            <div className="w-full lg:w-1/2">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-5 flex flex-col gap-8 backdrop-blur-sm bg-opacity-10 shadow-lg rounded-lg"
              >
                <div className="flex items-center">
                  <BiUser className="text-3xl text-slate-500" />
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200"
                    type="text"
                    name="name"
                    placeholder="Enter Full Name"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <BiImageAdd className="text-3xl text-slate-500" />
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200"
                    type="text"
                    name="image"
                    placeholder="Enter Image URL"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <BiEnvelope className="text-3xl text-slate-500" />
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <BiKey className="text-3xl text-slate-500" />
                  <input
                    className="outline-none flex-1 border-b-2 p-2 bg-transparent focus:border-orange-400 transition-all duration-200"
                    type="password"
                    name="pass"
                    placeholder="Enter Password"
                    required
                  />
                </div>

                <input
                  type="submit"
                  value="Register Now"
                  className="bg-[#E53935] hover:bg-[#D32F2F] text-white font-semibold py-2 px-4 rounded transition duration-300"
                />

                <p className="text-center pt-2 text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:underline">
                    Login here
                  </Link>
                </p>
              </form>
              <Social />
            </div>

            {/* Lottie Animation */}
            <div className="w-full lg:w-1/2 max-w-md mx-auto">
              <Lottie animationData={happy} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
