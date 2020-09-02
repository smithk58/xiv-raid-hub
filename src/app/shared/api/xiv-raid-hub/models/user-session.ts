export interface UserSession {
  timezone: string;
  isLoggedIn: boolean;
  user?: {
    username: string;
    avatarURL: string;
  };
}
