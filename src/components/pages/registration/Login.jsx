/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, fireDB } from "../../../FirebaseConfig";
import Loader from "../../Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";


const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    /**========================================================================
     *                          User Login Function 
    *========================================================================**/

    const userLoginFunction = async () => {
        // validation 
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required")
        }

        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            // console.log(users.user)

            try {
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("users", JSON.stringify(user) )
                    setUserLogin({
                        email: "",
                        password: ""
                    })
                    toast.success("Login Successfully");
                    setLoading(false);
                    if(user.role === "user") {
                        navigate('/user-dashboard');
                    }else{
                        navigate('/admin-dashboard');
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Login Failed");
        }
    }

    const googleProvider = new GoogleAuthProvider();

    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            
            try {
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', result.user.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("users", JSON.stringify(user));
                    toast.success("Google Login Successful");
                    setLoading(false);
                    if(user.role === "user") {
                        navigate('/');
                    } else {
                        navigate('/admin-dashboard');
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Google Login Failed");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#0B5D44]">
  {loading && <Loader />}

  {/* Login Form */}
  <div className="login_Form bg-white px-6 py-8 w-full max-w-sm rounded-lg shadow-lg">

    {/* Header */}
    <div className="text-center mb-6">
      <h2 className="text-3xl font-bold text-[#0B5D44] mb-1">Welcome Back!</h2>
      <p className="text-gray-600 text-sm">Login to your account</p>
    </div>

    {/* Email Input */}
    <div className="mb-4">
      <input
        type="email"
        placeholder="Email Address"
        value={userLogin.email}
        onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
        className="w-full bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#0B5D44]/60 focus:outline-none text-gray-800 py-2 px-4 rounded-lg shadow-sm placeholder-gray-400"
      />
    </div>

    {/* Password Input */}
    <div className="mb-6">
      <input
        type="password"
        placeholder="Password"
        value={userLogin.password}
        onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
        className="w-full bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#0B5D44]/60 focus:outline-none text-gray-800 py-2 px-4 rounded-lg shadow-sm placeholder-gray-400"
      />
    </div>

    {/* Login Button */}
    <div className="mb-4">
      <button
        onClick={userLoginFunction}
        className="w-full bg-[#0B5D44] hover:bg-[#0B5D44]/80 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:-translate-y-0.5"
      >
        Login
      </button>
    </div>

    {/* Google Login */}
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

    {/* Phone Login */}
    <div className="mb-4">
      <Link
        to="/phone-login"
        className="w-full bg-white border border-[#0B5D44] text-[#0B5D44] font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        Continue with Phone
      </Link>
    </div>

    {/* Signup Link */}
    <p className="text-center text-gray-600 text-sm">
      Don't have an account?{" "}
      <Link to="/signup" className="text-[#0B5D44] font-bold hover:underline">
        Signup
      </Link>
    </p>
  </div>
</div>

    );
}

export default Login;