import { useNavigate, useParams } from "react-router-dom"
import { getProductById } from "../data/products";
import { useEffect, useState } from "react";

export default function ProductDetails() {

  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  
  useEffect(()=>{
   function getProduct(){
     const product = getProductById(id);
   if(!product){
    navigate("/")
    return;
   }
   setProduct(product)
   } 
   getProduct()
   
  },[id])
  if(!product) return <p>Loading...</p>

  return (
    <div className="page">
   <div className="container">
    <div className="product-detail">
    <div className="product-detail-image">
      <img src={product.image} alt={product.name} />
    </div>
    <div className="product-detail-content">
    <h1 className="product-detail-name">{product.name}</h1>
    <p className="product-detail-price">{product.price}</p>
    <p className="product-detail-description">{product.description}</p>
    <button className="btn btn-primary">Add to Cart</button>
    </div>
    </div>

   </div>
    </div>
  )
}
