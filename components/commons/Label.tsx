interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  isError?: boolean;
  isRequired?: boolean;
}

export const Label = ({
  label,
  isError,
  isRequired = false,
  ...props
}: LabelProps) => {
  return (
    <label
      className={`block text-sm sm:text-base ${
        isError ? "text-red-500" : "text-black"
      }`}
      htmlFor={label}
      {...props}
    >
      {label}
      {isRequired && <span className="text-red-500"> *</span>}
    </label>
  );
};
