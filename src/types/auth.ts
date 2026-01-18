export type AuthUser = {
  id: string;
  email: string;
  nickname: string;
  createdAt: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  nickname: string;
};
