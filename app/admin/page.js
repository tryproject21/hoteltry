import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  const bookings = await prisma.booking.findMany({
    include: { room: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <main style={{ padding: "120px 5% 5rem", backgroundColor: "var(--secondary-color)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", backgroundColor: "var(--white)", padding: "3rem", borderRadius: "20px", boxShadow: "var(--shadow)" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Dashboard Admin</h1>
        <p style={{ marginBottom: "2rem" }}>Selamat datang, {session.user?.name}</p>

        <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "800px" }}>
            <thead>
                <tr style={{ borderBottom: "2px solid #eee" }}>
                <th style={{ padding: "1rem" }}>ID Pesanan</th>
                <th style={{ padding: "1rem" }}>Nama Tamu</th>
                <th style={{ padding: "1rem" }}>Kamar</th>
                <th style={{ padding: "1rem" }}>Check-in</th>
                <th style={{ padding: "1rem" }}>Check-out</th>
                <th style={{ padding: "1rem" }}>Total Harga</th>
                <th style={{ padding: "1rem" }}>Status</th>
                </tr>
            </thead>
            <tbody>
                {bookings.length === 0 && (
                <tr><td colSpan="7" style={{ padding: "2rem", textAlign: "center" }}>Belum ada pesanan masuk.</td></tr>
                )}
                {bookings.map((booking) => (
                <tr key={booking.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "1rem", fontFamily: "monospace" }}>{booking.id.slice(0,8)}</td>
                    <td style={{ padding: "1rem" }}>{booking.guestName} <br/><span style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>{booking.guestPhone}</span></td>
                    <td style={{ padding: "1rem" }}>{booking.room.name}</td>
                    <td style={{ padding: "1rem" }}>{new Date(booking.checkIn).toLocaleDateString("id-ID")}</td>
                    <td style={{ padding: "1rem" }}>{new Date(booking.checkOut).toLocaleDateString("id-ID")}</td>
                    <td style={{ padding: "1rem" }}>Rp {booking.totalPrice.toLocaleString("id-ID")}</td>
                    <td style={{ padding: "1rem", color: "green", fontWeight: "bold" }}>{booking.status}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </main>
  );
}
