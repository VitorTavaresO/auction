import "./AuctionBids.css";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { Carousel } from "primereact/carousel";

const AuctionBids = () => {
  const images = [
    { src: "/images/novilha.jpg", alt: "Novilha 1" },
    { src: "/images/novilha2.jpg", alt: "Novilha 2" },
    { src: "/images/novilha3.jpg", alt: "Novilha 3" },
  ];

  const imageTemplate = (image) => {
    return (
      <div className="product-image-container">
        <Image src={image.src} alt={image.alt} className="product-image" />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex justify-content-center align-items-center bg-gray-400">
      <div className="carousel-container">
        <Card className="p-shadow-24 flex justify-content-center align-items-center">
          <Carousel
            value={images}
            numVisible={1}
            numScroll={1}
            itemTemplate={imageTemplate}
            circular
            autoplayInterval={3000}
            orientation="horizontal"
            ViewPortHeight="360px"
            className="custom-carousel"
          />
        </Card>
      </div>
    </div>
  );
};

export default AuctionBids;
