import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const UserButton = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase() || "U";
  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/");
  };

  return (
    <nav>
      {session ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center justify-center w-full h-full cursor-pointer gap-2">
              <span>{session.user?.name}</span>
              <Avatar className="w-10 h-10 cursor-pointer">
                <AvatarImage
                  src={session?.user?.image || ""}
                  alt={session?.user?.name || "User"}
                />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => router.push("/profile")}
              className="cursor-pointer"
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/settings")}
              className="cursor-pointer"
            >
              Settings
            </DropdownMenuItem>
            {session.user?.role === "admin" && (
              <DropdownMenuItem
                onClick={() => router.push("/admin")}
                className="cursor-pointer"
              >
                Admin Panel
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => handleSignOut()}
              className="cursor-pointer"
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <button
            onClick={() => router.push("/login")}
            className="bg-[#1CA8C3] text-white font-semibold text-sm px-6 py-2 rounded-full shadow transition"
          >
            SIGN IN
          </button>
        </div>
      )}
    </nav>
  );
};

export default UserButton;
