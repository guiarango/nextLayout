export const isEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPassword = (password: string) => {
  // 8 caracteres, una mayuscula y una minuscula
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]$/;
  return passwordRegex.test(password);
};

export const isEmpty = (value: string) => {
  return value.trim() === "";
};

export const isCharLengthValid = (
  value: string,
  minlength: number,
  maxLength: number
) => {
  return value.length >= minlength && value.length <= maxLength;
};
