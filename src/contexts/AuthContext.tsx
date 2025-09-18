import React, { createContext, useContext, useEffect, useReducer } from 'react';

// Types
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'cashier' | 'customer';
  phone?: string;
  businessName?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'customer' | 'cashier';
  businessName?: string;
  adminCode?: string;
}

// Action types
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR' }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_ERROR' }
  | { type: 'SET_USER'; payload: User | null };

// Initial state
const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return { ...state, isLoading: true };
    
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    
    case 'LOGIN_ERROR':
    case 'REGISTER_ERROR':
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for development
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@silkcraft.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    phone: '+1234567890',
  },
  {
    id: '2',
    email: 'cashier@silkcraft.com',
    password: 'cashier123',
    firstName: 'Cashier',
    lastName: 'User',
    role: 'cashier',
    phone: '+1234567891',
    businessName: 'SilkCraft Store',
  },
  {
    id: '3',
    email: 'customer@example.com',
    password: 'customer123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'customer',
    phone: '+1234567892',
  },
];

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('silkcraft_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('silkcraft_user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('silkcraft_user', JSON.stringify(userWithoutPassword));
        dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });
        return { success: true };
      } else {
        dispatch({ type: 'LOGIN_ERROR' });
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR' });
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (userData: RegisterData) => {
    dispatch({ type: 'REGISTER_START' });

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        dispatch({ type: 'REGISTER_ERROR' });
        return { success: false, error: 'User with this email already exists' };
      }

      // Validate admin code if trying to register as admin
      if (userData.role === 'cashier' && userData.adminCode !== 'SILKCRAFT_ADMIN_2024') {
        dispatch({ type: 'REGISTER_ERROR' });
        return { success: false, error: 'Invalid admin code' };
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role || 'customer',
        phone: userData.phone,
        businessName: userData.businessName,
      };

      // Add to mock users (in real app, this would be an API call)
      mockUsers.push({ ...newUser, password: userData.password });

      localStorage.setItem('silkcraft_user', JSON.stringify(newUser));
      dispatch({ type: 'REGISTER_SUCCESS', payload: newUser });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'REGISTER_ERROR' });
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('silkcraft_user');
    dispatch({ type: 'LOGOUT' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
