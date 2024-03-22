// https://fakestoreapi.com/products

import React, { useEffect , useState} from "react";
import Card from "../cards/component";
import { getProducts } from "../FetchedItems";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux_store/action/productsAction";
import { updateProductWithItsCount } from "./helperMethods";
import  SidePanel  from "../SidePannel/component"
import Pagination from "./pajination";

export default function Body() {
  let dispatch = useDispatch();
  let { products, productCart } = useSelector((state) => state);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  // sessionStorage.setItem("productCart", JSON.stringify(productCart));

  useEffect(() => {
    async function fetchData() {
      const limit = 10; 
      const products = await getProducts(currentPage, limit);
      dispatch(setProducts(products.data.products)); 
    }
    fetchData();
  }, [dispatch, currentPage]);


  useEffect(() => {
    applyFilters({ searchQuery: '', category: '', priceRange: null });
  }, [products, productCart]);

  const applyFilters = ({ searchQuery, category, priceRange }) => {
    const filtered = filterProducts(products, searchQuery, category, priceRange);
    const updatedProductsWithCount = updateProductWithItsCount(filtered, productCart);
    setFilteredProducts(updatedProductsWithCount);
  };


  const filterProducts = (products, searchQuery, category, priceRange) => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!category || product.category === category) &&
      (!priceRange ||
        (product.price >= priceRange[0] && product.price <= priceRange[1]))
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); 
  };

  return (
    <div className="product__container ">
      <div>
      <SidePanel applyFilters={applyFilters} setPriceRange={setPriceRange} /> 
      </div>
      <div className="product__subcontainer flex-function">
        {filteredProducts.map((item, index) => (
          <Card
            item={item}
            id={index + 1}
            key={Math.random() * products.length + index}
          />
        ))}
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
