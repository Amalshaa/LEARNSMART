import { useState } from 'react';

const useFormHandler = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = (rules) => {
    let isValid = true;
    const newErrors = {};

    Object.keys(rules).forEach((field) => {
      const value = values[field];
      const rule = rules[field];

      if (rule.required && !value) {
        isValid = false;
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }

      if (rule.minLength && value?.length < rule.minLength) {
        isValid = false;
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${rule.minLength} characters`;
      }

      if (rule.email && value && !/^\S+@\S+\.\S+$/.test(value)) {
        isValid = false;
        newErrors[field] = 'Invalid email format';
      }

      if (rule.numeric && value && !/^\d+$/.test(value)) {
        isValid = false;
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be numeric`;
      }

      if (rule.match && value !== values[rule.match]) {
        isValid = false;
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} does not match ${rule.match}`;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return { values, errors, handleChange, validate };
};

export default useFormHandler;
