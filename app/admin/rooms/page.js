import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import RoomManager from "../../../components/RoomManager";

export default async function AdminRooms() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/admin/rooms");
  }

  const rooms = await prisma.room.findMany();

  return (
    <main style={{ padding: "120px 5% 5rem", backgroundColor: "var(--secondary-color)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", backgroundColor: "var(--white)", padding: "3rem", borderRadius: "20px", boxShadow: "var(--shadow)" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Dashboard Admin</h1>
        
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
            <Link href="/admin" className="btn-outline">Data Pesanan</Link>
            <Link href="/admin/rooms" className="btn-primary">Kelola Kamar</Link>
        </div>

        <RoomManager initialRooms={rooms} />
      </div>
    </main>
  );
}
