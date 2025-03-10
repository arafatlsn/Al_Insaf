"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DefaultImage from "../Common/DefaultImage";
import Image from "next/image";
import { updateQuantity } from "@/Redux/Slices/CartSlice";

const ProductCart = () => {
  const dispatch = useDispatch();
  const { cart, totalAmount } = useSelector((state) => state.cart_slice);

  const handleQuantity = (value, product) => {
    dispatch(updateQuantity({ value, product }));
  };

  return (
    <section className="bg-background mdXYPadding rounded-[10px]">
      <h3 className="mdFont mb-[10px]">Cart Items</h3>
      <div className="w-full flex flex-col">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right w-[200px]">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart?.map((product) => (
              <TableRow key={product?._id}>
                <TableCell className="flex items-center gap-[10px]">
                  <div>
                    {product?.images?.length ? (
                      <Image
                        src={product?.images[0]}
                        alt="image"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <DefaultImage />
                    )}
                  </div>
                  <div className="p-[4px]">
                    <h3 className="smFont font-[500]">{product?.name}</h3>
                    <h5>{product?.sku}</h5>
                  </div>
                </TableCell>
                <TableCell>{product?.price}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-[6px]">
                    <button className="w-[30px] h-[30px] text-[1.5rem] font-bold flex items-start justify-center border">
                      -
                    </button>
                    <input
                      onChange={(e) => handleQuantity(e.target.value, product)}
                      type="text"
                      className="w-[40px] h-[30px] px-[3px] text-center focus:outline-none border"
                      value={product?.quantity}
                    />
                    <button className="w-[30px] h-[30px] text-[1.5rem] font-bold flex items-start justify-center border">
                      +
                    </button>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {product?.quantity * product?.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Table className="justify-self-end max-w-[300px] mt-[1rem]">
          <TableBody>
            <TableRow>
              <TableCell>Items</TableCell>
              <TableCell className="text-right">{cart?.length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sub Total</TableCell>
              <TableCell className="text-right">{totalAmount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default ProductCart;
