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
      <div className="w-full hidden md:flex flex-col">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Product</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
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
                        className="md:min-w-[60px] lg:min-w-[100px]"
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
                <TableCell>{product?.totalStock}</TableCell>
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
      <div className="flex flex-col gap-[1rem] md:hidden">
        {cart?.map((product) => (
          <div
            className="w-full flex flex-col gap-[.5rem] pb-[1rem] border-b-[1px]"
            key={product?._id}
          >
            <div className="grid grid-cols-8">
              <h6 className="col-span-2 text-[12px] font-[500]">Product:</h6>
              <div className="col-span-6 justify-end flex items-start">
                <div>
                  {product?.images?.length ? (
                    <Image
                      className="min-w-[60px]"
                      src={product?.images[0]}
                      alt="image"
                      width={60}
                      height={60}
                    />
                  ) : (
                    <DefaultImage />
                  )}
                </div>
                <div className="p-[4px]">
                  <h3 className="smFont font-[500]">{product?.name}</h3>
                  <h5 className="text-[10px]">{product?.sku}</h5>
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
              </div>
            </div>
            <div className="grid grid-cols-8 items-center">
              <h6 className="col-span-2 text-[12px] font-[500]">Stock:</h6>
              <div className="col-span-6 justify-end flex items-start">
                <h6 className="text-[12px]">{product?.totalStock}</h6>
              </div>
            </div>
            <div className="grid grid-cols-8 items-center">
              <h6 className="col-span-2 text-[12px] font-[500]">Price:</h6>
              <div className="col-span-6 justify-end flex items-start">
                <input
                  onChange={(e) =>
                    handlerUpdateProduct(product._id, e.target.value, "price")
                  }
                  type="text"
                  className="text-[12px] w-[50px] h-[25px] px-[3px] focus:outline-none text-right"
                  value={product?.price}
                />
              </div>
            </div>
            <div className="grid grid-cols-8 items-center">
              <h6 className="col-span-2 text-[12px] font-[500]">Quantity:</h6>
              <div className="col-span-6 justify-end flex items-start">
                <input
                  onChange={(e) =>
                    handlerUpdateProduct(
                      product._id,
                      e.target.value,
                      "quantity"
                    )
                  }
                  type="text"
                  className="text-[12px] w-[40px] h-[25px] px-[3px] focus:outline-none text-right"
                  value={product?.quantity}
                />
              </div>
            </div>
            <div className="grid grid-cols-8 items-center">
              <h6 className="col-span-2 text-[12px] font-[500]">Total:</h6>
              <div className="col-span-6 justify-end flex items-start">
                <h6 className="text-[12px]">
                  {product?.quantity * product?.price}
                </h6>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button
              className="flex items-center justify-end text-[12px] bg-red-200 text-failed px-[.5rem] py-[.3rem] rounded-[.3rem]"
                onClick={() =>
                  dispatch(removeProduct({ productId: product?._id }))
                }
              >
                <TrashIcon className="w-4 h-4 text-failed transition-all" />
                <span>Remove from cart</span>
              </button>
            </div>
          </div>
        ))}
        <Table className="justify-self-end max-w-[300px] mt-[1rem]">
          <TableBody className="text-[12px]">
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
