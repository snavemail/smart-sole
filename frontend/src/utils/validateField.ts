export const validateRegisterPage = (form: any, fieldName: string, value: string) => {
  switch (fieldName) {
    case 'email':
      if (!value.trim()) {
        return 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Invalid email format';
      } else {
        return '';
      }
    case 'password':
      if (!value.trim()) {
        return 'Password is required';
      }
      // else if (!isPasswordValid(value)) {
      //   return 'Password must be between 8 and 50 characters and contain at least one letter and one number';
      // }
      else if (value !== form.confirm_password) {
        return 'Passwords do not match';
      } else {
        return '';
      }
    case 'first_name':
      if (!value.trim()) {
        return 'First name is required';
      } else {
        return '';
      }
    case 'last_name':
      if (!value.trim()) {
        return 'Last name is required';
      } else {
        return '';
      }
    case 'confirm_password':
      if (!value.trim()) {
        return 'Confirm Password is required';
      } else if (value !== form.password) {
        return 'Passwords do not match';
      } else {
        return '';
      }
    default:
      return '';
  }
};

export const validateLoginPage = (form: any, fieldName: string, value: string) => {
  switch (fieldName) {
    case 'email':
      if (!value.trim()) {
        return 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Invalid email format';
      } else {
        return '';
      }
    case 'password':
      if (!value.trim()) {
        return 'Password is required';
      } else {
        return '';
      }
  }
};

const isPasswordValid = (value: string) => {
  return (
    value.length >= 8 &&
    value.length <= 50 &&
    /[!@#$%^&*()_+{}\[\]:;<>,.?/~\-]/.test(value) &&
    /\d/.test(value) &&
    /[a-z]/.test(value) &&
    /[A-Z]/.test(value)
  );
};
