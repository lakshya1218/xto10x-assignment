import React, { useState } from 'react';
import "./styles.css"

function AddUpdateProduct() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to add/update product');
      }
      setSuccessMessage('Product added/updated successfully');
      // Reset form data after successful submission
      setFormData({
        title: '',
        price: '',
        description: '',
        image: '',
        category: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to add/update product');
    }
  };

  return (
    <div className="form-container">
  <h2>Add/Update Product</h2>
  {errorMessage && <div className="error-message">{errorMessage}</div>}
  {successMessage && <div className="success-message">{successMessage}</div>}
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="form-control"
      />
    </div>
    <div className="form-group">
      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        value={formData.price}
        onChange={handleChange}
        className="form-control"
      />
    </div>
    <div className="form-group">
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="form-control"
      ></textarea>
    </div>
    <div className="form-group">
      <label htmlFor="image">Image URL:</label>
      <input
        type="text"
        id="image"
        name="image"
        value={formData.image}
        onChange={handleChange}
        className="form-control"
      />
    </div>
    <div className="form-group">
      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="form-control"
      />
    </div>
    <button type="submit" className="btn btn-primary">
      Add/Update Product
    </button>
  </form>
</div>

  );
}

export default AddUpdateProduct;
