import { rooms } from "../../../data/rooms";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return rooms.map((room) => ({
    id: room.id,
  }));
}

export default async function RoomDetail({ params }) {
  const { id } = await params;
  const room = rooms.find((r) => r.id === id);

  if (!room) {
    notFound();
  }

  return (
    <main style={{ padding: "100px 5% 5rem", backgroundColor: "var(--secondary-color)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", backgroundColor: "var(--white)", borderRadius: "20px", overflow: "hidden", boxShadow: "var(--shadow)" }}>
        
        {/* Gallery Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "0.5rem", height: "500px" }}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <Image src={room.gallery[0]} alt={room.name} fill style={{ objectFit: "cover" }} priority />
            </div>
            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "0.5rem" }}>
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <Image src={room.gallery[1]} alt={`${room.name} view 2`} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ position: "relative", width: "100%", height: "100%", backgroundColor: "#000", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", cursor: "pointer" }}>
                    <Image src={room.image} alt="More photos" fill style={{ objectFit: "cover", opacity: 0.5 }} />
                    <span style={{ position: "relative", zIndex: 2, fontWeight: "bold", fontSize: "1.2rem" }}>+ Lihat Semua Foto</span>
                </div>
            </div>
        </div>

        {/* Info & Booking */}
        <div style={{ display: "flex", flexWrap: "wrap", padding: "3rem", gap: "3rem" }}>
            <div style={{ flex: "2", minWidth: "300px" }}>
                <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{room.name}</h1>
                <p style={{ color: "var(--text-light)", fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "2rem" }}>
                    {room.longDescription}
                </p>

                <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Fasilitas Kamar</h3>
                <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", listStyle: "none", padding: 0 }}>
                    {room.amenities.map((amenity, index) => (
                        <li key={index} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.05rem" }}>
                            <span style={{ color: "var(--primary-color)" }}>✔️</span> {amenity}
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ flex: "1", minWidth: "300px" }}>
                <div style={{ position: "sticky", top: "100px", padding: "2rem", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "15px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
                    <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--primary-color)", marginBottom: "0.5rem" }}>
                        Rp {room.price.toLocaleString("id-ID")} <span style={{ fontSize: "1rem", fontWeight: "normal", color: "var(--text-light)" }}>/ malam</span>
                    </div>
                    <p style={{ color: "var(--text-light)", marginBottom: "2rem" }}>Termasuk pajak & biaya layanan.</p>
                    
                    <Link href="/checkout" className="btn-primary" style={{ display: "block", textAlign: "center", width: "100%", padding: "1rem", fontSize: "1.1rem", textDecoration: "none" }}>
                        Pesan Sekarang
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
