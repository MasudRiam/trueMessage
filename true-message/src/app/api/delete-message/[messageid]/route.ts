import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import UserModel, { User } from "@/model/User";
import dbConnect from "@/lib/dbConnect";

export async function DELETE(request: Request, { params }: { params: { messageid: string } }) {
    const messageId = params.messageid;

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

    try {
       const updateResult = await UserModel.updateOne ({_id: user._id},
            {$pull: { messages: {_id: messageId} }}
        )

        if (updateResult.modifiedCount == 0) {
            return Response.json({
                success: false,
                message: "Message not found or already deleted"
            }, {
                status: 404
            });
        }

        return Response.json({
            success: true,
            message: "Message deleted successfully"
        }, {
            status: 200
        });



    } catch (error) {
        console.error("Error deleting message:", error);
        return Response.json({
            success: false,
            message: "Internal Server Error"
        }, {
            status: 500
        });
    }


}   