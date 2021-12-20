const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRegex = /^[A-Za-z\d\D]{8,}$/;
const birthdayRegex =
  /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;

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

export const validatePhone = (phone) => {
  const phoneString = String(phone);
  if (!phone) return;
  if (
    phoneString.length < 8 ||
    phoneString.includes('(') ||
    phoneString.includes('.') ||
    phoneString.includes(')') ||
    phoneString.includes('#') ||
    phoneString.includes('-')
  ) {
    return 'At least 8 numbers and cannot include (), #, . or -';
  }
};

export const validateBirthday = (birthday) => {
  if (!birthdayRegex.test(birthday)) {
    return 'Invalid date. Valid date format: dd/mm/yyyy';
  }
};
