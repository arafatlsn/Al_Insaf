import Image from "next/image";
import DefaultImage from "../Common/DefaultImage";

const CartCard = ({ product }) => {
  return (
    <table className="flex gap-[10px] shadow-sm border">
      {/* image */}
      <div className="border-r-[1px]">
        {product?.images?.length ? <Image /> : <DefaultImage />}
      </div>
      <div className="p-[4px]">
        <h3 className="smFont font-[500]">{product?.name}</h3>
        <h5>{product?.sku}</h5>
      </div>
    </table>
  );
};

export default CartCard;
