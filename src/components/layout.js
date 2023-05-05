import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            className="bg-white p-2 px-4 rounded-md"
            onClick={() => signIn("google")}
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-blue-900 min-h-screen flex">
      <div>
        <Nav />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
      <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
        {/* Logged in {session.user.email} */}
        { children }
      </div>
    </div>
  );
}
