import Layout from "@/components/layout";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import axios from "axios"

export default function DeleteProduct() {

  const [ productInfo, setProductInfo ] = useState()
  const router = useRouter()

  const { id } = router.query

  useEffect(() => {
    if (!id) {
      return
    }

    axios.get(`/api/products/?id=${id}`)
    .then(response => setProductInfo(response.data))

    return () => {}
  }, [id])

  const deleteProduct = async () => {
    await axios.delete(`/api/products/?id=${id}`)
    goBack()
  }
  const goBack = () => router.push("/products")

  return (
    <Layout>
      <h1 className="text-center">Do you really want to delete product "{productInfo?.title}"?</h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>Yes</button>
        <button className="btn-default" onClick={goBack}>No</button>
      </div>
    </Layout>
  )
}