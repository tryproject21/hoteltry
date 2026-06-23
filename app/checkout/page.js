"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Checkout() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handlePayment = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate payment gateway delay
        setTimeout(() => {
            router.push("/success");
        }, 3000);
    };

    return (
        <main style={{ padding: "120px 5% 5rem", backgroundColor: "var(--secondary-color)", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
            <div style={{ maxWidth: "600px", width: "100%", backgroundColor: "var(--white)", padding: "3rem", borderRadius: "20px", boxShadow: "var(--shadow)" }}>
                <h1 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center" }}>Detail Pemesanan</h1>
                
                <form onSubmit={handlePayment} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label style={{ fontWeight: 600 }}>Nama Lengkap</label>
                        <input type="text" required style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", fontFamily: "inherit" }} placeholder="John Doe" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label style={{ fontWeight: 600 }}>Email</label>
                        <input type="email" required style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", fontFamily: "inherit" }} placeholder="john@example.com" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label style={{ fontWeight: 600 }}>Nomor HP</label>
                        <input type="tel" required style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", fontFamily: "inherit" }} placeholder="08123456789" />
                    </div>
                    <div style={{ padding: "1.5rem", backgroundColor: "var(--secondary-color)", borderRadius: "10px", marginTop: "1rem" }}>
                        <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>Metode Pembayaran (Mock)</h3>
                        <p style={{ color: "var(--text-light)", fontSize: "0.9rem", marginBottom: "1rem" }}>Simulasi integrasi Payment Gateway. Klik bayar untuk melanjutkan proses.</p>
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary" style={{ padding: "1rem", fontSize: "1.1rem", marginTop: "1rem", opacity: loading ? 0.7 : 1, border: "none", cursor: loading ? "wait" : "pointer" }}>
                        {loading ? "Memproses Pembayaran..." : "Bayar Sekarang"}
                    </button>
                </form>
            </div>
        </main>
    );
}
