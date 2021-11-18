export const TOKEN_KEY = process.env.TOKEN as string;
export const USER_KEY = process.env.USER_KEY as string;
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) != null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token: string, user?: any) => {
   localStorage.setItem(TOKEN_KEY, token);
   localStorage.setItem(USER_KEY, user);
}
let a = localStorage.getItem(USER_KEY);
export const user: Record<string, any> = JSON.parse(a!);
export const logout = () => {
   localStorage.removeItem(TOKEN_KEY);
   localStorage.removeItem(USER_KEY);
}