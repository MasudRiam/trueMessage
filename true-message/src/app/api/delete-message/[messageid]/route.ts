import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import UserModel, { User } from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function DELETE(request: Request, { params }: { params: { messageid: string } }) {

    await dbConnect();
    
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Unauthorized"
        }, {
            status: 401
        });
    }


}   