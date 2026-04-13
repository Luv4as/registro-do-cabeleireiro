import { ButtonComponent } from "./components/button";
import { NavbarComponent } from "./components/navbar";
import { TableComponent } from "./components/table";


export default function Clientes() {
  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <h1>Clientes</h1>
      <ButtonComponent></ButtonComponent>
      <TableComponent></TableComponent>
    </div>
  );
}
