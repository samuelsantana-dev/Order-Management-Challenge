export type UserType = {
  email?: string;
  password?: string;
};

export type AuthPayload = UserType & {
  id?: string;
  confirmPassword?: string;
  token?: string;
  refreshToken?: string;
};
