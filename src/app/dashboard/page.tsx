import Navbar from "@/components/navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-lg">Welcome to your dashboard!</p>
      </main>
    </>
  );
}
