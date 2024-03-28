import React, { useState } from 'react';
import {auth, provider} from '../../firebase'
import {signInWithPopup, createUserWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import './SignUp.css';
import gifVideo from '../../assets/login_video.gif';


export default function SignUp() {
    const navigate = useNavigate();
    const signInWithGoole = async ()=> {
        try{
            const results = await signInWithPopup(auth, provider);
            console.log(results.user.reloadUserInfo.photoUrl);
            console.log(results.user);
            const userDataString = JSON.stringify(results.user);
            document.cookie = "userData=" + userDataString + "; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/Notification";
            const authInfo = {          
            }

            navigate('/Home');
        }catch(error){
            console.error(error.message);
        }
    };
    //dsdsf

    const signUPfunc = async(email, password) => {
        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            window.alert(userCredentials);
            navigate('/Home');
        }catch(error){
            console.error(error.message);
        }
    };
    const handleSignup = () => {
        const password = document.getElementById("passwordId-1").value;
        const password_2 = document.getElementById("passwordId-2").value;
        const email = document.getElementById("InputEmail-Id").value;

        if(password == password_2){
    
            if(password.length > 6){
                signUPfunc(email, password);
            }else{
                alert("Please enter strong password");
            }
        }
        else{
            alert("password do not match");
      
        }
    }


    return(
        <div className='signup-page'>
            <div className='signup_left'>
                <h1 className='source-serif4-heading-600'>WELCOME<br/> to<br/> BUDGET BUDDY</h1>
                <img src={gifVideo} alt="GIF video" />
            </div>

            <div className='signup-container'>
                <h1 className='inria-sans-bold'>Signup</h1>
                <div class="form-group w-75">
                    <input type="email" class="form-control field-back" id="InputEmail-Id" aria-describedby="emailHelp" placeholder="Email address"/>
                </div>

                <div class="form-group w-75">
                    <input type="password" class="form-control field-back" id="passwordId-1" placeholder="Create Password"/>
                </div>

                <div class="form-group w-75">
                    <input type="password" class="form-control field-back" id="passwordId-2" placeholder="Confirm Password"/>
                </div>

                <button className='signin-btn w-75' onClick={handleSignup} >Signup</button>
                <div id="or">or</div>


                <button className='login-with-google-btn w-75' onClick={signInWithGoole}>
                    <FcGoogle size={34} id='googleIcon' />
                    Signin with google
                </button>
            </div>
        </div>
    );

}
