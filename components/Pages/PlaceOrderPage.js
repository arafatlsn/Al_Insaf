import CustomerDetails from "../OrderPage/CustomerDetails";
import ProductCart from "../OrderPage/ProductCart";

const PlaceOrderPage = () => {
  return (
    <section className="flex flex-col gap-[1rem] overflow-x-hidden">
      <ProductCart />
      <CustomerDetails />
    </section>
  );
};

export default PlaceOrderPage;
