export interface UserSession {
  prettyTimezone: string;
  isLoggedIn: boolean;
  user?: {
    id: number;
    username: string;
    avatarURL: string;
  };
}
