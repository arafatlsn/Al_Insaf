"use client";
import { useFetchCustomersQuery } from "@/Redux/APIs/CustomerApi";
import InputLabel from "../Common/InputLabel";
import SelectCompObj from "../Common/SelectCompObj";
import { useDispatch, useSelector } from "react-redux";
import { updateCartSlice } from "@/Redux/Slices/CartSlice";
import Button from "../Common/Button";
import { usePlaceOrderMutation } from "@/Redux/APIs/OrderApi";

const CustomerDetails = () => {
  const dispatch = useDispatch();
  const { cart, customer, newCustomer } = useSelector(
    (state) => state.cart_slice
  );
  const { data } = useFetchCustomersQuery();
  const [placeOrderMutation] = usePlaceOrderMutation();
  const customers = data?.data;
  // dispatch function
  const dispatcher = (objKey, value) => {
    dispatch(updateCartSlice({ [objKey]: value }));
  };
  // dispatcher for new supplier
  const dispatcherSupplier = (objKey, value) => {
    const obj = { ...newCustomer };
    obj[objKey] = value;
    dispatch(updateCartSlice({ newCustomer: obj }));
  };
  // place order
  const placeOrder = async () => {
    if (cart?.length === 0) {
      return;
    }
    const products = [];
    let totalAmount = 0;
    for (let product of cart) {
      products.push({
        product: product?._id,
        price: product?.price,
        quantity: product?.quantity,
      });
      totalAmount = totalAmount + product?.price * product?.quantity;
    }
    const orderObj = { products, totalAmount, customer, newCustomer };
    const response = await placeOrderMutation(orderObj);
  };
  return (
    <section className="bg-background smXYPadding rounded-[10px]">
      <h3 className="mdFont mb-[1rem]">Supplier Information</h3>
      <div className="flex flex-col gap-[1rem]">
        <div>
          <SelectCompObj
            label="Customer"
            options={customers}
            action={dispatcher}
            actionFor={"customer"}
            required={true}
          />
        </div>
        {customer.toString().toLowerCase() === "others" && (
          <div className="flex flex-col gap-[1rem]">
            <div className="w-full grid grid-cols-2 items-center gap-[1rem]">
              <div>
                <InputLabel
                  title="Customer Name"
                  htmlFor="customer_name"
                  name="customer_name"
                  id="customer_name"
                  placeHolder="ex. Shakib Al Hasan"
                  value={newCustomer?.name}
                  action={dispatcherSupplier}
                  actionFor={"name"}
                  required={true}
                />
              </div>
              <div>
                <InputLabel
                  title="Customer Contact"
                  htmlFor="customer_contact"
                  name="customer_contact"
                  id="customer_contact"
                  placeHolder="ex. 017########"
                  value={newCustomer?.contact}
                  action={dispatcherSupplier}
                  actionFor={"contact"}
                />
              </div>
            </div>
            <div>
              <InputLabel
                title="Customer Address"
                htmlFor="customer_address"
                name="customer_address"
                id="customer_address"
                placeHolder="ex. 120/A Baburhat College Road"
                value={newCustomer?.address}
                action={dispatcherSupplier}
                actionFor={"address"}
              />
            </div>
          </div>
        )}
        <div className="w-full">
          <Button action={placeOrder} text="Confirm Order" />
        </div>
      </div>
    </section>
  );
};

export default CustomerDetails;
