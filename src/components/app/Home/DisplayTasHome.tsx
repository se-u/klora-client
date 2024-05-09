import { AddCircle, Milk } from "iconsax-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";

function DisplayTasHome() {
    const slideImages = [
        {
            id: 1,
            level: "Level 1",
            slideImages: "https://swiperjs.com/demos/images/nature-1.jpg",
            jmlBotol: 3,
            maxBotol: 10,
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
        <div>
            <Swiper
                effect={"flip"}
                pagination={true}
                modules={[EffectFlip, Pagination, Navigation]}
                className="mySwiper max-w-xs br"
            >
                {slideImages.map((keranjang) => (
                    <SwiperSlide
                        key={keranjang.id}
                        className="grid gap-3 relative"
                    >
                        <div className="flex absolute z-50 px-3 w-full my-3 justify-between ">
                            <div className="grid px-5 py-1.5 bg-neutral-50 rounded-full border border-neutral-400 w-fit items-center">
                                <p className="text-sm">{keranjang.level}</p>
                            </div>
                            <div>
                                <AddCircle className="w-8 h-8 text-neutral-100" />
                            </div>
                        </div>
                        <img
                            src={keranjang.slideImages}
                            alt="Gambar"
                            className="rounded-3xl"
                        />
                        <div className="flex">
                            {/* icon botol */}
                            <Milk
                                variant="Bulk"
                                className="text-primary-600 w-16 h-16"
                            />
                            {/* end icon botol */}
                            {/* status bar & prosentase */}
                            <div className="grid w-full items-center">
                                {/* Status Bar */}
                                <div className="grid gap-1">
                                    <span
                                        id="ProgressLabel"
                                        className="sr-only text-neutral-700"
                                    >
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
