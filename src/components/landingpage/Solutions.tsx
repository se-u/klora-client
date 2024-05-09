import {Section} from "./index.jsx";

export default function Solutions() {
    const sections = [
        {
            id: 1,
            subHeading: "#Emission Calculator",
            heading: "Plastic Bottle Emission Calculator",
            desc: "Kalkulator Jejak Emisi Botol Plastik Klora membantu pengguna menghitung dampak lingkungan dari penggunaan botol plastik. Dengan data tentang jumlah dan jenis botol yang digunakan, kalkulator ini memberikan perkiraan emisi plastik yang terkait.",
            img: "Calculator.png",
        },
        {
            id: 2,
            subHeading: "#Swap",
            heading: "Swap Utility to Crypto Currency",
            desc: "Setiap orang yang melakukan pengumpulan botol bekas ke Volunteer terdekat akan mendapatka token Utility yang nantinya toker tersebut bisa di swap menjadi Currency Klorya yakni token KLO, dan juga token tersebut dapat di pergunakan di market Currency.",
            img: "Swap.png",
        },
        {
            id: 3,
            subHeading: "#NFT Bag",
            heading: "Upgradeable NFT",
            desc: "Setiap user yang mendaftar akan mendapatkan NFT dengan harga  RP 0 , namun nft tersebut hanya dapat membuat user mengumpulkan 10 botol per-satu minggu, dan jika ingin mengupgrade maka harus membeli NFT yang tersedia di market Klora.",
            img: "NFT.png",
        },
        {
            id: 4,
            subHeading: "#Kemana botolnya ?",
            heading: "Klora Recycle",
            desc: "Klora mengambil tanggung jawab untuk mengelola botol bekas dengan baik. Botol-botol yang kami kumpulkan akan disortir dan diproses menjadi bijih plastik yang dapat digunakan kembali. Melalui program daur ulang kami, kami berkomitmen untuk mengurangi limbah plastik dan mendorong siklus ekonomi yang berkelanjutan.",
            img: "Recycle.png",
        },
    ];




    return (
        <>
            <div className="mt-24 md:pt-5 w-full text-text">
                <h1 className="text-[2rem] tracking-tight text-center md:text-[3rem] font-bold text-primary-700 leading-[110%] mt-5">
                    Our Solutions
                </h1>

                <div className="xl:max-w-5xl mx-auto space-y-14 px-10 xl:px-0">
                    {sections.map((section) => (
                        <Section key={section.id} data={section}/>
                    ))}
                </div>
            </div>
        </>
    )
}
