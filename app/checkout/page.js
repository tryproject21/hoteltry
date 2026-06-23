"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "../../store/bookingStore";
import { rooms } from "../../data/rooms";

export default function Checkout() {
    const router = useRouter();
    const { checkIn, checkOut, guests, selectedRoomId } = useBookingStore();
    const [loading, setLoading] = useState(false);
    
    const [guestName, setGuestName] = useState("");
    const [guestEmail, setGuestEmail] = useState("");
    const [guestPhone, setGuestPhone] = useState("");

    const room = rooms.find(r => r.id === selectedRoomId);

    useEffect(() => {
        if (!selectedRoomId) {
            router.push("/");
        }
    }, [selectedRoomId, router]);

    if (!room) return null;

    // Calculate days and total price
    const ci = checkIn ? new Date(checkIn) : new Date();
    const co = checkOut ? new Date(checkOut) : new Date(new Date().setDate(new Date().getDate() + 1));
    const days = Math.max(1, Math.ceil((co - ci) / (1000 * 60 * 60 * 24)));
    const totalPrice = room.price * days;

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    roomId: room.id,
                    guestName,
                    guestEmail,
                    guestPhone,
                    checkIn: ci.toISOString(),
                    checkOut: co.toISOString(),
                    guestsCount: guests,
                    totalPrice
                })
            });

            if (res.ok) {
                router.push("/success");
            } else {
                alert("Terjadi kesalahan saat memproses pesanan.");
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            alert("Gagal menghubungi server.");
            setLoading(false);
        }
    };

    return (
        <main style={{ padding: "120px 5% 5rem", backgroundColor: "var(--secondary-color)", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
            <div style={{ maxWidth: "800px", width: "100%", backgroundColor: "var(--white)", padding: "3rem", borderRadius: "20px", boxShadow: "var(--shadow)" }}>
                <h1 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center" }}>Detail Pemesanan</h1>
                
                <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "2rem" }}>
                    <div style={{ flex: 1, padding: "1.5rem", backgroundColor: "var(--secondary-color)", borderRadius: "15px" }}>
                        <h3 style={{ marginBottom: "0.5rem" }}>{room.name}</h3>
                        <p style={{ margin: "0.3rem 0", color: "var(--text-light)" }}>Check-in: {ci.toLocaleDateString("id-ID")}</p>
                        <p style={{ margin: "0.3rem 0", color: "var(--text-light)" }}>Check-out: {co.toLocaleDateString("id-ID")}</p>
                        <p style={{ margin: "0.3rem 0", color: "var(--text-light)" }}>Durasi: {days} malam ({guests} Tamu)</p>
                        <div style={{ marginTop: "1rem", fontSize: "1.2rem", fontWeight: "bold", color: "var(--primary-color)" }}>
                            Total: Rp {totalPrice.toLocaleString("id-ID")}
                        </div>
                    </div>
                </div>

                <form onSubmit={handlePayment} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label style={{ fontWeight: 600 }}>Nama Lengkap</label>
                        <input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} required style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", fontFamily: "inherit" }} placeholder="John Doe" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label style={{ fontWeight: 600 }}>Email</label>
                        <input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} required style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", fontFamily: "inherit" }} placeholder="john@example.com" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label style={{ fontWeight: 600 }}>Nomor HP</label>
                        <input type="tel" value={guestPhone} onChange={e => setGuestPhone(e.target.value)} required style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", fontFamily: "inherit" }} placeholder="08123456789" />
                    </div>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--secondary-color)", borderRadius: "10px", marginTop: "1rem" }}>
                        <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>Metode Pembayaran (Mock)</h3>
                        <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginBottom: "1rem" }}>Sistem ini terhubung langsung dengan SQLite. Klik bayar untuk memproses pesanan Anda dan menyimpannya ke database.</p>
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary" style={{ padding: "1rem", fontSize: "1.1rem", marginTop: "1rem", opacity: loading ? 0.7 : 1, border: "none", cursor: loading ? "wait" : "pointer" }}>
                        {loading ? "Memproses Pembayaran..." : "Bayar Sekarang"}
                    </button>
                </form>
            </div>
        </main>
    );
}
