import { Label, TextInput } from "flowbite-react";

interface InputProps {
    label: string;
    type: string;
    placeholder: string;
    required?: boolean;
    value?: string;
    maxLength?: number;
    OnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputComponent(props: InputProps) {
 
  return (
    <div>
        <div className="mb-2 block">
        <Label htmlFor="email1">{props.label}</Label>
        </div>
        <TextInput 
            id="email1" 
            type={props.type} 
            placeholder={props.placeholder} 
            required={props.required} 
            value={props.value}
            maxLength={props.maxLength}
            onChange= {props.OnChange} 
        />
    </div>

  );
}
