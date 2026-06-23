"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RoomManager({ initialRooms }) {
    const router = useRouter();
    const [rooms, setRooms] = useState(initialRooms);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRoom, setCurrentRoom] = useState({
        id: "", name: "", price: 0, description: "", longDescription: "", image: "", amenities: "", gallery: ""
    });

    const handleEdit = (room) => {
        setCurrentRoom({
            ...room,
            amenities: room.amenities ? JSON.parse(room.amenities).join(", ") : "",
            gallery: room.gallery ? JSON.parse(room.gallery).join(", ") : ""
        });
        setIsEditing(true);
    };

    const handleAdd = () => {
        setCurrentRoom({
            id: `room-${Date.now()}`, name: "", price: 0, description: "", longDescription: "", image: "", amenities: "", gallery: ""
        });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (!confirm("Apakah Anda yakin ingin menghapus kamar ini?")) return;
        
        const res = await fetch(`/api/rooms/${id}`, { method: "DELETE" });
        if (res.ok) {
            setRooms(rooms.filter(r => r.id !== id));
            router.refresh();
        } else {
            alert("Gagal menghapus kamar.");
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        const payload = {
            ...currentRoom,
            price: Number(currentRoom.price),
            amenities: currentRoom.amenities.split(",").map(a => a.trim()).filter(a => a),
            gallery: currentRoom.gallery.split(",").map(a => a.trim()).filter(a => a)
        };

        const existing = rooms.find(r => r.id === currentRoom.id);
        const method = existing ? "PUT" : "POST";
        const url = existing ? `/api/rooms/${currentRoom.id}` : `/api/rooms`;

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            const savedRoom = await res.json();
            if (existing) {
                setRooms(rooms.map(r => r.id === savedRoom.id ? savedRoom : r));
            } else {
                setRooms([...rooms, savedRoom]);
            }
            setIsEditing(false);
            router.refresh();
        } else {
            alert("Gagal menyimpan data kamar.");
        }
    };

    if (isEditing) {
        return (
            <div style={{ backgroundColor: "#f9f9f9", padding: "2rem", borderRadius: "10px", border: "1px solid #eee" }}>
                <h2 style={{ marginBottom: "1.5rem" }}>{rooms.find(r => r.id === currentRoom.id) ? "Edit Kamar" : "Tambah Kamar Baru"}</h2>
                <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div style={{ flex: 1 }}>
                            <label>ID Kamar</label>
                            <input readOnly value={currentRoom.id} style={{ width: "100%", padding: "0.8rem", backgroundColor: "#eee" }} />
                        </div>
                        <div style={{ flex: 2 }}>
                            <label>Nama Kamar</label>
                            <input required value={currentRoom.name} onChange={e => setCurrentRoom({...currentRoom, name: e.target.value})} style={{ width: "100%", padding: "0.8rem" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Harga (Rp)</label>
                            <input required type="number" value={currentRoom.price} onChange={e => setCurrentRoom({...currentRoom, price: e.target.value})} style={{ width: "100%", padding: "0.8rem" }} />
                        </div>
                    </div>
                    <div>
                        <label>Deskripsi Singkat</label>
                        <input required value={currentRoom.description} onChange={e => setCurrentRoom({...currentRoom, description: e.target.value})} style={{ width: "100%", padding: "0.8rem" }} />
                    </div>
                    <div>
                        <label>Deskripsi Panjang</label>
                        <textarea required value={currentRoom.longDescription} onChange={e => setCurrentRoom({...currentRoom, longDescription: e.target.value})} style={{ width: "100%", padding: "0.8rem", minHeight: "100px" }} />
                    </div>
                    <div>
                        <label>URL Gambar Utama</label>
                        <input required value={currentRoom.image} onChange={e => setCurrentRoom({...currentRoom, image: e.target.value})} style={{ width: "100%", padding: "0.8rem" }} placeholder="https://..." />
                    </div>
                    <div>
                        <label>URL Galeri (Pisahkan dengan koma)</label>
                        <input value={currentRoom.gallery} onChange={e => setCurrentRoom({...currentRoom, gallery: e.target.value})} style={{ width: "100%", padding: "0.8rem" }} placeholder="https://img1.jpg, https://img2.jpg" />
                    </div>
                    <div>
                        <label>Fasilitas (Pisahkan dengan koma)</label>
                        <input value={currentRoom.amenities} onChange={e => setCurrentRoom({...currentRoom, amenities: e.target.value})} style={{ width: "100%", padding: "0.8rem" }} placeholder="WiFi, Sarapan, Kolam Renang" />
                    </div>
                    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                        <button type="submit" className="btn-primary">Simpan</button>
                        <button type="button" className="btn-outline" onClick={() => setIsEditing(false)}>Batal</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h2>Daftar Kamar</h2>
                <button onClick={handleAdd} className="btn-primary">+ Tambah Kamar</button>
            </div>
            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "800px" }}>
                    <thead>
                        <tr style={{ borderBottom: "2px solid #eee" }}>
                            <th style={{ padding: "1rem" }}>Gambar</th>
                            <th style={{ padding: "1rem" }}>Nama Kamar</th>
                            <th style={{ padding: "1rem" }}>Harga</th>
                            <th style={{ padding: "1rem" }}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(room => (
                            <tr key={room.id} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "1rem" }}><img src={room.image} alt={room.name} style={{ width: "80px", height: "50px", objectFit: "cover", borderRadius: "5px" }} /></td>
                                <td style={{ padding: "1rem", fontWeight: "bold" }}>{room.name}</td>
                                <td style={{ padding: "1rem" }}>Rp {room.price.toLocaleString("id-ID")}</td>
                                <td style={{ padding: "1rem" }}>
                                    <button onClick={() => handleEdit(room)} style={{ marginRight: "1rem", padding: "0.5rem 1rem", cursor: "pointer", backgroundColor: "#e2e8f0", border: "none", borderRadius: "5px" }}>Edit</button>
                                    <button onClick={() => handleDelete(room.id)} style={{ padding: "0.5rem 1rem", cursor: "pointer", backgroundColor: "#fee2e2", color: "#b91c1c", border: "none", borderRadius: "5px" }}>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
