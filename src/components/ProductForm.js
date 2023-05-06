import { useState } from "react";
import { useRouter } from "next/router"
import axios from "axios"

export default function ProductForm({
  _id,
  title: editTitle,
  description: editDescription,
  price: editPrice
}) {
  const [title, setTitle] = useState(editTitle);
  const [description, setDescription] = useState(editDescription);
  const [price, setPrice] = useState(editPrice);

  const [goToProducts, setGoToProducts] = useState(false)
  console.log("from ProductForm data is", { title, description, price })

  const router = useRouter()

  const saveProduct = async (evt) => {
    evt.preventDefault();
    const data = { title, description, price }
    if (_id) {
      // update 
      await axios.put("/api/products", { ...data, _id })
    } else {
      await axios.post("/api/products", data)
    }
    setGoToProducts(true)
  }

  if(goToProducts) {
    router.push("/products")
  }

  return (
    <form onSubmit={saveProduct}>
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
  );
}
