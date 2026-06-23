"use client";
import { useBookingStore } from "../store/bookingStore";

export default function SearchForm() {
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
  );
}
