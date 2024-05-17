import Head from "next/head";
import Image from "next/image"
import Link from "next/link"
import Logo from "../public/logo.png"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export default async function AboutPage() {
  const session = await getServerSession(authOptions);

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
          <Link href="/about" className="currentPage">About</Link>
          {session &&<Link href="/leaderboard" className="links">Leaderboard</Link>}
          {!session && <Link href="/login" className="links">Login</Link>}
          {session && <Link href="/dashboard"><span style = {{ fontWeight: 700}} className="links">Welcome, {session?.user?.name}</span></Link>}
        </div>
      </header>
      <main>
        <div className="textbox">Lokalytica aims to aid in addressing the pressing energy challenges faced by barangays in the Philippines by providing a comprehensive Energy Monitoring and Management System. The project recognizes the lack of accessible tools for residents and local government units (LGUs) to monitor and manage energy consumption effectively. Through Lokalytica, the goal is to provide barangay communities with a user-friendly platform that enables them to track their energy usage, reduce costs, and work towards environmental sustainability. The project&apos;s primary problem revolves around the lack or inefficiency of energy resource management at the local level which leads to high consumption rates, increased costs, and environmental degradation. Lokalytica seeks to tackle this by offering a multifaceted solution that includes an app for residents to participate by inputting meter readings, a web-based dashboard for LGUs to analyze energy data, and gamification features to incentivize energy sustainability behaviors. By fostering collaboration between residents, barangay personnel, and government officials, Lokalytica aims to create a culture of energy awareness and responsibility, ultimately leading to more efficient energy usage and contribute to the transition towards a more sustainable and resilient energy future for the Philippines.</div>
      </main>
    </div>
  )
}
