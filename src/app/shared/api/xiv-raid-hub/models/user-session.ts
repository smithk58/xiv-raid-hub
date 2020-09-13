export interface UserSession {
  prettyTimezone: string;
  isLoggedIn: boolean;
  user?: {
    username: string;
    avatarURL: string;
  };
}
