const validateForm = (formData) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.firstName) errors.firstName = "First name is required";
  if (!formData.lastName) errors.lastName = "Last name is required";
  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Email is invalid";
  }
  if (!formData.username) errors.username = "Username is required";
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }
  if (!formData.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  if (!formData.birthdate) errors.birthdate = "Birthdate is required";
  if (!formData.nDni) errors.nDni = "DNI is required";

  return errors;
};

const isButtonDisabled = (formData) => {
  const errors = validateForm(formData);
  return Object.keys(errors).length > 0;
};

export { validateForm, isButtonDisabled };
