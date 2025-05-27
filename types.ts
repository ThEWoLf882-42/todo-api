export type JwtPayload = {
  sub: string;
  email: string;
};

export type TodoStats = {
  total: number;
  completed: number;
  pending: number;
};
