import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
interface Props {
  label: string;
  onChangePicture: any;
  objectFit?: any;
  sizeLimit?: number;
}

const ImageUpload: React.FC<Props> = ({ label, onChangePicture, objectFit = "cover", sizeLimit = 10 * 1024 * 1024 }) => {
  const imageRef = React.useRef<HTMLInputElement>(null);
  const [image, setImage] = React.useState({ src: "", alt: "" } as { src: any; alt: string });
  const [updatingImage, setUpdatingImage] = React.useState(false);
  const [imageError, setPictureError] = React.useState(null);
  const handleOnChangePicture = (e: any) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    const fileName = file?.name?.split(".")?.[0] ?? "New file";
    reader.addEventListener(
      "load",
      async () => {
        try {
          setImage({ src: reader.result, alt: fileName });
          await onChangePicture(reader.result);
        } catch (e) {
          console.log("Unable to update image");
        } finally {
          setUpdatingImage(false);
        }
      },
      false
    );
    if (file) {
      setUpdatingImage(true);
      reader.readAsDataURL(file);
    }
  };
  const handleOnClickPicture = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };
  React.useEffect(() => console.log("image: ", image), [image]);
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-gray-600">{label}</label>

      <button
        disabled={updatingImage}
        onClick={handleOnClickPicture}
        className={classNames(
          "relative aspect-w-16 aspect-h-9 overflow-hidden rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition group focus:outline-none py-4 h-40",
          image?.src
            ? "hover:opacity-50 disabled:hover:opacity-100"
            : "border-2 border-dashed hover:border-gray-400 focus:border-gray-400 disabled:hover:border-gray-200"
        )}
      >
        {image?.src ? <Image src={image.src} alt={image?.alt ?? ""} layout="fill" objectFit={objectFit} /> : null}

        <div className="flex items-center justify-center">
          {!image?.src ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="shrink-0 rounded-full p-2 bg-gray-200 group-hover:scale-110 group-focus:scale-110 transition">
                <AiOutlineArrowUp className="w-4 h-4 text-gray-500 transition" />
              </div>
              <span className="text-xs font-semibold text-gray-500 transition">{updatingImage ? "Uploading..." : "Upload"}</span>
            </div>
          ) : null}
          <input ref={imageRef} type="file" accept={".png, .jpg, .jpeg, .gif, .webp"} onChange={handleOnChangePicture} className="hidden" />
        </div>
      </button>

      {imageError ? <span className="text-red-600 text-sm">{imageError}</span> : null}
    </div>
  );
};

export default ImageUpload;
