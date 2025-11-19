import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
    name: string;
    email: string;
    phone?: string;
};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => void;
    signUp: (name: string, email: string, password: string) => void;
    signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: false,
    signIn: () => { },
    signUp: () => { },
    signOut: () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Check for persisted user session on mount (mocked)
    useEffect(() => {
        // Check storage for token
    }, []);

    const signIn = (email: string, password: string) => {
        setIsLoading(true);
        // Mock API call
        setTimeout(() => {
            setIsLoading(false);
            if (email && password) {
                setUser({ name: 'Gaurav', email: email });
                router.replace('/(tabs)');
            } else {
                alert('Invalid credentials');
            }
        }, 1500);
    };

    const signUp = (name: string, email: string, password: string) => {
        setIsLoading(true);
        // Mock API call
        setTimeout(() => {
            setIsLoading(false);
            setUser({ name, email });
            router.replace('/(tabs)');
        }, 1500);
    };

    const signOut = () => {
        setUser(null);
        router.replace('/(auth)/login');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
