"use client";
import { updateProductSlice } from "@/Redux/Slices/ProductSlice";
import { generateRandomId } from "@/utils/generateRandomId";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import TrashIcon from "../Icons/TrashIcon";

const ProductImages = () => {
  const dispatch = useDispatch();
  const { images: productImages } = useSelector((state) => state.product_slice);

  const removeImage = (index) => {
    const removedImage = productImages?.filter((image, i) => i !== index);
    dispatch(updateProductSlice({images: removedImage}))
  };

  const changeImage = (imageFile, inputElement, index) => {
    if (!imageFile) {
      toast.error("No file selected!");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onload = () => {
      const newImages = [...productImages];
      newImages[index] = {
        id: generateRandomId(),
        file: imageFile,
        base64: reader.result,
      };
      dispatch(
        updateProductSlice({
          images: newImages,
        })
      );
      inputElement.value = null;
    };

    reader.onerror = (error) => {
      console.error("Failed to convert the image to base64:", error);
      toast.error("FAILED TO CONVERT BASE64: ", error?.message);
      inputElement.value = null;
    };
  };

  const onChangeImage = (imageFile, inputElement) => {
    if (!imageFile) {
      toast.error("No file selected!");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onload = () => {
      dispatch(
        updateProductSlice({
          images: [
            ...productImages,
            {
              id: generateRandomId(),
              file: imageFile,
              base64: reader.result,
            },
          ],
        })
      );
      inputElement.value = null;
    };

    reader.onerror = (error) => {
      console.error("Failed to convert the image to base64:", error);
      toast.error("FAILED TO CONVERT BASE64: ", error?.message);
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
        {productImages?.map((el, index) => (
          <div
            key={el?.id}
            className="aspect-square w-full h-auto overflow-hidden relative"
          >
            <button type="button" onClick={() => removeImage(index)} className="absolute top-[3px] right-[3px] z-[1] px-[3px] py-[3px] text-failed bg-foreground border-[.5px] rounded-[4px]">
              <TrashIcon className={"size-4"} /> 
            </button>
            <label htmlFor={`product_image_${el.id}`}>
              <Image
                src={el?.base64}
                width={400}
                height={400}
                className="w-full h-full object-contain border"
                alt="product-image"
              />
            </label>
            <input
              onChange={(e) => changeImage(e.target.files[0], e.target, index)}
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
              className="aspect-square w-full h-auto object-contain border overflow-hidden"
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
