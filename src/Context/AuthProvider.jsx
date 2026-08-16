import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../FireBase/Firebase.init';

const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null)
      const [loading, setLoading] = useState(true)

      const createUser = (email, password) => {
            setLoading(true)
            return createUserWithEmailAndPassword(auth, email, password)
      }
      const loginUser = (email, password) => {
            setLoading(true)
            return signInWithEmailAndPassword(auth, email, password)
      }
      const logOut = () => {
            setLoading(true)
            return signOut(auth)
      }


      useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (currenUser) => {
                  setUser(currenUser)
                  setLoading(false)

            })
            return () => {
                  unsubscribe()
            }
      }, [])

      const userInfo = {
            user,
            createUser,
            loginUser,
            logOut,
            loading
      }
      return (
            <AuthContext value={userInfo}>
                  {children}
            </AuthContext>
      );
};

export default AuthProvider;