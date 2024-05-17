"use client";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image"
import Logo from "../public/logo.png"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email, 
        password, 
        redirect: false,
      });

      if (res.error){
        setError("Invalid Credentials");
        return;
      }
      
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Head>
        <title>Lokalytica</title>
      </Head>
      <header className="header">
        <div className="logo">
          <Image src={Logo} alt="Lokalytica Logo"/>
        </div>
        <div>
          <Link href="/" className="links">Home</Link>
          <Link href="/about" className="links">About</Link>
          <Link href="/leaderboard" className="links">Leaderboard</Link>
          <Link href="/login" className="currentPage">Login</Link>
        </div>
      </header>
      <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-yellow-500">
          <h1 className="text-xl font-bold my-4">Login</h1>
        
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            <button className="bg-yellow-500 text-white font-bold cursor-pointer px-6 py-2">
              Login
            </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
            </div>
          )}
            

            <Link href="/register" className="text-sm mt-3 text-right">Don&apos;t have an account? <span className="underline">
                Register</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

