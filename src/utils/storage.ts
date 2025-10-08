import { User } from '../types/auth';

const STORAGE_KEY = 'graphical_auth_users';

export const storageUtils = {
  getUsers: (): User[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  saveUser: (user: User): boolean => {
    try {
      const users = storageUtils.getUsers();

      if (users.some(u => u.username.toLowerCase() === user.username.toLowerCase())) {
        return false;
      }

      users.push(user);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  getUser: (username: string): User | null => {
    const users = storageUtils.getUsers();
    return users.find(u => u.username.toLowerCase() === username.toLowerCase()) || null;
  },

  userExists: (username: string): boolean => {
    return storageUtils.getUser(username) !== null;
  },
};
