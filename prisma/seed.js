const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@maxone.com' },
    update: {},
    create: {
      email: 'admin@maxone.com',
      name: 'Admin Hotel',
      password: hashedPassword,
    },
  });

  // Create rooms
  const rooms = [
    {
        id: "deluxe",
        name: "Deluxe Room",
        description: "Kamar elegan dengan desain minimalis putih dan pencahayaan alami yang cerah. Cocok untuk pelancong bisnis dan pasangan yang menginginkan ketenangan.",
        longDescription: "Kamar Deluxe kami menawarkan harmoni sempurna antara desain modern minimalis dan kenyamanan maksimal. Dengan luas 32 meter persegi, kamar ini dilengkapi dengan tempat tidur berukuran King, pencahayaan alami melalui jendela besar, serta kamar mandi dalam berbalut marmer putih yang memancarkan aura kemewahan.",
        price: 650000,
        image: "/assets/deluxe.png",
        amenities: JSON.stringify(["Free WiFi", "Smart TV 43 inch", "AC", "Coffee Maker", "Mini Fridge", "Rain Shower"]),
        gallery: JSON.stringify(["/assets/deluxe.png", "/assets/gallery3.png"])
    },
    {
        id: "suite",
        name: "Suite Room",
        description: "Kamar mewah, luas, dengan jendela besar yang menghadap kota. Memberikan pengalaman menginap premium dengan fasilitas eksklusif.",
        longDescription: "Rasakan kemewahan tiada tara di Suite Room kami. Menempati area seluas 55 meter persegi, suite ini memiliki area ruang tamu terpisah, kamar mandi mewah dengan bathtub, dan pemandangan kota yang menakjubkan. Sempurna untuk tamu yang menginginkan pelayanan premium.",
        price: 1200000,
        image: "/assets/suite.png",
        amenities: JSON.stringify(["Free WiFi", "Smart TV 55 inch", "AC", "Espresso Machine", "Mini Bar", "Bathtub", "City View"]),
        gallery: JSON.stringify(["/assets/suite.png", "/assets/gallery3.png"])
    }
  ];

  for (const room of rooms) {
    await prisma.room.upsert({
      where: { id: room.id },
      update: room,
      create: room,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
