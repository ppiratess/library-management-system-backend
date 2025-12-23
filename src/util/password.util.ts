import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePassword = (inputPassword: string, dbPassword: string) =>
  bcrypt.compare(inputPassword, dbPassword);
