import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  fetchCart,
  updateCartItemQuantity,
  removeFromCart,
} from "../../../redux/slices/CartSlice";

const CartContents = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { userInfo, guestId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(
      fetchCart({
        userId: userInfo?._id,
        guestId: !userInfo ? guestId : null,
      })
    );
  }, [dispatch, userInfo, guestId]);

  const handleQuantityUpdate = (productId, quantity, size, color) => {
    dispatch(
      updateCartItemQuantity({
        productId,
        quantity,
        size,
        color,
        userId: userInfo?._id,
        guestId: !userInfo ? guestId : null,
      })
    );
  };

  const handleRemoveItem = (productId, size, color) => {
    dispatch(
      removeFromCart({
        productId,
        size,
        color,
        userId: userInfo?._id,
        guestId: !userInfo ? guestId : null,
      })
    );
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!cart?.products?.length)
    return <div className="p-4">Your cart is empty</div>;

  return (
    <div>
      {cart.products.map((product) => (
        <div
          key={`${product.productId}-${product.size}-${product.color}`}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 rounded mr-4 object-cover"
            />
            <div>
              <h3>{product.name}</h3>
              <p>
                size: {product.size} | color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button
                  className="border rounded px-2 py-1 text-xl font-medium"
                  onClick={() =>
                    handleQuantityUpdate(
                      product.productId,
                      Math.max(0, product.quantity - 1),
                      product.size,
                      product.color
                    )
                  }
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  className="border rounded px-2 py-1 text-xl font-medium"
                  onClick={() =>
                    handleQuantityUpdate(
                      product.productId,
                      product.quantity + 1,
                      product.size,
                      product.color
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>${(product.price * product.quantity).toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveItem(product.productId, product.size, product.color)
              }
            >
              <RiDeleteBinLine className="h-6 w-6 mt-2 text-gray-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
