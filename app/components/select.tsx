
import { Label, Select } from "flowbite-react";

interface  SelectComponentProps {
    label: string;
    optionsStringArray?: string[];
    optionsObject?: { value: number; label: string }[];
    required?: boolean;
    value?: string;
    OnChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectComponent({ label, optionsStringArray, optionsObject, required, value, OnChange }: SelectComponentProps) {

  const options = optionsStringArray ? optionsStringArray.map((opt) => ({ value: opt, label: opt })) : optionsObject || [];

  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="options">{label}</Label>
      </div>
      <Select id="options" required={required} value={value} onChange={OnChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
