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
  } 
  
  if (method === "GET") {
    if (req.query?.id) {
      const product = await Product.findOne({ _id: req.query.id })
      res.status(200).json(product)
    } else {
      const products = await Product.find()
      res.status(200).json(products)
    }
  }

  if (method === "PUT") {
    const { title, description, price, _id } = req.body
    await Product.updateOne({_id}, { title, description, price })
    res.status(200).json({ message: "product updated successful" })
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id })
      res.status(200).json({ message: "product deleted successfully" })
    }
  }
}
