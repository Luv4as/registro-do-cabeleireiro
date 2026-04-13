import { ButtonComponent } from "../../../components/button";
import { TableComponent } from "../../../components/table";


export default function Clientes() {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-6">
      <h1>Clientes</h1>
      <div className="flex flex-col gap-12 items-end">
        <ButtonComponent  text="Adicionar Cliente"></ButtonComponent>
        <TableComponent></TableComponent>
      </div>
    </div>
  );
}
