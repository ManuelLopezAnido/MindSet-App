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

export const validateMongoID = (id) => {
  //this short circuit is needed bc this validation is performed on load.
  if (id && id.length < 24) {
    return 'at least 24 characters long, not and ID';
  }
};
