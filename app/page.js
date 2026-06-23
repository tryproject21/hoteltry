"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { rooms } from "../data/rooms";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      alert("Mohon isi tanggal Check-in dan Check-out");
      return;
    }
    document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      {/* Hero Section */}
      <header id="home" className="hero">
        <div className="hero-content">
          <h1>Kenyamanan Sempurna, <br />Pengalaman Luar Biasa</h1>
          <p>Temukan ketenangan dan kemewahan dalam balutan desain minimalis modern bernuansa putih yang menenangkan. Kami hadirkan kenyamanan kelas dunia untuk Anda.</p>
          <Link href="#rooms" className="btn-primary btn-large" style={{ textDecoration: "none", display: "inline-block" }}>Lihat Kamar</Link>
        </div>
        <div className="hero-image">
          <Image src="/assets/hero.png" alt="Maxone Hotel Facade" width={600} height={400} style={{ objectFit: "cover", borderRadius: "20px" }} priority />
        </div>
      </header>

      {/* Booking Form Section */}
      <section className="booking-form-section" style={{ padding: "2rem 5%", backgroundColor: "var(--white)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-end", maxWidth: "1000px", margin: "0 auto", backgroundColor: "var(--secondary-color)", padding: "2rem", borderRadius: "15px", boxShadow: "var(--shadow)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1, minWidth: "200px" }}>
                <label style={{ fontWeight: 600, fontSize: "0.9rem" }}>Check-in</label>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} style={{ padding: "0.8rem", border: "1px solid #ddd", borderRadius: "8px", fontFamily: "inherit" }} required />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1, minWidth: "200px" }}>
                <label style={{ fontWeight: 600, fontSize: "0.9rem" }}>Check-out</label>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} style={{ padding: "0.8rem", border: "1px solid #ddd", borderRadius: "8px", fontFamily: "inherit" }} required />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1, minWidth: "200px" }}>
                <label style={{ fontWeight: 600, fontSize: "0.9rem" }}>Tamu</label>
                <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} style={{ padding: "0.8rem", border: "1px solid #ddd", borderRadius: "8px", fontFamily: "inherit" }}>
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang</option>
                </select>
            </div>
            <button type="submit" className="btn-primary" style={{ height: "46px", padding: "0 2rem" }}>Cari Kamar</button>
        </form>
      </section>

      {/* Room Types Section */}
      <section id="rooms" className="rooms-section">
        <div className="section-header">
          <h2>Tipe Kamar</h2>
          <p>Pilih kenyamanan sesuai dengan gaya dan kebutuhan Anda.</p>
        </div>
        <div className="rooms-grid">
          {rooms.map(room => (
            <div className="room-card" key={room.id}>
              <div style={{ position: "relative", width: "100%", height: "300px" }}>
                <Image src={room.image} alt={room.name} fill style={{ objectFit: "cover" }} />
              </div>
              <div className="room-info">
                <h3>{room.name}</h3>
                <p>{room.description}</p>
                <div className="price">Rp {room.price.toLocaleString("id-ID")} <span>/ malam</span></div>
                <Link href={`/rooms/${room.id}`} className="btn-outline" style={{ display: "inline-block", textAlign: "center", textDecoration: "none" }}>Detail & Pesan</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" style={{ padding: "6rem 5%", backgroundColor: "var(--secondary-color)" }}>
          <div className="section-header">
              <h2>Fasilitas Hotel</h2>
              <p>Nikmati layanan premium untuk menyempurnakan masa inap Anda.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
              <div style={{ padding: "2rem", backgroundColor: "var(--white)", borderRadius: "15px", boxShadow: "var(--shadow)" }}>
                  <h3 style={{ marginBottom: "1rem" }}>🏊 Kolam Renang</h3>
                  <p style={{ color: "var(--text-light)", fontSize: "0.95rem" }}>Kolam renang luas dengan pemandangan terbuka, cocok untuk bersantai di sore hari.</p>
              </div>
              <div style={{ padding: "2rem", backgroundColor: "var(--white)", borderRadius: "15px", boxShadow: "var(--shadow)" }}>
                  <h3 style={{ marginBottom: "1rem" }}>🍽️ Restoran Mewah</h3>
                  <p style={{ color: "var(--text-light)", fontSize: "0.95rem" }}>Sajian hidangan lokal dan internasional yang dimasak oleh chef berpengalaman.</p>
              </div>
              <div style={{ padding: "2rem", backgroundColor: "var(--white)", borderRadius: "15px", boxShadow: "var(--shadow)" }}>
                  <h3 style={{ marginBottom: "1rem" }}>💆 Spa & Wellness</h3>
                  <p style={{ color: "var(--text-light)", fontSize: "0.95rem" }}>Fasilitas pijat dan perawatan tubuh untuk relaksasi maksimal.</p>
              </div>
              <div style={{ padding: "2rem", backgroundColor: "var(--white)", borderRadius: "15px", boxShadow: "var(--shadow)" }}>
                  <h3 style={{ marginBottom: "1rem" }}>💪 Gym Center</h3>
                  <p style={{ color: "var(--text-light)", fontSize: "0.95rem" }}>Pusat kebugaran dengan peralatan modern dan lengkap.</p>
              </div>
          </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section">
        <div className="section-header">
          <h2>Galeri Kami</h2>
          <p>Jelajahi fasilitas modern dan sudut-sudut estetik dari Maxone Hotel.</p>
        </div>
        <div className="gallery-grid">
          <div className="gallery-item"><Image src="/assets/gallery1.png" alt="Swimming Pool" fill style={{ objectFit: "cover" }} /></div>
          <div className="gallery-item"><Image src="/assets/gallery2.png" alt="Restaurant" fill style={{ objectFit: "cover" }} /></div>
          <div className="gallery-item"><Image src="/assets/gallery3.png" alt="Bathroom" fill style={{ objectFit: "cover" }} /></div>
          <div className="gallery-item"><Image src="/assets/hero.png" alt="Lobby" fill style={{ objectFit: "cover" }} /></div>
        </div>
      </section>
    </main>
  );
}
