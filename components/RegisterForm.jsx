"use client";

import Link from "next/link";
import Head from "next/head";
import Image from "next/image"
import Logo from "../public/logo.png"
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function RegisterForm() {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async(e) => {
      e.preventDefault();

      if(!name || !username || !email || !password){
        setError("All fields are necessary.");
        return;
      }

      try {

        const resUserExists = await fetch("api/userExists", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email }),
        });

        const { user } = await resUserExists.json();

        if (user){
          setError("User already exists.");
          return;
        }

        const res = await fetch("api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            username, 
            email, 
            password,
          })
        });

          if (res.ok) {
            const form = e.target;
            form.reset();
            router.push("/dashboard");
          }else {
            console.log("User registration failed.");
          }
      } catch (error) {
        console.log("Error during registration: ", error);
      }
    };

    console.log("Username: ", username);

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
          <Link href="/register" className="currentPage">Register</Link>
        </div>
      </header>
      <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-yellow-500">
          <h1 className="text-xl font-bold my-4">Register</h1>
        
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input onChange={e => setName(e.target.value)}type="text" placeholder="Full Name" />
            <input onChange={e => setUsername(e.target.value)}type="text" placeholder="Username" />
            <input onChange={e => setEmail(e.target.value)}type="text" placeholder="Email" />
            <input onChange={e => setPassword(e.target.value)}type="password" placeholder="Password" />
            <button className="bg-yellow-500 text-white font-bold cursor-pointer px-6 py-2">
              Register
            </button>

            { error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
            </div>
            )}

            <Link className="text-sm mt-3 text-right" href={"/login"}>
              Already have an account? <span className="underline">
                Login</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}