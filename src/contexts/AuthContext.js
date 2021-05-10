import  React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import Cookies from 'js-cookie';

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }){
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

   function signup(email, password, name) {
        let user = {
            name: name,
            email: email
        }
  Cookies.set("user" , user )
  const user1 = Cookies.get("user")
        console.log(user1);
  fetch('http://localhost:8080/find-user', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({user})
});

    return auth.createUserWithEmailAndPassword(email, password)


  }
    function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }
  
  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      console.log(user);
      setLoading(false)
    })

    return unsubscribe
  }, [])


 const value = {
  currentUser,
  signup,
  login,
  logout,
  resetPassword,
  updateEmail,
  updatePassword
 }
 return (
  <AuthContext.Provider value = {value}>
   {!loading && children}
  </AuthContext.Provider>
 )
}