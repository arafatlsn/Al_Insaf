import { url } from "@/utils/url";

export default async function Home() {
  let products;
  try {
    const data = await fetch(`${url}/product`);
    products = await data.json();
  } catch (error) {}
  return (
    <div>
      <p>this is shop page.</p>
    </div>
  );
}
