"use client";
import { updateProductSlice } from "@/Redux/Slices/ProductSlice";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductImages = () => {
  const dispatch = useDispatch();
  const { images: productImages } = useSelector((state) => state.product_slice);

  const onChangeImage = (imageFile, inputElement) => {
    if (!imageFile) {
      toast.error("No file selected!");
      return;
    }

    toast.success("ONCHANGE FUNCTION CALLED!");
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onload = () => {
      toast.success("DISPATCHING THE RESULT");
      dispatch(
        updateProductSlice({
          images: [
            ...productImages,
            {
              id: crypto.randomUUID(),
              file: imageFile,
              base64: reader.result,
            },
          ],
        })
      );
      toast.success("DISPATCHED");
      // Reset the input after processing
      inputElement.value = null;
    };

    reader.onerror = (error) => {
      console.error("Failed to convert the image to base64:", error);
      toast.error("FAILED TO ADD IMAGE");
      inputElement.value = null;
    };
  };

  return (
    <section className="bg-background smXYPadding rounded-[10px]">
      <div>
        <h3 className="mdFont font-semibold mb-[1rem]">Product Images</h3>
      </div>
      <div
        id="product_images"
        className="w-full h-min grid grid-cols-3 md:grid-cols-1 lg:grid-cols-2 gap-[1rem]"
      >
        {productImages?.map((el) => (
          <div key={el?.id}>
            <label htmlFor={`product_image_${el.id}`}>
              <Image
                src={el?.base64}
                width={400}
                height={400}
                className="aspect-square w-full h-auto object-contain border"
                alt="product-image"
              />
            </label>
            <input
              onChange={(e) => onChangeImage(e.target.files[0], e.target)}
              className="hidden"
              type="file"
              name="product_image"
              id={`product_image_${el.id}`}
            />
          </div>
        ))}
        <div>
          <label htmlFor="product_image_new">
            <Image
              src="/Assets/Images/image-icon-trendy-flat-style-600nw-643080895.webp"
              width={400}
              height={400}
              className="aspect-square w-full h-auto object-contain border"
              alt="default-image"
            />
          </label>
          <input
            onChange={(e) => onChangeImage(e.target.files[0], e.target)}
            className="hidden"
            type="file"
            name="product_image"
            id="product_image_new"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductImages;