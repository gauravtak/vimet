import { LoginForm } from "../components/login/LoginForm";
import { useNavigate } from "react-router";
import signupImage from "../assets/signup.jpg";

export default function Login() {
  const navigate = useNavigate();
  const gotoSignupPage = () => {
    navigate("/signup");
  };
  return (
    <div className="flex h-screen w-full">
      {/* LEFT: Just empty or image (if you add later) */}
      <div
        className="w-1/2 h-full flex items-center justify-center p-10"
        style={{
          background: "linear-gradient(135deg, #f3edf7 0%, #f5eff4 100%)",
        }}
      >
        {/* Centered container */}
        <div className="flex flex-col items-center w-full max-w-lg gap-6">
          <LoginForm />

          <p className="text-sm text-center text-[#5c3a92]">
            Don't have an account?{" "}
            <span
              onClick={gotoSignupPage}
              className="cursor-pointer text-[#452c6d] hover:text-[#5c3a92]"
            >
              Signup
            </span>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (if needed for an image or artwork) */}
      <div className="w-1/2 h-full">
        <img
          src={signupImage}
          alt="login"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
