import { ChangeEvent } from "react";
import { Label } from "./Label";
import { ErrorMessage } from "./ErrorMessage";
import clsx from "clsx";

export interface OptionProps {
  value: string | number;
  label: string;
}

interface SelectOptionProps {
  label?: string;
  options: OptionProps[];
  value?: string | number;
  onChange: (value: string | number) => void;
  disabled?: boolean;
  error?: string;
  isRequired?: boolean;
  placeholder?: string;
}

export const SelectOption = ({
  label,
  options,
  value,
  onChange,
  disabled,
  error,
  isRequired = false,
  placeholder = "Choose the options",
}: SelectOptionProps) => {
  const selectClassNames = clsx(
    "border border-gray-300 rounded-md p-2 w-full mt-1 focus:outline-none text-sm",
    {
      "bg-gray-200 cursor-not-allowed": disabled,
      "focus:border-blue-500": !disabled,
      "border-red-500": error,
      "text-gray-400": !value,
    }
  );

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      {label && (
        <Label label={label} isRequired={isRequired} isError={!!error} />
      )}
      <select
        id={label}
        className={selectClassNames}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      >
        <option key="empty" value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};
