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
import {
  handlingCashDue,
  removeProduct,
  updateProduct,
} from "@/Redux/Slices/CartSlice";
import SelectPurchase from "../Common/SelectPurchase";
import TrashIcon from "../Icons/TrashIcon";

const ProductCart = () => {
  const dispatch = useDispatch();
  const { cart, totalAmount, cash, due } = useSelector(
    (state) => state.cart_slice
  );

  const handlerUpdateProduct = (id, value, actionFor, index) => {
    dispatch(updateProduct({ id, value, actionFor, index }));
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
              <TableHead>Stock</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Action</TableHead>
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
                    {product?.purchase?.length > 1 && (
                      <div className="mt-[.5rem]">
                        <SelectPurchase
                          options={product?.purchase}
                          size="small"
                          action={handlerUpdateProduct}
                          id={product?._id}
                        />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <input
                    onChange={(e) =>
                      handlerUpdateProduct(product._id, e.target.value, "price")
                    }
                    type="text"
                    className="w-[80px] h-[30px] px-[3px] text-center focus:outline-none border"
                    value={product?.price}
                  />
                </TableCell>
                <TableCell>{product?.totalStock}</TableCell>
                <TableCell>
                  <input
                    onChange={(e) =>
                      handlerUpdateProduct(
                        product._id,
                        e.target.value,
                        "quantity"
                      )
                    }
                    type="text"
                    className="w-[40px] h-[30px] px-[3px] text-center focus:outline-none border"
                    value={product?.quantity}
                  />
                </TableCell>
                <TableCell>
                  <button
                    onClick={() =>
                      dispatch(removeProduct({ productId: product?._id }))
                    }
                  >
                    <TrashIcon className="w-6 h-6 hover:text-red-500 transition-all" />
                  </button>
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
            <TableRow>
              <TableCell>Cash</TableCell>
              <TableCell className="text-right">
                <input
                  className="text-right focus:outline-none"
                  type="number"
                  value={cash}
                  onChange={(e) => {
                    if (e.target.value > totalAmount || e.target.value < 0) {
                      return;
                    }
                    dispatch(
                      handlingCashDue({
                        cash: e.target.value,
                        actionFor: "cash",
                      })
                    );
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Due</TableCell>
              <TableCell className="text-right">
                <input
                  className="text-right focus:outline-none"
                  type="number"
                  value={due}
                  onChange={(e) => {
                    if (e.target.value > totalAmount) {
                      return;
                    }
                    dispatch(
                      handlingCashDue({
                        due: e.target.value,
                        actionFor: "due",
                      })
                    );
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default ProductCart;
