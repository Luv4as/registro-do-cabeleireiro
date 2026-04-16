
import type { ComponentProps } from "react";

import { Button } from "flowbite-react";

interface ButtonComponentProps {
  text: string;
  onClick?: () => void;
  color?: ComponentProps<typeof Button>["color"];
  className?: string;
}

export function ButtonComponent({ text, onClick, color = "blue", className }: ButtonComponentProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button color={color} className={className} onClick={onClick}>
        {text}
      </Button>
    </div>
  );
}
