import "dotenv/config";
import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/utils/connectToDb";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { name, urgency, area } = JSON.parse(req.body);
    const db = await connectToDatabase(process.env.MONGO_URL!);
    const collection = db.collection("treatments");
    const treatments = await collection.insertOne({ name, urgency, center: area });

    res.status(200).json({ message: "Done", treatments });
}