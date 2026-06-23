"use client";
export default function PrintButton() {
    return (
        <button onClick={() => window.print()} className="btn-primary no-print" style={{ padding: "1rem 2rem", fontSize: "1.1rem", border: "none", cursor: "pointer" }}>
            Cetak / Unduh PDF
        </button>
    );
}
