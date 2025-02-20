import { signOut } from "@/app/lib/auth";


const LogoutButton = () => {

  return (
    <form action={signOut}>
      <button
        className="flex items-center justify-center w-full h-12 text-white bg-purple-600 rounded-lg">
       Logout
      </button>
    </form>
  );
};

export default LogoutButton;
