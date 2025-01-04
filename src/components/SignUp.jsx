import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import GoogleButton from 'react-google-button'
import { signInWithPopup} from "firebase/auth";
import { provider } from "../services/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
    .then((res)=>{
      console.log(res.user)
      alert("successfuly Sign-up")
    })
    .catch((err)=>{
      console.log(err)
      alert("Error! Enter email or password again")
    })
  };

  const handleLogin=()=>{
    signInWithPopup(auth,provider)
    .then((res)=>{
        setUser(res.user)
        alert("your id successfuly Login....")
    })
    .catch((err)=>{
        console.log(err)
    })
}
  return (
    <div style={{border:"1px solid grey",padding:"20px",borderRadius:"10px"}}>
      <h2 style={{textAlign:"center"}}>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{padding:"10px 100px 10px 10px"}}
        /><br></br><br></br>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{padding:"10px 100px 10px 10px"}}
        /><br></br><br></br>
        <button style={{width:"100%",padding:"10px"}} type="submit">Sign Up</button>
        <p style={{fontSize:"12px",textAlign:"center"}}>Sign in using Google Account</p>
        {user ? (
        <div>
          <h1> hello {user.displayName} Welcome my web site

          </h1>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <GoogleButton style={{backgroundColor:"grey",width:"100%"}} onClick={handleLogin}/>
      )}
      </form>
      
    </div>
  );
};

export default SignUp;

