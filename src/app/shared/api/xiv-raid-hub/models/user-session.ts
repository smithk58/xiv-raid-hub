export interface UserSession {
  isLoggedIn: boolean;
  user?: {
    username: string;
    avatarURL: string;
  };
}
