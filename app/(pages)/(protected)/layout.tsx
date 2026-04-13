import { NavbarComponent } from "../../components/navbar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <NavbarComponent />
      <main className="pt-20">{children}</main>
    </div>
  );
}
