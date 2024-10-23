import React from "react";

interface InputProps {
  label?: string; // Optional label for the input
  type?: string; // Type of the input (text, password, email, etc.)
  name: string; // Input name attribute
  value: string; // Controlled input value
  placeholder?: string; // Optional placeholder
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
  errorMessage?: string; // Optional error message
  className?: string; // Additional class names for styling
  required?: boolean; // Required flag for validation
  readOnly?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  errorMessage,
  className = "",
  required = false,
  readOnly = false,
  disabled= false
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none ${
          readOnly ? "cursor-not-allowed" : ""
        } focus:ring-2 focus:ring-blue-500 ${
          errorMessage
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300"
        }`}
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
