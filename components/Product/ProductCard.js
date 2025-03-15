"use client";
import { addToCart } from "@/Redux/Slices/CartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // handle product to cart
  const addCartHandler = () => {
    const newProduct = {...product};
    newProduct["selectedPurchase"] = newProduct?.purchase[0];
    dispatch(addToCart(newProduct));
  };

  // handle to navigate order page
  const placeOrder = () => {
    const newProduct = {...product};
    newProduct["selectedPurchase"] = newProduct?.purchase[0];
    dispatch(addToCart(newProduct));
    router.push("/place-order");
  };

  return (
    <div className="flex gap-[.3rem] bg-background">
      {/* image side  */}
      <div className="border-r-[1px]">
        {product?.images?.length > 0 ? (
          <Image
            src={product?.images[0]}
            width={200}
            height={200}
            alt="image"
          />
        ) : (
          <Image
            src={
              "/Assets/Images/image-icon-trendy-flat-style-600nw-643080895.webp"
            }
            width={200}
            height={200}
            alt="Product"
          />
        )}
      </div>
      <div className="smXYPadding grow">
        <h6 className="text-[14px] font-[500]">{product?.sku}</h6>
        <h2 className="mdFont font-semibold text-secondary">{product?.name}</h2>
        <p>{product?.description}</p>
        <div className="flex items-center">
          <Image
            src={"/Assets/icons/currency-bdt.svg"}
            width={30}
            height={30}
            alt="bdt"
          />
          <h3 className="mdFont">
            {product?.price} <span className="text-[14px]">{" per "}</span>{" "}
            <span className="text-[14px] uppercase">{product?.unitType}</span>
          </h3>
        </div>
        <div className="w-full grid grid-cols-2 gap-[6px]">
          <button onClick={addCartHandler} className="button bg-primary">
            Add to Cart
          </button>
          <button onClick={placeOrder} className="button bg-secondary">
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
