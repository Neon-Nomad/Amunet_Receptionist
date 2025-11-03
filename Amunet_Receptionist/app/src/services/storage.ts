export const storage = {
  getToken: (): string | null => {
    return localStorage.getItem('amunet_token');
  },
  
  setToken: (token: string): void => {
    localStorage.setItem('amunet_token', token);
  },
  
  removeToken: (): void => {
    localStorage.removeItem('amunet_token');
  },
  
  getUser: (): any | null => {
    const user = localStorage.getItem('amunet_user');
    return user ? JSON.parse(user) : null;
  },
  
  setUser: (user: any): void => {
    localStorage.setItem('amunet_user', JSON.stringify(user));
  },
  
  removeUser: (): void => {
    localStorage.removeItem('amunet_user');
  },
  
  clear: (): void => {
    localStorage.removeItem('amunet_token');
    localStorage.removeItem('amunet_user');
  },
};