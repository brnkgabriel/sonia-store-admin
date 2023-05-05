import Layout from "@/components/layout";
import { useState } from "react";
import { useRouter } from "next/router"
import axios from "axios"

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [goToProducts, setGoToProducts] = useState(false)

  const router = useRouter()

  const createProduct = async (evt) => {
    evt.preventDefault();
    const data = { title, description, price }
    await axios.post("/api/products", data)
    setGoToProducts(true)
  }

  if(goToProducts) {
    router.push("/products")
  }

  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1>New Product</h1>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="product name"
          value={title}
          required
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label>Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></textarea>
        <label>Price (in USD)</label>
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        /> 
        <button type="submit" className="btn-primary">Save</button>
      </form>
    </Layout>
  );
}
