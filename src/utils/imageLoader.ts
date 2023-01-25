import { ImageLoaderProps } from "next/image";

const loader = ({ src, quality, width }: ImageLoaderProps) => {
  console.log(src);
  return `http://localhost:3000/${src}?w=${width}&q=${quality || 75}`;
};

export default loader;
