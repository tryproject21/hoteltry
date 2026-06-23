"use client";
import Image from "next/image";
import Link from "next/link";
import { rooms } from "../data/rooms";
import { useRouter } from "next/navigation";
import { useBookingStore } from "../store/bookingStore";

export default function Home() {
  const router = useRouter();
  const { checkIn, checkOut, guests, setBookingDetails } = useBookingStore();

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
      <header id="home" className="hero">
        <div className="hero-content">
          <h1 className="fade-in-up">Kenyamanan Sempurna, <br />Pengalaman Luar Biasa</h1>
          <p className="fade-in-up delay-1">Temukan ketenangan dan kemewahan dalam balutan desain minimalis modern bernuansa putih yang menenangkan. Kami hadirkan kenyamanan kelas dunia eksklusif untuk Anda.</p>
          <div className="fade-in-up delay-2">
            <Link href="#rooms" className="btn-primary btn-large">Eksplorasi Kamar</Link>
          </div>
        </div>
        <div className="hero-image">
          <Image src="/assets/hero.png" alt="Maxone Hotel Facade" width={700} height={450} style={{ objectFit: "cover", borderRadius: "30px" }} priority />
        </div>
      </header>

      <section className="booking-form-section fade-in-up delay-3">
        <form onSubmit={handleSearch} className="floating-form">
            <div className="form-group">
                <label>Check-in</label>
                <input type="date" value={checkIn} onChange={(e) => setBookingDetails({ checkIn: e.target.value })} required />
            </div>
            <div className="form-group">
                <label>Check-out</label>
                <input type="date" value={checkOut} onChange={(e) => setBookingDetails({ checkOut: e.target.value })} required />
            </div>
            <div className="form-group">
                <label>Jumlah Tamu</label>
                <select value={guests} onChange={(e) => setBookingDetails({ guests: Number(e.target.value) })}>
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang</option>
                </select>
            </div>
            <button type="submit" className="btn-primary" style={{ height: "56px", padding: "0 3rem" }}>Cari Ketersediaan</button>
        </form>
      </section>

      <section id="rooms" className="rooms-section">
        <div className="section-header fade-in-up">
          <h2>Koleksi Kamar Kami</h2>
          <p>Pilih kenyamanan sesuai dengan gaya hidup dan kebutuhan Anda.</p>
        </div>
        <div className="rooms-grid">
          {rooms.map((room, index) => (
            <div className={`room-card fade-in-up delay-${index + 1}`} key={room.id}>
              <div style={{ position: "relative", width: "100%", height: "350px" }}>
                <Image src={room.image} alt={room.name} fill style={{ objectFit: "cover" }} />
              </div>
              <div className="room-info">
                <h3>{room.name}</h3>
                <p>{room.description}</p>
                <div className="price">Rp {room.price.toLocaleString("id-ID")} <span>/ malam</span></div>
                <Link href={`/rooms/${room.id}`} className="btn-outline" style={{ width: "100%" }}>Lihat Detail</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="amenities" style={{ padding: "8rem 5%", backgroundColor: "var(--secondary-color)" }}>
          <div className="section-header fade-in-up">
              <h2>Fasilitas Premium</h2>
              <p>Nikmati layanan berkelas internasional untuk menyempurnakan masa inap Anda.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2.5rem", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
              <div className="fade-in-up delay-1" style={{ padding: "3rem 2rem", backgroundColor: "var(--white)", borderRadius: "24px", boxShadow: "var(--shadow)", transition: "var(--transition)" }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <h3 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>🏊 Kolam Renang Infinity</h3>
                  <p style={{ color: "var(--text-light)", fontSize: "1rem" }}>Kolam renang luas dengan pemandangan cakrawala kota yang menakjubkan.</p>
              </div>
              <div className="fade-in-up delay-2" style={{ padding: "3rem 2rem", backgroundColor: "var(--white)", borderRadius: "24px", boxShadow: "var(--shadow)", transition: "var(--transition)" }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <h3 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>🍽️ Fine Dining</h3>
                  <p style={{ color: "var(--text-light)", fontSize: "1rem" }}>Sajian hidangan *gourmet* internasional oleh chef berbintang Michelin.</p>
              </div>
              <div className="fade-in-up delay-3" style={{ padding: "3rem 2rem", backgroundColor: "var(--white)", borderRadius: "24px", boxShadow: "var(--shadow)", transition: "var(--transition)" }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <h3 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>💆 Spa & Relaksasi</h3>
                  <p style={{ color: "var(--text-light)", fontSize: "1rem" }}>Perawatan tubuh mewah dan aromaterapi untuk memanjakan diri Anda.</p>
              </div>
          </div>
      </section>

      <section id="gallery" className="gallery-section">
        <div className="section-header fade-in-up">
          <h2>Jelajahi Maxone</h2>
          <p>Sudut-sudut estetik dan fasilitas modern di hotel kami.</p>
        </div>
        <div className="gallery-grid">
          <div className="gallery-item fade-in-up"><Image src="/assets/gallery1.png" alt="Swimming Pool" fill style={{ objectFit: "cover" }} /></div>
          <div className="gallery-item fade-in-up delay-1"><Image src="/assets/gallery2.png" alt="Restaurant" fill style={{ objectFit: "cover" }} /></div>
          <div className="gallery-item fade-in-up delay-2"><Image src="/assets/gallery3.png" alt="Bathroom" fill style={{ objectFit: "cover" }} /></div>
          <div className="gallery-item fade-in-up delay-3"><Image src="/assets/hero.png" alt="Lobby" fill style={{ objectFit: "cover" }} /></div>
        </div>
      </section>
    </main>
  );
}
