import { url } from "@/utils/url";

export default async function Home() {
  const data = await fetch(`${url}/product`);
  const products = await data.json();
  console.log("console products", products);
  return (
    <div>
      <p>this is shop page.</p>
    </div>
  );
}
