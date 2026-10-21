import prisma from "@/lib/prisma";

// Handle การดึงข้อมูลแบบมีเงื่อนไข PK-id
// GET (Read)
export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    //
    const { id } = await params;

    // 
    try {
        //
        const result = await prisma.product.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!result) {
            return Response.json({message: "ไม่พบข้อมูล"}, {status: 404});
        }
        return Response.json(result, { status: 200 });
    }catch (error) {
        // เกิดข้อผิดพลาดในการเพิ่มข้อมูล
        console.error("Failed for: ", error);
        return Response.json(
            {message: "พบข้อผิดพลาดในการเพิ่มข้อมูล"},
            {status: 500},
        )
    }
}

// Handle การแก้ไขข้อมูลแบบมีเงื่อนไข PK-id
// PUT (Update)
export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    const body = await request.json();

    const { id } = await params;

    try {
        const result = await prisma.product.update({
            where: {
                id: Number(id),
            },
            data: {
                proName: body.proName,
                proPrice: body.proPrice,
                proQuantity: body.proQuantity,
                proDescription: body.proDescription,
            },
        });

        return Response.json(result, { status: 200 });
    }catch (error) {
        // เกิดข้อผิดพลาดในการเพิ่มข้อมูล
        console.error("Failed for: ", error);
        return Response.json(
            {message: "พบข้อผิดพลาดในการเพิ่มข้อมูล"},
            {status: 500},
        )
    }
}

// Handle การลบข้อมูลแบบมีเงื่อนไข PK-id
// DELETE (Delete)
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    const { id } = await params;

    try {
        const result = await prisma.product.delete({
            where: {
                id: Number(id),
            },
        });

        return Response.json(result, { status: 200 });
    }catch (error) {
        // เกิดข้อผิดพลาดในการเพิ่มข้อมูล
        console.error("Failed for: ", error);
        return Response.json(
            {message: "พบข้อผิดพลาดในการเพิ่มข้อมูล"},
            {status: 500},
        )
    }
}

