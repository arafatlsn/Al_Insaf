import Image from "next/image";

const DefaultImage = ({ height = 100, width = 100 }) => {
  return (
    <Image
      src={"/Assets/Images/image-icon-trendy-flat-style-600nw-643080895.webp"}
      alt={"default-image"}
      height={height}
      width={width}
    />
  );
};

export default DefaultImage;
