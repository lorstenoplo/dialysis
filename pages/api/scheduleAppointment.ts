import "dotenv/config";
import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/utils/connectToDb";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { name, age, area, problem } = JSON.parse(req.body);
    const db = await connectToDatabase(process.env.MONGO_URL!);
    const collection = db.collection("appointments");
    const appointments = await collection.insertOne({ name, age, center: area, problem });

    res.status(200).json({ message: "Done", appointments });
}