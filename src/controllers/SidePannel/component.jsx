import React, { useState } from "react";
import "./styles.css"

function SidePanel({ applyFilters }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleApplyFilters = () => {
    // Apply filters and search query
    applyFilters({ searchQuery, category, priceRange });
  };

  return (
    <div className="side-panel">
      <h2>Filters</h2>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="jewelery">Jewelry</option>
        </select>
        </div>
      <div className="price-filters">
      <h3>Price Range:</h3>
        <button onClick={() => setPriceRange([0, 10])}>₹0 - ₹10</button>
        <button onClick={() => setPriceRange([10, 20])}>₹10 - ₹20</button>
        <button onClick={() => setPriceRange([20, 50])}>₹20 - ₹50</button>
        <button onClick={() => setPriceRange([50, 100])}>₹50 - ₹100</button>
      </div>
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
}

export default SidePanel;
