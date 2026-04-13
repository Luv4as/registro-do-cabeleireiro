"use client"

import { Navbar, NavbarBrand, NavbarToggle } from "flowbite-react";
import Link from "next/link";

export function NavbarComponent() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="">
      </NavbarBrand>
      <NavbarToggle />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginLeft: 'auto', marginRight: 'auto' }}>
        <a href="#" className="text-white hover:text-gray-300">Calendário</a>
        <a href="#" className="text-white hover:text-gray-300">Clientes</a>
      </div>
    </Navbar>
  );
}
