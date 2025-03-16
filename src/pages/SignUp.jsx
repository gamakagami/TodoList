import FloatingBalls from "../components/FloatingBalls";
import AuthForm from "../components/AuthForm";

export default function SignUp() {
  return (
    <div className="relative bg-[#3d3e6e] min-h-screen text-white flex flex-col items-center justify-center px-6 overflow-hidden">
      <FloatingBalls />
      <AuthForm type="signup" />
    </div>
  );
}