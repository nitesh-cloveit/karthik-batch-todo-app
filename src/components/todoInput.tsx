interface TodoInputProps {
  name: string;
  placeholder: string;
  onChange: (e: string) => void;
  value: string;
}

export default function TodoInput({ name, placeholder, onChange, value }: TodoInputProps) {
  return (
    <input
      type="text"
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
