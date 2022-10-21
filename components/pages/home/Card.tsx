import { Home } from "@lib/interfaces";
import Image from "next/image";

const Card: React.FC<{ home: Home }> = ({ home }) => {
  return (
    <div className="card w-full bg-base-100 shadow-lg drop-shadow-xl">
      <figure className="w-full h-[14rem] relative">
        <Image src={home.image} layout="fill" alt="house" priority></Image>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">
          {home?.title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <div className="address h-8 flex items-center">
          <p className="opacity-80">
            {home.address}, {home.state}, {home.country}
          </p>
        </div>
        <div className="card-actions justify-start">
          <p className="font-bold">${home.price} night</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
