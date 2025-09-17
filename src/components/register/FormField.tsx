import { ReactNode } from "react";

export default function FormField({
  label,
  children,
  required,
}: {
  label?: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-purple-800">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
    </div>
  );
}
