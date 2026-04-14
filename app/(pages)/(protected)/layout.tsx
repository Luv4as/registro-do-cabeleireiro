import { NavbarComponent } from "../../components/navbar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full justify-center items-center px-20 py-5">
      <NavbarComponent />
      <main className="pt-20">{children}</main>
    </div>
  );
}
