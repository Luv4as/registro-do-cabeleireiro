
import { Button } from "flowbite-react";

interface ButtonComponentProps {
  text: string;
  onClick?: () => void;
  color?: string;
}

export function ButtonComponent({ text, onClick, color = "blue" }: ButtonComponentProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button color={color} onClick={onClick}>{text}</Button>
    </div>
  );
}
