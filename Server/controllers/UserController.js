import User from "../models/User.js";
import Product from "../models/Product.js";

export const addtoCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Validate request body
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "User ID and Product ID are required" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in the cart
    const cartItemIndex = user.cart.findIndex(
      (item) => item.productId === productId
    );

    if (cartItemIndex >= 0) {
      // Product exists in cart, increment quantity
      user.cart[cartItemIndex].quantity += 1;
    } else {
      // Product not in cart, add new item
      user.cart.push({
        productId: product._id.toString(),
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image || "", // Use empty string if image is not available
      });
    }

    // Save the updated user document
    await user.save();

    // Respond with success
    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    console.log("Problem in addtoCart Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addtoFavourites = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Validate request body
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "User ID and Product ID are required" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in the favorites
    const favouriteItemIndex = user.favorites.findIndex(
      (item) => item.productId === productId
    );

    if (favouriteItemIndex >= 0) {
      // Product already in favorites
      return res.status(400).json({ message: "Product already in favorites" });
    }

    // Add product to favorites
    user.favorites.push({
      productId: product._id.toString(),
      name: product.name,
      price: product.price,
      image: product.image || "", // Use empty string if image is not available
      createdAt: new Date(),
    });

    // Save the updated user document
    await user.save();

    // Respond with success
    res.status(200).json({
      message: "Product added to favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    console.log("Error in Add to Favourites Controller:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getCarts = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "UserId required to fetch Carts" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const cartsProducts = user.cart;

    if (!cartsProducts || cartsProducts.length === 0) {
      return res.status(200).json({ message: "Cart is empty", cart: [] });
    }

    res.status(200).json({
      message: "Cart fetched successfully",
      cart: cartsProducts,
    });
  } catch (error) {
    console.log("Error in getCarts Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFavourites = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "UserId required to fetch Favourites" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const favouritesProduct = user.favorites;

    if (!favouritesProduct || favouritesProduct.length === 0) {
      return res
        .status(200)
        .json({ message: "No Product added to Favourites", Fav_Prod: [] });
    }

    res.status(200).json({
      message: "Favourites Products fetched successfully",
      Fav_Prod: favouritesProduct,
    });
  } catch (error) {
    console.log("Error in getFavourites Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const delFromCart = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from JWT token by checkAuth
    const productId = req.params.productId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove product from cart
    user.cart = user.cart.filter((item) => item.productId !== productId);
    await user.save();

    res.status(200).json({
      message: "Product removed from cart",
      cart: user.cart,
    });
  } catch (error) {
    console.log("Error in delFromCart Controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const delFromFavourites = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from JWT token by checkAuth
    const productId = req.params.productId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove product from favorites
    user.favorites = user.favorites.filter(
      (item) => item.productId !== productId
    );
    await user.save();

    res.status(200).json({
      message: "Product removed from favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    console.log("Error in delFromFavourites Controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
