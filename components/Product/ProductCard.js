"use client";
import { addToCart } from "@/Redux/Slices/CartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import ShopIcon from "../Icons/ShopIcon";
import OrderIcon from "../Icons/OrderIcon";
import { bdFormatNumber } from "@/utils/bdFormatNumber";
import useResponsive from "../Custom_Hooks/useResponsive";

const ProductCard = ({ product }) => {
  const { isMobile, isTablet } = useResponsive();
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
    <div className="flex flex-col justify-center items-center lg:flex-row gap-[.3rem] bg-background">
      {/* image side  */}
      <div className="min-w-[80px] lg:min-w-[120px] xl:min-w-[150px] 2xl:min-w-[200px] lg:border-r-[1px]">
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
      <div className="self-start flex flex-col items-start smXYPadding grow overflow-hidden">
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
            width={isMobile ? 20 : isTablet ? 25 : 30}
            height={isMobile ? 20 : isTablet ? 25 : 30}
            alt="bdt"
          />
          <h3 className="mdFont">
            {bdFormatNumber(product?.price)}{" "}
            <span className="text-[14px]">{" per "}</span>{" "}
            <span className="text-[14px] uppercase">{product?.unitType}</span>
          </h3>
        </div>
        <h6 className="text-[14px] font-semibold">
          Stock: <span>{product?.totalStock}</span>
        </h6>
        <div className="w-full flex flex-wrap gap-[6px] mt-[1rem] whitespace-nowrap">
          <button
            onClick={addCartHandler}
            className="w-fit text-[10px] md:text-[12px] lg:text-[13px] font-[500] flex items-center justify-center gap-[6px] px-[.7rem] md:px-[.8rem] lg:px-[1rem] button bg-[#3a7dff30] text-primary border-primary border-[1.5px] rounded-[1rem]"
          >
            <ShopIcon screen={isMobile ? isMobile : isTablet} />{" "}
            <span>Add to Cart</span>
          </button>
          <button
            onClick={placeOrder}
            className="w-fit text-[10px] md:text-[12px] lg:text-[13px] font-[500] flex items-center justify-center gap-[6px] px-[.7rem] md:px-[.8rem] lg:px-[1rem] button bg-[#208b5930] text-success border-success border-[1.5px] rounded-[1rem]"
          >
            <OrderIcon /> <span>Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
