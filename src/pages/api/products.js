// Next.js API route support: https://nextjs.org/docs/api-routes/introduction 
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"

export default async function handler(req, res) {
  const { method } = req

  await mongooseConnect()
  
  if (method === "POST") {
    const { title, description, price } = req.body
    const productDoc = await Product.create({
      title, description, price
    }) 
    res.status(200).json({ ...productDoc })
  } else {
    const products = await Product.find()
    res.status(200).json(products)
  }
}
