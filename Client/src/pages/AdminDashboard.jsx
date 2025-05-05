import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { ProductStore } from "../store/ProductStore";

// Utility for retrying failed requests
const retryRequest = async (operation, maxRetries = 3, delayMs = 2000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (error.message.includes("Request Timeout") && attempt < maxRetries) {
        console.log(
          `Frontend Retry Attempt ${attempt}: Retrying in ${delayMs}ms...`
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }
      throw error;
    }
  }
};

const AdminDashboard = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { products, fetchProducts, loading, addProduct, deleteProduct } =
    ProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productCategory ||
      !productImage
    ) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", parseFloat(productPrice));
    formData.append("category", productCategory);
    formData.append("image", productImage);

    console.log("FormData Contents:", Object.fromEntries(formData));
    try {
      const operation = () => addProduct(formData);
      await retryRequest(operation);
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setProductCategory("");
      setProductImage(null);
      setSuccess("Product added successfully!");
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error("Add Product Frontend Error:", err.message);
      setError(err.message || "Failed to add product. Please try again.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const operation = () => deleteProduct(productId);
        await retryRequest(operation);
        setSuccess("Product deleted successfully!");
        fetchProducts();
      } catch (err) {
        console.error("Delete Product Frontend Error:", err.message);
        setError("Failed to delete product. Please try again.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center px-8 mt-5">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        {/* Add Product Button */}
        <div className="flex flex-col md:flex-row justify-center items-center space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white w-32 p-2 rounded hover:bg-blue-700 mb-6"
          >
            Add Product
          </button>
          <Link
            to={"/login"}
            className="bg-blue-600 text-center text-white w-32 p-2 rounded hover:bg-blue-700 mb-6"
          >
            Log Out
          </Link>
        </div>
      </div>

      {/* Modal for Adding Product */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter product description"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter price"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter category"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProductImage(e.target.files[0])}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="border p-2 rounded-lg flex flex-col items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-contain rounded mb-2"
                />
                <div className="text-center">
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-green-600 font-semibold">
                    ${product.price?.toFixed(2)}
                  </p>
                  <p className="text-gray-500 text-xs">{product.category}</p>
                </div>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-600 text-white p-1 rounded hover:bg-red-700 mt-2 w-full"
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
