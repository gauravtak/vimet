import { SignupForm } from "../components/signup/forms/SignupForm";
import { useNavigate } from "react-router";
import signupImage from "../assets/signup.jpg";

export default function Signup() {
  const navigate = useNavigate();
  const gotoLoginPage = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/2 h-full">
        <img
          src={signupImage}
          alt="signup"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="w-1/2 h-full flex items-center justify-center p-10"
        style={{
          background: "linear-gradient(135deg, #f3edf7 0%, #f5eff4 100%)",
        }}
      >
        {/* Centered column */}
        <div className="flex flex-col items-center w-full max-w-lg gap-6">
          {/* FORM */}
          <SignupForm />

          {/* FOOTER */}
          <p className="text-sm text-center text-[#5c3a92]">
            Already have an account?{" "}
            <span
              onClick={gotoLoginPage}
              className="cursor-pointer text-[#452c6d] hover:text-[#5c3a92]"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
