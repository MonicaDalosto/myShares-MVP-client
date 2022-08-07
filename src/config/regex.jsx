export const validEmail = new RegExp(
  '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
);
export const validPassword = new RegExp(
  '(^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]))(?=.{8,}))'
);
export const lowercaseLetter = /[a-z]/g;

export const uppercaseLetter = /[A-Z]/g;

export const specialCharacter = /[!@#$%^&*]/g;

export const numberCharacter = /[0-9]/g;

export const minimumLength = 8;
