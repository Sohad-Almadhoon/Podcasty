import { signInWithGoogle } from "@/app/lib/auth";

const LoginButton = () => {

  return (
    <form action={signInWithGoogle}>
      <button className="flex items-center justify-center w-full text-3xl  text-white bg-purple-600 rounded-lg px-10 py-4">
        Login with Google
      </button>
    </form>
  );
};

export default LoginButton;
