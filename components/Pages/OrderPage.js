import CustomerDetails from "../OrderPage/CustomerDetails";
import ProductCart from "../OrderPage/ProductCart";

const OrderPage = () => {
  return (
    <section className="flex flex-col gap-[1rem]">
      <ProductCart />
      <CustomerDetails />
    </section>
  );
};

export default OrderPage;
