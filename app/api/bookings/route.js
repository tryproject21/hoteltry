import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { roomId, guestName, guestEmail, guestPhone, checkIn, checkOut, guestsCount, totalPrice } = body;

    const booking = await prisma.booking.create({
      data: {
        roomId,
        guestName,
        guestEmail,
        guestPhone,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guestsCount: parseInt(guestsCount),
        totalPrice: parseFloat(totalPrice),
        status: 'PAID'
      }
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('Booking Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: { room: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
