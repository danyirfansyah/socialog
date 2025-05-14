"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signOut } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

export default function ProfileForm({ session }: { session: any }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      toast({
        title: "Profil diperbarui",
        description: "Anda akan keluar dalam 3 detik.",
      });

      setTimeout(async () => {
        await signOut(); // Logs out after toast shows
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Gagal memperbarui profil",
        description: "Silakan coba lagi.",
      });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <div>
        <Label htmlFor="name">Name</Label>
        {editing ? (
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <p className="text-gray-800">{session?.user?.name}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        {editing ? (
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <p className="text-gray-800">{session?.user?.email}</p>
        )}
      </div>

      {editing ? (
        <div className="flex gap-4">
          <Button onClick={handleSave}>Save</Button>
          <Button variant="secondary" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button onClick={() => setEditing(true)}>Edit Profile</Button>
      )}
    </div>
  );
}
