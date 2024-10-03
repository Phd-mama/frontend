interface FormFieldProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const FormField: React.FC<FormFieldProps> = ({ label, type, placeholder, value, onChange }) => (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">{label}</label>
      <input
        type={type}
        className="w-full p-2 border rounded"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
  
  export default FormField;
  