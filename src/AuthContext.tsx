import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase'; // Your firebase config file
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

const AuthContext = createContext<{ user: User | null; loading: boolean } | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This listener automatically detects if a user is logged in even after a page refresh
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);