import "./AuctionBids.css";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { Carousel } from "primereact/carousel";

const AuctionBids = () => {
  const images = [
    { src: "/images/novilha.jpg", alt: "Novilha 1" },
    { src: "/images/novilha2.jpg", alt: "Novilha 2" },
    { src: "/images/novilha5.jpg", alt: "Novilha 3" },
  ];

  const imageTemplate = (image) => {
    return (
      <div>
        <Image src={image.src} alt={image.alt} className="product-image" />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex justify-content-center align-items-center bg-gray-400">
      <div className="grid sm:w-full lg:w-10 p-4">
        <div className="col-12 flex justify-content-center">
          <Card className="p-shadow-24">
            <Carousel
              value={images}
              numVisible={1}
              numScroll={1}
              itemTemplate={imageTemplate}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuctionBids;
