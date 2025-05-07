"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileForm({ session }: { session: any }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");

  const handleSave = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      alert("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
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
