"use client"

import { Navbar, NavbarBrand, NavbarToggle } from "flowbite-react";
import Link from "next/link";
import { logout } from "../lib/api/service/auth";

export function NavbarComponent() {
  return (
    <Navbar fluid rounded className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <NavbarBrand as={Link} href="">
      </NavbarBrand>
      <NavbarToggle />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginLeft: 'auto', marginRight: 'auto' }}>
        <a href="/calendario" className="text-white hover:text-gray-300">Calendário</a>
        <a href="/clientes" className="text-white hover:text-gray-300">Clientes</a>
        <a href="/cadastro-admin" className="text-white hover:text-gray-300">Cadastro Admin</a>
      </div>
      <a href="/login" onClick={() => {logout()}} className="text-white hover:text-gray-300">Logout</a>
    </Navbar>
  );
}
