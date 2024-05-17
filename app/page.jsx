import Head from "next/head";
import Image from "next/image"
import Link from "next/link"
import Logo from "../public/logo.png"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
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
          <Link href="/" className="currentPage">Home</Link>
          <Link href="/about" className="links">About</Link>
          {session && <Link href="/leaderboard" className="links">Leaderboard</Link>}
          {!session && <Link href="/login" className="links">Login</Link>}
          {session && <Link href="/dashboard"><span style = {{ fontWeight: 700}} className="links">Welcome, {session?.user?.name}</span></Link>}
        </div>
      </header>
      <main className="px-3 mt-50 h-[80vh] flex flex-col justify-center items-center">
        <div className="font-sans text-5xl font-semibold lg:text-center text-yellow-400">
          Powering Efficiency,<br/>Empowering Tomorrow.
        </div>
        <p className="font-sans text-xl text-center mt-8">
          Leading the way for local energy management and conservation.
        </p>
      </main>
    </div>
  )
}
