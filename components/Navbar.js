"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo">
                <Link href="/">Maxone Hotel</Link>
            </div>
            <ul className="nav-links">
                <li><Link href="/">Beranda</Link></li>
                <li><Link href="/#rooms">Tipe Kamar</Link></li>
                <li><Link href="/#gallery">Galeri</Link></li>
            </ul>
            <Link href="/#rooms" className="btn-primary">Pesan Sekarang</Link>
        </nav>
    );
}
