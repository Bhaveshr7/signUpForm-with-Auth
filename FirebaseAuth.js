
  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from  "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  import {getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBBHdIgIh0-QaEI9nc4jtwzAGVb1ofLZfE",
    authDomain: "practicejs-9cadb.firebaseapp.com",
    projectId: "practicejs-9cadb",
    storageBucket: "practicejs-9cadb.appspot.com",
    messagingSenderId: "278019751024",
    appId: "1:278019751024:web:02132c1bfcff99f01048b5",
    measurementId: "G-2P0XMXZJL2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  function showMessage(message, divId) {
    const messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.style.opacity=1;
    messageDiv.innerHTML=message;
    setTimeout(function(){
        messageDiv.style.opacity=0
    },5000)
  }

const signUp=document.getElementById('signUpButton')
signUp.addEventListener('click',function(e){
    e.preventDefault()
    const rName=document.getElementById('signUpName').value;
    const rEmail=document.getElementById('signUpEmail').value;
    const rPassword=document.getElementById('signUpPassword').value;

    const auth=getAuth(app);
    const db=getFirestore();
    createUserWithEmailAndPassword(auth, rEmail, rPassword)
    .then(
        (userCredential)=>{
            const user=userCredential.user;
            const userData={
                rEmail: rEmail,
                rName: rName
            }
            showMessage("Account created successfully","signUpMessage")
            console.log(`Account created successfully, ${rEmail}`);
            const docRef=doc(db,"users", user.uid)
            setDoc(docRef, userData)
            .then(()=>{
                window.location.href="website.html"
            })
            .catch((error)=>{
                console.log("error occured",error);
            }) 
        }
    )
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=="auth/email-already-in-use"){
            showMessage("Account already exists","signUpMessage")
        }
        else{
            showMessage("Error creating user","signUpMessage")
        }
    })
})

const signIn= document.getElementById("signInButton")
signIn.addEventListener("click",(e)=>{
    e.preventDefault()
    const lEmail= document.getElementById("lEmail").value
    const lPassword= document.getElementById("lPassword").value
    const auth=getAuth()

    signInWithEmailAndPassword(auth, lEmail, lPassword)
    .then((userCredential)=>{
        showMessage("login succesful","signInMessage")
        const user=userCredential.user
        localStorage.setItem("loggedInUserId",user.uid)
        window.location.href="redirected.html"
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=="auth/invalid-credential"){
            showMessage("Invalid credentials","signInMessage")
        }
        else{
            showMessage("Account doesn't exist","signInMessage")
        }
    })
})