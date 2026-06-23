import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (id) {
      const room = await prisma.room.findUnique({ where: { id } });
      if (!room) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(room);
    }
    const rooms = await prisma.room.findMany();
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const data = await request.json();
    const newRoom = await prisma.room.create({
      data: {
        id: data.id,
        name: data.name,
        description: data.description,
        longDescription: data.longDescription,
        price: parseFloat(data.price),
        image: data.image || "/assets/deluxe.png",
        amenities: JSON.stringify(data.amenities || []),
        gallery: JSON.stringify(data.gallery || [])
      }
    });
    return NextResponse.json(newRoom);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
