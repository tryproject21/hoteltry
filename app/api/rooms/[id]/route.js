import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const { id } = await params;
    const data = await request.json();
    
    const updatedRoom = await prisma.room.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        longDescription: data.longDescription,
        price: parseFloat(data.price),
        image: data.image,
        amenities: JSON.stringify(data.amenities || []),
        gallery: JSON.stringify(data.gallery || [])
      }
    });
    return NextResponse.json(updatedRoom);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const { id } = await params;
    await prisma.room.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
