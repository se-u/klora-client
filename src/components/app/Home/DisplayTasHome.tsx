import { AddCircle, Milk } from "iconsax-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import { useTonAddress } from "@tonconnect/ui-react";
import { useTonClient } from "../../../hooks/useTonClient";
import { useEffect, useState } from "react";
import config from "../../../../config";
import { Barter } from "../../../contracts/Barter";
import { Address } from "@ton/ton";

type slideImages = {
  id: number;
  level: string;
  slideImages: string;
  jmlBotol: number;
  maxBotol: number;
  progressWidth?: string;
};

function DisplayTasHome() {
  const [myBottle, setMyBottle] = useState<number>();

  const friendlyAddress = useTonAddress();
  const client = useTonClient();
  const { barterContract } = config;
  useEffect(() => {
    const get = async () => {
      if (!client) return;
      const barterMaster = client.open(
        Barter.fromAddress(Address.parse(barterContract.toString()))
      );
      if (!friendlyAddress) return;
      const total = await barterMaster.getTotalBottle(
        Address.parse(friendlyAddress.toString())
      );
      console.log(total);
      setMyBottle(Number(total));
    };
    get();
  }, [barterContract, client, friendlyAddress]);

  const slideImages: slideImages[] = [
    {
      id: 1,
      level: "Level 1",
      slideImages: "/BAG1.png",
      jmlBotol: Number(myBottle),
      maxBotol: 15,
    },
    {
        id: 2,
        level: "Level 2",
        slideImages: "https://swiperjs.com/demos/images/nature-2.jpg",
        jmlBotol: 5,
        maxBotol: 15,
    },
    {
        id: 3,
        level: "Level 3",
        slideImages: "https://swiperjs.com/demos/images/nature-3.jpg",
        jmlBotol: 5,
        maxBotol: 20,
    },
    {
        id: 4,
        level: "Level 4",
        slideImages: "https://swiperjs.com/demos/images/nature-4.jpg",
        jmlBotol: 20,
        maxBotol: 25,
    },
    {
        id: 5,
        level: "Level 5",
        slideImages: "https://swiperjs.com/demos/images/nature-5.jpg",
        jmlBotol: 0,
        maxBotol: 30,
    },
  ];

  slideImages.forEach((item) => {
    item.progressWidth = `${(item.jmlBotol / item.maxBotol) * 100}%`;
  });

  return (
    <div className="rounded-lg border-t-2 border-l-2 border-r-[5.2px] pr-2 border-b-[3px] border-border">
      <Swiper
        effect={"flip"}
        pagination={true}
        modules={[EffectFlip, Pagination, Navigation]}
        className="mySwiper max-w-xs br"
      >
        {slideImages.map((keranjang) => (
          <SwiperSlide key={keranjang.id} className="grid gap-2 mb-2 relative">
            <div className="flex absolute z-50 px-3 w-full my-4  justify-between ">
              <div className="grid px-4 py-1 bg-neutral-50 rounded-full border  border-t-2 border-l-2 border-r-[5px] border-b-[3px] border-border w-fit items-center">
                <p className="text-sm">{keranjang.level}</p>
              </div>
              <div>
                <AddCircle className="w-8 h-8 text-border" />
              </div>
            </div>
            <img
              src={keranjang.slideImages}
              alt="Gambar"
              className="rounded-3xl mt-5"
            />
            <div className="flex p-2">
              {/* icon botol */}
              <Milk variant="Bulk" className="text-primary-600 w-16 h-16" />
              {/* end icon botol */}
              {/* status bar & prosentase */}
              <div className="grid w-full items-center">
                {/* Status Bar */}
                <div className="grid gap-1">
                  <span id="ProgressLabel" className="sr-only text-neutral-700">
                    Loading...
                  </span>
                  <span
                    role="progressbar"
                    aria-labelledby="ProgressLabel"
                    className="block rounded-full bg-primary-200"
                  >
                    <span
                      className="block h-3 rounded-full bg-primary-600"
                      style={{
                        width: keranjang.progressWidth,
                      }}
                    ></span>
                  </span>
                  {/* kalkulasi botol */}
                  <div className="flex justify-between">
                    <p className="text-xs text-neutral-400">
                      {keranjang.jmlBotol} botol
                    </p>
                    <p className="text-xs text-neutral-400">
                      {keranjang.maxBotol} botol
                    </p>
                  </div>
                  {/* end kalkulasi botol */}
                </div>
                {/* End Status Bar */}
              </div>
              {/* end of status bar & prosentase */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default DisplayTasHome;
