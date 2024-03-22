import axios from "axios";
export async function getProducts(page, limit) {
  //   let dispatch = useDispatch();
  let url = `http://localhost:5000/api/products?page=${page}&limit=${limit}`;
  const products = await axios.get(url).catch((err) => console.log(err));
  console.log("products from backend", products.data)
  return products;
}

export async function getProductsWithId(id) {
  //   let dispatch = useDispatch();
  let url = `https://fakestoreapi.com/products/${id}`;
  const products = await axios.get(url).catch((err) => console.log(err));
  return products;
}
