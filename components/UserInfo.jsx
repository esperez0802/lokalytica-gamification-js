"use client";

import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Logo from "../public/logo.png";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function UserInfo() {
  const { data: session } = useSession();
  const [challenge, setChallenge] = useState(null);
  const [powerConsumptionData, setPowerConsumptionData] = useState([]);

  const generateChallenge = () => {
    const challenges = [
      "Reduce daily consumption by 2% every day for 7 days.",
      "Reduce monthly consumption by 20%.",
      "Maintain a total weekly consumption of 1,000 kWh or less this week.",
    ];
    const randomIndex = Math.floor(Math.random() * challenges.length);
    const randomChallenge = challenges[randomIndex];
    setChallenge(randomChallenge);
  };

  const handleGenerateChallenge = () => {
    generateChallenge();
  };

  return (
    <div>
      <Head>
        <title>Lokalytica</title>
      </Head>
      <header className="header">
        <div className="logo">
          <Image src={Logo} alt="Lokalytica Logo" />
        </div>
        <div>
          <Link href="/" className="links">
            Home
          </Link>
          <Link href="/about" className="links">
            About
          </Link>
          <Link href="/leaderboard" className="links">
            Leaderboard
          </Link>
          <Link href="/dashboard">
            <span style={{ fontWeight: 700 }} className="currentPage">
              Welcome, {session?.user?.name}
            </span>
          </Link>
        </div>
      </header>
      <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
          <div>
            Name: <span className="font-bold">{session?.user?.name}</span>
          </div>
          <div>
            Email: <span className="font-bold">{session?.user?.email}</span>
          </div>
          <button onClick={() => signOut()} className="bg-red-500 text-white font-bold px-6 py-2 mt-3">
            Log Out
          </button>
          <button onClick={handleGenerateChallenge} className="bg-yellow-500 text-white font-bold px-6 py-2 mt-3">
            Generate Challenge
          </button>
          {challenge && (
            <div className="my-4">
              <h3>Generated Challenge:</h3>
              <p>{challenge}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
