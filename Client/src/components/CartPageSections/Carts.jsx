import React, { useEffect, useState } from "react";
import { ProductStore } from "../../store/ProductStore";
import { AuthStore } from "../../store/AuthStore";
import { EllipsisVertical, Plus, Minus } from "lucide-react";
import Loader from "../Loader";
import { Link } from "react-router-dom"; // For "Back to shop" navigation

const Carts = () => {
  const {
    addtoCart,
    cartProducts,
    fetchCartProducts,
    LoadingCarts,
    addtoFavourites,
    removeFromCart,
    fetchFavouritesProducts,
  } = ProductStore();
  const { user } = AuthStore();
  const [menuVisible, setMenuVisible] = useState(null); // Track which product's menu is visible
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0); // Placeholder for discount amount

  useEffect(() => {
    if (user?.id) {
      console.log("User ID:", user.id);
      fetchCartProducts(user.id);
    }
  }, [user?.id, fetchCartProducts]);

  console.log("Cart Products:", cartProducts);

  if (LoadingCarts)
    return (
      <div className="flex items-center justify-center p-3">
        <Loader />
      </div>
    );

  const toggleMenu = (index) => {
    setMenuVisible(menuVisible === index ? null : index);
  };

  const handleDelete = (productId) => {
    removeFromCart(productId);
    setMenuVisible(null);
  };

  const handleSaveForLater = (productId) => {
    addtoFavourites(user.id, productId);
    fetchFavouritesProducts(user.id);
    setMenuVisible(null);
  };

  const handleRemoveAll = () => {
    // Placeholder for removing all items
    console.log("Remove all items");
  };

  const handleApplyCoupon = () => {
    // Placeholder for coupon logic
    if (couponCode === "SAVE10") {
      setDiscount(50.0); // Example discount
    } else {
      setDiscount(0);
    }
  };

  // Calculate totals for checkout summary
  const totalItems = cartProducts.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const itemsCost = cartProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const shippingCost = 14.0; // Adjusted to match the image
  const taxRate = 0.07; // 7% tax rate
  const taxCost = itemsCost * taxRate;
  const subtotal = itemsCost + shippingCost;
  const totalCost = subtotal - discount + taxCost;

  return (
    <div className=" flex flex-col md:flex-row overflow-y-auto  md:justify-between mt-3 md:space-x-4 space-y-4 w-full p-4">
      {/* Left Column: Cart Items */}
      <div className="flex-1 bg-white p-3 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">My cart ({totalItems})</h2>

        {cartProducts.length > 0 ? (
          cartProducts.map((product, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:justify-between space-y-2 border-b py-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex flex-col space-y-1">
                  <span className="text-lg font-semibold">{product.name}</span>
                  <p className="text-sm text-gray-500">
                    Size: medium, Color: blue, Material: Plastic
                  </p>
                  <p className="text-sm text-gray-500">Seller: Artel Market</p>
                  <div className="flex space-x-4 md:space-x-3 mt-2">
                    <button
                      onClick={() => handleDelete(product.productId)}
                      className="text-red-600 border px-3 py-1 rounded-lg hover:underline text-sm hidden md:block"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleSaveForLater(product.productId)}
                      className="text-blue-600 border px-3 py-1 rounded-lg hover:underline text-sm hidden md:block"
                    >
                      Save for later
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => toggleMenu(index)}
                  className="md:hidden focus:outline-none"
                >
                  <EllipsisVertical />
                </button>
              </div>
              <div className="flex md:flex-col items-center md:items-start justify-between md:space-x-4">
                <div className="flex items-center border rounded-lg space-x-2 p-1">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Minus size={16} />
                  </button>
                  <p className="px-2">Qty: {product.quantity}</p>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Plus size={16} />
                  </button>
                </div>
                <p className="text-lg font-semibold">
                  ${(product.price * product.quantity).toFixed(2)}
                </p>
              </div>
              {menuVisible === index && (
                <div className="md:hidden absolute right-9 bg-white border rounded shadow-lg p-2 z-10">
                  <button
                    onClick={() => handleDelete(product.productId)}
                    className="block w-full text-red-600 text-left  px-2 py-1 hover:bg-gray-100"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleSaveForLater(product.productId)}
                    className="block w-full text-blue-600 text-left px-2 py-1 hover:bg-gray-100"
                  >
                    Save for Later
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center">No items in cart</p>
        )}
        <div className="flex justify-between mt-4">
          <Link
            to="/ProductsList"
            className="text-blue-600 hover:underline flex items-center"
          >
            ← Back to shop
          </Link>
          {cartProducts.length > 0 && (
            <button
              onClick={handleRemoveAll}
              className="text-red-600 hover:underline"
            >
              Remove all
            </button>
          )}
        </div>
      </div>

      {/* Right Column: Checkout Summary */}
      {cartProducts.length > 0 && (
        <div className="md:w-1/3 space-y-3 p-4 rounded-lg">
          <div className="bg-white p-2 rounded-lg hidden md:flex items-center justify-between mb-4">
            <span className="text-gray-500">Have a coupon?</span>
            <div className="flex space-x-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Add coupon"
                className="border rounded px-2 py-1 text-sm"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-300"
              >
                Apply
              </button>
            </div>
          </div>
          <div className="bg-white p-2 rounded-lg flex flex-col space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Discount:</span>
              <span>- ${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${taxCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total:</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
          </div>
          <button
            className="w-full bg-green-500 text-white py-2 mt-4 rounded hover:bg-green-600"
            disabled={totalItems === 0}
          >
            Checkout
          </button>
          <div className="flex justify-center space-x-2 mt-4">
            <img
              src="https://img.icons8.com/color/24/000000/mastercard.png"
              alt="MasterCard"
            />
            <img
              src="https://img.icons8.com/color/24/000000/visa.png"
              alt="Visa"
            />
            <img
              src="https://img.icons8.com/color/24/000000/paypal.png"
              alt="PayPal"
            />
            <img
              src="https://img.icons8.com/ios-filled/24/000000/apple-pay.png"
              alt="Apple Pay"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Carts;
