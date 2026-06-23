import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import PrintButton from "../../../components/PrintButton";
import Image from "next/image";

export default async function InvoicePage({ params }) {
    const { id } = await params;
    const booking = await prisma.booking.findUnique({
        where: { id },
        include: { room: true }
    });

    if (!booking) {
        notFound();
    }

    const nights = Math.max(1, Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24)));

    return (
        <main style={{ padding: "120px 5% 5rem", backgroundColor: "var(--secondary-color)", minHeight: "100vh", display: "flex", justifyContent: "center" }} className="invoice-container">
            <div className="invoice-box" style={{ maxWidth: "800px", width: "100%", backgroundColor: "var(--white)", padding: "3rem", borderRadius: "10px", boxShadow: "var(--shadow)" }}>
                
                {/* Header Invoice */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #eee", paddingBottom: "2rem", marginBottom: "2rem" }}>
                    <div>
                        <h1 style={{ fontSize: "2rem", color: "var(--primary-color)", marginBottom: "0.5rem" }}>MAXONE HOTEL</h1>
                        <p style={{ color: "var(--text-light)" }}>Jl. Jenderal Sudirman No. 123, Jakarta<br/>Telepon: (021) 1234-5678</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <h2 style={{ fontSize: "1.8rem", letterSpacing: "2px", color: "#555" }}>INVOICE</h2>
                        <p style={{ fontWeight: "bold", fontSize: "1.1rem", marginTop: "0.5rem", fontFamily: "monospace" }}>#{booking.id.toUpperCase().slice(0, 8)}</p>
                        <p style={{ color: "var(--text-light)" }}>Tanggal: {new Date(booking.createdAt).toLocaleDateString("id-ID")}</p>
                    </div>
                </div>

                {/* Detail Tamu & Status */}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "2rem" }}>
                    <div>
                        <h3 style={{ marginBottom: "0.5rem", color: "#555" }}>Ditagihkan Kepada:</h3>
                        <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{booking.guestName}</p>
                        <p style={{ color: "var(--text-light)" }}>{booking.guestEmail}</p>
                        <p style={{ color: "var(--text-light)" }}>{booking.guestPhone}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <h3 style={{ marginBottom: "0.5rem", color: "#555" }}>Status Pembayaran:</h3>
                        <div style={{ display: "inline-block", padding: "0.5rem 1.5rem", backgroundColor: booking.status === "PAID" ? "#e6f4ea" : "#fce8e6", color: booking.status === "PAID" ? "#1e8e3e" : "#d93025", borderRadius: "5px", fontWeight: "bold", border: `1px solid ${booking.status === "PAID" ? "#1e8e3e" : "#d93025"}` }}>
                            {booking.status === "PAID" ? "LUNAS" : "BELUM LUNAS"}
                        </div>
                    </div>
                </div>

                {/* Tabel Rincian */}
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "2rem", minWidth: "500px" }}>
                        <thead>
                            <tr style={{ backgroundColor: "var(--primary-color)", color: "white" }}>
                                <th style={{ padding: "1rem", textAlign: "left" }}>Deskripsi</th>
                                <th style={{ padding: "1rem", textAlign: "center" }}>Check-In</th>
                                <th style={{ padding: "1rem", textAlign: "center" }}>Check-Out</th>
                                <th style={{ padding: "1rem", textAlign: "right" }}>Durasi</th>
                                <th style={{ padding: "1rem", textAlign: "right" }}>Jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "1.5rem 1rem", fontWeight: "bold" }}>{booking.room.name} <br/><span style={{ fontWeight: "normal", fontSize: "0.9rem", color: "var(--text-light)" }}>{booking.guestsCount} Tamu</span></td>
                                <td style={{ padding: "1.5rem 1rem", textAlign: "center" }}>{new Date(booking.checkIn).toLocaleDateString("id-ID")}</td>
                                <td style={{ padding: "1.5rem 1rem", textAlign: "center" }}>{new Date(booking.checkOut).toLocaleDateString("id-ID")}</td>
                                <td style={{ padding: "1.5rem 1rem", textAlign: "right" }}>{nights} Malam</td>
                                <td style={{ padding: "1.5rem 1rem", textAlign: "right", fontWeight: "bold", whiteSpace: "nowrap" }}>Rp {booking.totalPrice.toLocaleString("id-ID")}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Syarat dan Ketentuan */}
                <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "2px dashed #eee", color: "var(--text-light)", fontSize: "0.9rem" }}>
                    <h4 style={{ color: "#555", marginBottom: "0.5rem" }}>Syarat & Ketentuan:</h4>
                    <ul style={{ paddingLeft: "1.2rem", lineHeight: "1.6" }}>
                        <li>Harap tunjukkan E-Voucher ini beserta Kartu Identitas asli saat Check-in.</li>
                        <li>Waktu Check-in adalah pukul 14:00 waktu setempat, dan Check-out pada pukul 12:00.</li>
                        <li>Pemesanan yang telah dibayar lunas tidak dapat dibatalkan (Non-Refundable).</li>
                    </ul>
                </div>

                {/* Action Buttons (Hidden on Print) */}
                <div className="no-print" style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "3rem" }}>
                    <Link href="/" className="btn-outline" style={{ padding: "1rem 2rem", textDecoration: "none", fontSize: "1.1rem", display: "inline-block" }}>
                        Kembali ke Beranda
                    </Link>
                    <PrintButton />
                </div>
            </div>
        </main>
    );
}
