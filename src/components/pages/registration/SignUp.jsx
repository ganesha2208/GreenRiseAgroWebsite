/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../../FirebaseConfig";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../Loader";

const Signup = () => {
    const context = useContext(myContext);
    const {loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    /**========================================================================
     *                          User Signup Function 
    *========================================================================**/

    const userSignupFunction = async () => {
        // validation 
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All Fields are required")
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            // create user object
            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            }

            // create user Refrence
            const userRefrence = collection(fireDB, "user")

            // Add User Detail
            addDoc(userRefrence, user);

            setUserSignup({
                name: "",
                email: "",
                password: ""
            })

            toast.success("Signup Successfully");

            setLoading(false);
            navigate('/login')
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }

    const googleProvider = new GoogleAuthProvider();

    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            
            // Create user object
            const user = {
                name: result.user.displayName,
                email: result.user.email,
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
            }

            // Create user Reference
            const userReference = collection(fireDB, "user");
            
            // Add User Detail
            await addDoc(userReference, user);
            localStorage.setItem('users', JSON.stringify(user));
            toast.success("Google Login Successful");
            navigate('/');
            
        } catch (error) {
            console.log(error);
            toast.error("Google Login Failed");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#0B5D44]">
            {loading && <Loader />}
            {/* Signup Form */}
            <div className="login_Form bg-white px-6 py-8 w-full max-w-sm rounded-lg shadow-lg">
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-[#0B5D44] mb-1">Signup</h2>
                    <p className="text-gray-600 text-sm">Create your account</p>
                </div>

                {/* Name Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={userSignup.name}
                        onChange={(e) => setUserSignup({ ...userSignup, name: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#0B5D44]/60 focus:outline-none text-gray-800 py-2 px-4 rounded-lg shadow-sm placeholder-gray-400"
                    />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={userSignup.email}
                        onChange={(e) => setUserSignup({ ...userSignup, email: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#0B5D44]/60 focus:outline-none text-gray-800 py-2 px-4 rounded-lg shadow-sm placeholder-gray-400"
                    />
                </div>

                {/* Password Input */}
                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="Password"
                        value={userSignup.password}
                        onChange={(e) => setUserSignup({ ...userSignup, password: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#0B5D44]/60 focus:outline-none text-gray-800 py-2 px-4 rounded-lg shadow-sm placeholder-gray-400"
                    />
                </div>

                {/* Signup Button */}
                <div className="mb-4">
                    <button
                        onClick={userSignupFunction}
                        className="w-full bg-[#0B5D44] hover:bg-[#0B5D44]/80 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:-translate-y-0.5"
                    >
                        Signup
                    </button>
                </div>

                {/* Google Signup */}
                <div className="mb-4">
                    <button
                        onClick={googleLogin}
                        className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg shadow-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                    >
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                        Continue with Google
                    </button>
                </div>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <p className="text-gray-500 mx-3 text-sm">OR</p>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                </div>

                {/* Login Link */}
                <p className="text-center text-gray-600 text-sm">
                    Have an account?{" "}
                    <Link to="/login" className="text-[#0B5D44] font-bold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;