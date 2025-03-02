import Image from "next/image";
import React from "react";

const ProductImages = () => {
  return (
    <section className="bg-background smXYPadding rounded-[10px]">
      <h3 className="mdFont mb-[6px]">Product Images</h3>
      <div>
        <label htmlFor="product_image">
          <Image
            src="/Assets/Images/image-icon-trendy-flat-style-600nw-643080895.webp"
            width={400}
            height={400}
            className="w-full h-full object-contain border"
            alt="default-image"
          />
        </label>
        <input className="hidden" type="file" name="product_image" id="product_image" />
      </div>
    </section>
  );
};

export default ProductImages;
