import { useState } from "react";
import { useRouter } from "next/router"
import axios from "axios"

export default function ProductForm({ title, description, price }) {
  const [$title, $setTitle] = useState(title || "");
  const [$description, $setDescription] = useState(description || "");
  const [$price, $setPrice] = useState(price || "");

  const [goToProducts, setGoToProducts] = useState(false)
  console.log("from ProductForm data is", { $title, $description, $price })

  const router = useRouter()

  const createProduct = async (evt) => {
    evt.preventDefault();
    const data = { $title, $description, $price }
    await axios.post("/api/products", data)
    setGoToProducts(true)
  }

  if(goToProducts) {
    router.push("/products")
  }

  return (
    <form onSubmit={createProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="product name"
        value={$title}
        required
        onChange={(ev) => $setTitle(ev.target.value)}
      />
      <label>Description</label>
      <textarea
        placeholder="description"
        value={$description}
        onChange={(ev) => $setDescription(ev.target.value)}
      ></textarea>
      <label>Price (in USD)</label>
      <input
        type="number"
        placeholder="price"
        value={$price}
        onChange={(ev) => $setPrice(ev.target.value)}
      /> 
      <button type="submit" className="btn-primary">Save</button>
    </form>
  );
}
