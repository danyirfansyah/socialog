"use client";

import Link from "next/link";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";

export function SigninForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.ok) {
      router.push("/dashboard");
      toast.success("Login Berhasil");
    } else if (res?.error) {
      setError("Invalid credentials");
      setPending(false);
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardHeader className="flex flex-col items-center justify-center space-y-1">
            <CardTitle className="text-3xl font-bold">
              Selamat Datang Kembali
            </CardTitle>
            <CardDescription>
              Masuk untuk melanjutkan pembelajaran interaktif Anda
            </CardDescription>
          </CardHeader>
          {!!error && (
            <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-4">
              <TriangleAlert />
              <p>{error}</p>
            </div>
          )}
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="username or email"
                  className="pr-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={pending}
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                  {/* Replace with your icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12H8m0 0l4-4m-4 4l4 4"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                disabled={pending}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button className="w-full" disabled={pending}>
              Sign In
            </button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Belum punya akun?
          <Link className="underline ml-2" href="signup">
            Daftar Sekarang
          </Link>
        </div>
      </form>
    </div>
  );
}
