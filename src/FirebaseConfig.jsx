import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp, collection, addDoc } from 'firebase/firestore';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import toast from "react-hot-toast";

// Your Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyBoOyUaqA0YWD3xH7B8DfVwrrx51TeKDwI",
  authDomain: "greenriseagrowebsite.firebaseapp.com",
  projectId: "greenriseagrowebsite",
  storageBucket: "greenriseagrowebsite.firebasestorage.app",
  messagingSenderId: "83239512927",
  appId: "1:83239512927:web:25d46e0339146a6588e4ea",
  measurementId: "G-MDGNNXT36H"
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export const requestOTP = async (phoneNumber) => {
  try {
    // Clear existing recaptcha if any
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }

    // Create new recaptcha verifier
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      },
      'expired-callback': () => {
        // Reset recaptcha
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
        toast.error("reCAPTCHA expired. Please try again.");
      }
    });

    // Render the recaptcha
    await window.recaptchaVerifier.render();
    
    // Request OTP
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      window.recaptchaVerifier
    );
    
    window.confirmationResult = confirmationResult;
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    if (error.code === 'auth/invalid-phone-number') {
      toast.error("Please enter a valid phone number");
    } else {
      toast.error(error.message || "Failed to send OTP");
    }
    return false;
  }
};

export const verifyOTP = async (otp) => {
  try {
    const result = await window.confirmationResult.confirm(otp);
    
    // Create user object
    const user = {
      name: result.user.phoneNumber,
      phoneNumber: result.user.phoneNumber,
      uid: result.user.uid,
      role: "user",
      time: Timestamp.now(),
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    };

    // Save user to Firestore
    const userRef = collection(fireDB, "user");
    await addDoc(userRef, user);
    localStorage.setItem('users', JSON.stringify(user));
    return true;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    toast.error("Invalid OTP");
    return false;
  }
};

export { fireDB, auth };