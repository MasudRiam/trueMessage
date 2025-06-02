import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


export async function POST(request: Request) {
    await dbConnect ();


    try {
        const {username, code} = await request.json();

        decodeURIComponent(username)
        
    } catch (error) {
        return Response.json({
            success: false,
            message: "Invalid verify code request"
        }, {
            status: 500
        });
        
    }
}