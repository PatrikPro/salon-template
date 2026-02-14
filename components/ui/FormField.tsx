import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";

/* ===== Typy ===== */
export interface FormFieldBaseProps {
  label: string;
  /** Chybová hláška */
  error?: string;
  /** Nápovědný text pod polem */
  hint?: string;
  /** ID pro aria vazbu – pokud není, generuje se z label */
  id?: string;
}

/* ===== Input ===== */
export interface InputFieldProps
  extends FormFieldBaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, hint, id, className, ...props }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={fieldId}
          className="text-sm font-sans font-medium text-coffee-700"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined
          }
          className={cn(
            "rounded-lg border px-3 py-2.5 text-base font-serif",
            "bg-white text-coffee-800 placeholder:text-coffee-300",
            "transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-offset-1",
            error
              ? "border-red-400 focus:ring-red-300"
              : "border-cream-300 focus:ring-accent/40 focus:border-accent",
            className
          )}
          {...props}
        />
        {error && (
          <p
            id={`${fieldId}-error`}
            role="alert"
            className="text-sm text-red-600 font-sans"
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${fieldId}-hint`} className="text-sm text-coffee-400 font-sans">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

/* ===== Textarea ===== */
export interface TextareaFieldProps
  extends FormFieldBaseProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, hint, id, className, ...props }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={fieldId}
          className="text-sm font-sans font-medium text-coffee-700"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={fieldId}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined
          }
          rows={4}
          className={cn(
            "rounded-lg border px-3 py-2.5 text-base font-serif resize-y",
            "bg-white text-coffee-800 placeholder:text-coffee-300",
            "transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-offset-1",
            error
              ? "border-red-400 focus:ring-red-300"
              : "border-cream-300 focus:ring-accent/40 focus:border-accent",
            className
          )}
          {...props}
        />
        {error && (
          <p id={`${fieldId}-error`} role="alert" className="text-sm text-red-600 font-sans">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${fieldId}-hint`} className="text-sm text-coffee-400 font-sans">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

TextareaField.displayName = "TextareaField";

/* ===== Select ===== */
export interface SelectFieldProps
  extends FormFieldBaseProps,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> {
  options: { value: string; label: string }[];
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, hint, id, options, className, ...props }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={fieldId}
          className="text-sm font-sans font-medium text-coffee-700"
        >
          {label}
        </label>
        <select
          ref={ref}
          id={fieldId}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined
          }
          className={cn(
            "rounded-lg border px-3 py-2.5 text-base font-serif appearance-none",
            "bg-white text-coffee-800",
            "transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-offset-1",
            error
              ? "border-red-400 focus:ring-red-300"
              : "border-cream-300 focus:ring-accent/40 focus:border-accent",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${fieldId}-error`} role="alert" className="text-sm text-red-600 font-sans">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${fieldId}-hint`} className="text-sm text-coffee-400 font-sans">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";
