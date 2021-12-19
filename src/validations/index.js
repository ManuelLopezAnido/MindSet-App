const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^[A-Za-z\d\D]{8,}$/;

export const validateEmail = (email, errorsArray) => {
  if (!emailRegex.test(email)) {
    errorsArray.email = 'Invalid email';
    return true;
  }
  return false;
};

export const validatePassword = (password, errorsArray) => {
  if (!passwordRegex.test(password)) {
    errorsArray.password = 'At least 8 characters';
    return true;
  }
  return false;
};
