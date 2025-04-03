"use client";
import { addToCart } from "@/Redux/Slices/CartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import ShopIcon from "../Icons/ShopIcon";
import OrderIcon from "../Icons/OrderIcon";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // handle product to cart
  const addCartHandler = () => {
    const newProduct = { ...product };
    newProduct["selectedPurchase"] = newProduct?.purchase[0];
    dispatch(addToCart(newProduct));
  };

  // handle to navigate order page
  const placeOrder = () => {
    const newProduct = { ...product };
    newProduct["selectedPurchase"] = newProduct?.purchase[0];
    dispatch(addToCart(newProduct));
    router.push("/place-order");
  };

  return (
    <div className="flex gap-[.3rem] bg-background">
      {/* image side  */}
      <div className="min-w-[200px] border-r-[1px]">
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
      <div className="smXYPadding grow overflow-hidden">
        <h6 className="text-[14px] font-[500]">{product?.sku}</h6>
        <h2
          title={product?.name}
          className="mdFont font-semibold text-secondary truncate"
        >
          {product?.name}
        </h2>
        {/* <p>{product?.description}</p> */}
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
        <div className="w-full flex flex-wrap gap-[6px] mt-[1rem] whitespace-nowrap">
          <button
            onClick={addCartHandler}
            className="w-fit text-[13px] font-[500] flex items-center justify-center gap-[6px] px-[1rem] button bg-[#3a7dff30] text-primary border-primary border-[1.5px] rounded-[1rem]"
          >
            <ShopIcon /> <span>Add to Cart</span>
          </button>
          <button
            onClick={placeOrder}
            className="w-fit text-[13px] font-[500] flex items-center justify-center gap-[6px] px-[1rem] button bg-[#208b5930] text-success border-success border-[1.5px] rounded-[1rem]"
          >
            <OrderIcon /> <span>Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
