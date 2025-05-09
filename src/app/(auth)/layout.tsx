export default function AuthLayout({ children }: {
    readonly children: React.ReactNode
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen font-afacad bg-[#F5F5F5]">
            {children}
        </div>
    );
}