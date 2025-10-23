import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Social = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate()

   const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: "Congratulation!",
                    text: "Login Successful!",
                    icon: "success",
                    confirmButtonColor: "#16a34a",
                });
                navigate('/')

            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: "Error!",
                    text: "Login Failed!",
                    icon: "error",
                    confirmButtonColor: "#dc2626",
                });

            })
    }

  return (
    <div className="bg-white shadow py-3 rounded-full flex flex-col items-center transition-all duration-300 hover:shadow-lg">
      <div>
        <img
          onClick={handleGoogleLogin}
          className="w-[64px] cursor-pointer transition-transform duration-300 hover:scale-110"
          src="https://img.icons8.com/?size=96&id=17949&format=png"
          alt="Google Login"
        />
      </div>
    </div>
  );
};

export default Social;