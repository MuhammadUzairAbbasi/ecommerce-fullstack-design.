import React, { useEffect } from "react";
import { AuthStore } from "../../store/AuthStore";
import { ProductStore } from "../../store/ProductStore";
import { FaCartPlus } from "react-icons/fa"; // For the cart icon

const SavedProducts = () => {
  const { user } = AuthStore();
  const {
    LoadingFavourites,
    favouriteProducts,
    fetchFavouritesProducts,
    removeFromFavourites,
    addtoCart,
  } = ProductStore();

  useEffect(() => {
    if (user?.id) {
      fetchFavouritesProducts(user.id);
    }
  }, [user?.id, fetchFavouritesProducts]);

  if (LoadingFavourites) {
    return <div>Saved Product Loading...</div>;
  }

  const handleMoveToCart = (productId) => {
    if (user?.id) {
      addtoCart(user.id, productId);
    }
  };

  const handleRemove = (productId) => {
    if (user?.id) {
      removeFromFavourites(user.id, productId);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col px-2 py-4 space-y-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Saved for Later</h2>
      {favouriteProducts.length > 0 ? (
        <div className="flex flex-col md:grid md:grid-cols-4 md:gap-4 space-y-4 md:space-y-0">
          {favouriteProducts.map((product, index) => (
            <div
              key={index}
              className="w-full px-2 py-3 border bg-white border-gray-300 rounded-lg"
            >
              <div className="flex md:flex-col items-center md:items-center justify-start space-x-3 md:space-x-0 md:space-y-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 md:w-32 md:h-32 rounded-lg object-contain"
                />
                <div className="flex flex-col items-start md:items-center space-y-2">
                  <div className="text-left md:text-center">
                    <p className="text-green-600 font-semibold">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-sm font-medium">{product.name}</p>
                  </div>
                  <div className="flex space-x-2 md:space-x-0 md:flex-col md:space-y-2">
                    <button
                      onClick={() => handleMoveToCart(product.productId)}
                      className="flex items-center space-x-1 text-blue-600 border px-3 py-1 rounded-lg hover:bg-blue-50 text-sm"
                    >
                      <FaCartPlus size={16} className="hidden md:block" />
                      <span>Move to cart</span>
                    </button>
                    <button
                      onClick={() => handleRemove(product.productId)}
                      className="md:hidden text-red-600 border px-2 py-1 rounded-lg hover:bg-red-50 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No items saved for later</p>
      )}
    </div>
  );
};

export default SavedProducts;
