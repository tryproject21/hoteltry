"use client";
import { useRouter } from "next/navigation";
import { useBookingStore } from "../store/bookingStore";

export default function BookingButton({ roomId }) {
    const router = useRouter();
    const { setBookingDetails } = useBookingStore();

    const handleBooking = () => {
        setBookingDetails({ selectedRoomId: roomId });
        router.push("/checkout");
    };

    return (
        <button onClick={handleBooking} className="btn-primary" style={{ display: "block", textAlign: "center", width: "100%", padding: "1rem", fontSize: "1.1rem", textDecoration: "none", border: "none", cursor: "pointer" }}>
            Lanjutkan Pemesanan
        </button>
    );
}
