const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^[A-Za-z\d\D]{8,}$/;

export const validateEmail = (email) => {
  if (!emailRegex.test(email)) {
    return 'Invalid email';
  }
};

export const validatePassword = (password) => {
  if (!passwordRegex.test(password)) {
    return 'At least 8 characters';
  }
};
