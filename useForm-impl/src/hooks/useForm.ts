import { useState } from "react";

type FormValue = { [key: string]: any };

type FormOptions = {
  required?: boolean | string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  min?: { value: number; message: string };
  max?: { value: number; message: string };
  defaultValue?: any;
  validate?:
    | ((value: string | number | boolean) => true | string) // single function
    | Record<string, (value: string | number | boolean) => true | string>; // multiple functions
};

const validateField = (value: any, options?: FormOptions) => {
  if (!options) return null;

  // Required
  if (options.required && (value === "" || value === null || value === undefined)) {
    return typeof options.required === "string" ? options.required : "This field is required";
  }

  // String validations
  if (typeof value === "string") {
    if (options.pattern && !options.pattern.value.test(value)) {
      return options.pattern.message;
    }
    if (options.minLength && value.length < options.minLength.value) {
      return options.minLength.message;
    }
    if (options.maxLength && value.length > options.maxLength.value) {
      return options.maxLength.message;
    }
  }

  // Number validations
  if (typeof value === "number") {
    if (options.min !== undefined && value < options.min.value) return options.min.message;
    if (options.max !== undefined && value > options.max.value) return options.max.message;
  }

  // Custom validation
  if (options.validate) {
    if (typeof options.validate === "function") {
      const result = options.validate(value);
      if (result !== true) return result;
    } else {
      for (const key in options.validate) {
        const result = options.validate[key](value);
        if (result !== true) return result;
      }
    }
  }

  return null;
};

type FormState<T> = {
  values: T;
  errors: { [K in keyof T]?: string | null };
  touched: { [K in keyof T]?: boolean };
  isDirty: boolean;
};

export const useForm = <T extends Record<string, any>>() => {
  const [formState, setFormState] = useState<FormState<T>>({
    values: {} as T,
    errors: {},
    touched: {},
    isDirty: false,
  });

  const [fieldOptions, setFieldOptions] = useState<{ [key: string]: FormOptions | undefined }>({});

  const register = <K extends keyof T>(name: K, options?: FormOptions) => {
    // Initialize field if not exists
    if (!(name in formState.values)) {
      const initialValue =
        options?.defaultValue !== undefined
          ? options.defaultValue
          : options?.min?.value ?? ""; // default 0 for number fields if min exists, else empty string

      setFormState((prev) => ({
        ...prev,
        values: { ...prev.values, [name]: initialValue },
        errors: { ...prev.errors, [name]: null },
        touched: { ...prev.touched, [name]: false },
      }));
      setFieldOptions((prev) => ({ ...prev, [name]: options }));
    }

    return {
      value: formState.values[name] ?? "",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue =
          e.target.type === "number" ? (+e.target.value || 0) : e.target.value;

        const errorMessage = validateField(newValue, options ?? {});

        setFormState((prev) => ({
          ...prev,
          values: { ...prev.values, [name]: newValue },
          errors: { ...prev.errors, [name]: errorMessage ?? null },
          isDirty: true,
        }));
      },
      onBlur: () => {
        const errorMessage = validateField(formState.values[name], options ?? {});
        setFormState((prev) => ({
          ...prev,
          errors: { ...prev.errors, [name]: errorMessage ?? null },
          touched: { ...prev.touched, [name]: true },
        }));
      },
    };
  };

  const handleSubmit =
    (callback: (values: T) => void) =>
    (e: React.FormEvent) => {
      e.preventDefault();

      let hasErrors = false;
      const newErrors = {} as { [K in keyof T]?: string | null };

      for (const key in formState.values) {
        const options = fieldOptions[key] ?? {};
        const error = validateField(formState.values[key], options ?? {});
        if (error) {
          newErrors[key] = error;
          hasErrors = true;
        } else {
          newErrors[key] = null;
        }
      }

      setFormState((prev) => ({ ...prev, errors: newErrors }));

      if (!hasErrors) {
        callback(formState.values);
      }
    };

  const reset = (newValues?: Partial<T>) => {
    const valuesToSet = newValues ?? {};
    const resetErrors: { [K in keyof T]?: string | null } = {};
    const resetTouched: { [K in keyof T]?: boolean } = {};

    for (const key in valuesToSet) {
      resetErrors[key as keyof T] = null;
      resetTouched[key as keyof T] = false;
    }

    setFormState({
      values: valuesToSet as T,
      errors: resetErrors,
      touched: resetTouched,
      isDirty: false,
    });
  };

  return { formState, register, handleSubmit, reset };
};
