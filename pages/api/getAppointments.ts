import "dotenv/config";
import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/utils/connectToDb";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { center } = JSON.parse(req.body);

    const db = await connectToDatabase(process.env.MONGO_URL!);
    const collection = db.collection("appointments");
    const appointments = await collection.find({ center }).toArray();

    res.status(200).json({ appointments });
}