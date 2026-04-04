import Link from "next/dist/client/link";

export default function Home() {
  return (
    <div className={"flex justify-center"}>
      <main>
        <h1>Home</h1>
        <ul>
          <li><Link className={"text-blue-500 underline"} href={"/michael"}>Chat Page</Link></li>
          <li><Link className={"text-blue-500 underline"} href={"/sheets"}>Google Sheets</Link></li>
        </ul>
      </main>
    </div>
  )
}