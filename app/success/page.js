import Link from "next/link";

export default function Success() {
    return (
        <main style={{ padding: "120px 5% 5rem", backgroundColor: "var(--secondary-color)", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ maxWidth: "500px", width: "100%", backgroundColor: "var(--white)", padding: "4rem 3rem", borderRadius: "20px", boxShadow: "var(--shadow)", textAlign: "center" }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
                <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--primary-color)" }}>Pembayaran Berhasil!</h1>
                <p style={{ color: "var(--text-light)", marginBottom: "2.5rem", lineHeight: "1.6" }}>
                    Terima kasih telah memesan kamar di Maxone Hotel. E-voucher dan detail pesanan telah dikirim ke email Anda.
                </p>
                <Link href="/" className="btn-outline" style={{ display: "inline-block", textDecoration: "none", width: "100%", padding: "1rem" }}>
                    Kembali ke Beranda
                </Link>
            </div>
        </main>
    );
}
