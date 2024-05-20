import React, { useState } from "react";
import { BsPass } from "react-icons/bs";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, pass);
    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Account created succesfully");
          navigate("/home");
        })
        .catch((err) =>
          toast.error("We could not create your account" + err.code)
        );
    } else {
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("You have logged in");
          navigate("/home");
        })
        .catch((err) => {
          toast.error("An error occured during sign in" + err.code);
          if (err.code == "auth/invalid-credential") setIsError(true);
        });
    }
  };

  const handleReset = (e) => {
    sendPasswordResetEmail(auth, email)
      .then(() =>
        toast.info("Password reset email has been sent. Check your mailbox.")
      )
      .catch((err) => toast.error("An error occured" + err.code));
  };

  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("You have logged in");
        navigate("/home");
      })
      .catch((err) =>
        toast.error("An error occured during sign in" + err.code)
      );
  };
  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-6 py-8 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className="h-[150px]" src="/x-logo.webp" alt="" />
        </div>
        <h1 className="text-4xl font-bold text-center whitespace-nowrap">
          Happening now
        </h1>
        <h1 className="text-lg font-bold text-center">Join Today</h1>

        <div className="flex flex-col justify-center">
          <button
            onClick={handleGoogle}
            className="bg-white font-semibold flex items-center py-2 px-10 rounded-full gap-3 transition hover:bg-gray-300 text-black whitespace-nowrap my-2"
          >
            <img className="h-[20px]" src="/google-logo.svg" alt="" />
            Sign up with Google
          </button>
          <button className="bg-white font-semibold flex items-center py-2 px-10 rounded-full gap-3 transition hover:bg-gray-300 text-black whitespace-nowrap">
            <img className="h-[20px] ms-2" src="/x-logo.svg" alt="" /> Sign up
            with Apple
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-blue-500  "
            type="text"
          />
          <label className="mt-5">Password</label>
          <input
            onChange={(e) => setPass(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-blue-500"
            type="password"
          />

          <button className="mt-10 bg-blue-500 text-white rounded-full p-2 font-bold transition hover:bg-gray-300">
            {isSignUp ? "Create account" : "Sign in"}
          </button>

          <p className="mt-5 ">
            <span className="text-gray-500">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </span>
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              className="ms-2 text-blue-500 cursor-pointer"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </span>
          </p>
        </form>
        {
          <p
            onClick={handleReset}
            className="text-red-500 text-center cursor-pointer"
          >
            Forgot password?
          </p>
        }
      </div>
    </section>
  );
};

export default Login;
