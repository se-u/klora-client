import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, BuyCrypto, CloseCircle } from "iconsax-react";
import AppButton from "../../components/app/AppButton";
import { useTonAddress } from "@tonconnect/ui-react";
import { useTonClient } from "../../hooks/useTonClient";
import config from "../../../config";
import { Address, toNano } from "@ton/core";
import { BagItem, Barter } from "../../contracts/Barter";
import { useTonConnect } from "../../hooks/useTonConnect";

type InfoProductType = {
  id: bigint;
  level: bigint;
  image_url: string;
  name: string;
  price: string;
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Shopping() {
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<BagItem>();
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [addToItem, setAddToItem] = useState(false);
  const [newBag, setNewBag] = useState<string>();
  const [myBags, setMyBags] = useState<string[]>();
  const { sender } = useTonConnect();
  const handleChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
    setPurchaseSuccess(false); // Reset purchase success message
  };

  const handlePurchase = async (selectedProduct: BagItem) => {
    const start_admin_balance = await client?.getBalance(
      Address.parse("0QBNwC2ou0P7AOxsahUPuUZQn71aTIxzXa9BnMWB0MQgAY1Y")
    );

    await sender.send({
      to: Address.parse("0QBNwC2ou0P7AOxsahUPuUZQn71aTIxzXa9BnMWB0MQgAY1Y"),
      value: selectedProduct.price,
    });
    let end_admin_balance = await client?.getBalance(
      Address.parse("0QBNwC2ou0P7AOxsahUPuUZQn71aTIxzXa9BnMWB0MQgAY1Y")
    );
    while (start_admin_balance == end_admin_balance) {
      end_admin_balance = await client?.getBalance(
        Address.parse("0QBNwC2ou0P7AOxsahUPuUZQn71aTIxzXa9BnMWB0MQgAY1Y")
      );
      await sleep(5000);
    }

    // Perform purchase logic here
    setAddToItem(true);
    setNewBag(selectedProduct.id.toString());
    setPurchaseSuccess(true);
    setTimeout(() => {
      setPurchaseSuccess(false);
    }, 2000); // Hide success message after 2 seconds
  };

  const friendlyAddress = useTonAddress();
  const client = useTonClient();
  const { barterContract } = config;

  const [infoProduct, setInfoProduct] = useState<BagItem[]>();
  const sortProducts = () => {
    if (infoProduct == undefined) return;
    let filteredProducts = [...infoProduct];

    // Filter based on search query
    if (searchQuery.trim() !== "") {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Sorting
    if (sortBy === "levelLowToHigh") {
      return filteredProducts.sort((a, b) => Number(a.level) - Number(b.level));
    } else if (sortBy === "levelHighToLow") {
      return filteredProducts.sort((a, b) => Number(b.level) - Number(a.level));
    } else {
      return filteredProducts;
    }
  };
  useEffect(() => {
    const get = async () => {
      if (!client) return;
      const barterMaster = client.open(
        Barter.fromAddress(Address.parse(barterContract.toString()))
      );
      if (!friendlyAddress) return;
      const infoProduct: BagItem[] = (
        await barterMaster.getBagProducts()
      ).values();
      setInfoProduct(infoProduct);
      console.log(infoProduct);

      // TODO ADD NEW FUNCTION
      const myBags = (
        await barterMaster.getCurrentBag(Address.parse(friendlyAddress))
      ).bags.split("-");
      setMyBags(myBags);

      if (addToItem) {
        await barterMaster.send(
          sender,
          { value: toNano("0.01") },
          {
            $$type: "ArgAddUserBag",
            address: Address.parse(friendlyAddress),
            bags: myBags + "-" + newBag,
          }
        );
        setNewBag("");
      }
    };
    get();
  }, [addToItem, barterContract, client, friendlyAddress, newBag, sender]);
  return (
    <>
      <div>
        <section className="grid gap-4">
          {/* Header, kata pembuka */}
          <header className="grid gap-2">
            <h2 className="text-3xl font-bold text-neutral-900">Bag Shop</h2>
            <p className=" text-neutral-500">
              Bag shop merupakan toko bag digital.
            </p>
          </header>
          {/* END Header, kata pembuka */}

          <div className="flex gap-2 max-w-full items-center justify-between">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-white border border-neutral-200 rounded-lg px-3 py-1 text-xs"
            />
            {/* Sorting Dropdown */}
            <select
              value={sortBy}
              onChange={handleChange}
              className="bg-white border border-neutral-200 rounded-lg px-3 py-1 text-xs text-neutral-600"
            >
              <option value="default">Default</option>
              <option value="levelLowToHigh">Low to High</option>
              <option value="levelHighToLow">High to Low</option>
            </select>
          </div>

          {/* List Produk */}
          <ul className="grid gap-4 sm:grid-cols-2 ">
            {sortProducts()?.map((produknya) => (
              <li
                key={produknya.id}
                className="border hover:bg-primary-100 rounded-lg p-1 border-t-2 border-l-2 border-r-[5px] border-b-[3px] border-border"
              >
                <Link
                  to="#"
                  className="group block  overflow-hidden"
                  onClick={() => handleShowDetails(produknya)}
                >
                  <img
                    src={produknya.image_url}
                    alt={produknya.name}
                    className="size-44 object-cover"
                  />

                  <div className="relative  pl-2">
                    <p className="font-bold">Level {Number(produknya.level)}</p>
                    <h3 className="text-xs font-semibold text-neutral-700">
                      {produknya.name}
                    </h3>

                    <p className="mt-2">
                      <span className="sr-only"> Regular Price </span>

                      <span className="tracking-wider font-bold text-neutral-900">
                        {Number(produknya.price) / 1000000000} KLO
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 border border-gray-300 rounded-md max-w-sm">
            <button onClick={handleCloseDetails}>
              <CloseCircle variant="Bulk" className="text-primary-600" />
            </button>
            <div className=" flex flex-col justify-center items-center text-center">
              <h4 className="text-md font-bold">{selectedProduct.name}</h4>
              <img
                src={selectedProduct.image_url}
                className="size-40 mt-2"
                alt="NFT"
              />
            </div>
            <div className="mx-8 my-2">
              <div className="mt-2 font-medium">
                <div className="flex justify-between">
                  <p>Level : {Number(selectedProduct.level)}</p>
                  <p>
                    Harga : {Number(selectedProduct.price) / 1000000000} KLO
                  </p>
                </div>
                <div className="mt-2">
                  <p className="font-bold">Penambahan</p>
                  <p className="flex items-center gap-2">
                    Botol/Minggu : +20
                    <ArrowUp
                      className="w-4 h-4 text-primary-600"
                      variant="Bulk"
                    />
                  </p>
                  <p className="flex items-center gap-2">
                    Swap Currency : + 0.001 KLO
                    <ArrowUp
                      className="w-4 h-4 text-primary-600"
                      variant="Bulk"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              {myBags?.includes(selectedProduct.id.toString()) ? (
                <AppButton text="Sudah Dimiliki" onClick={undefined} />
              ) : (
                <AppButton
                  onClick={() => handlePurchase(selectedProduct)}
                  text="Beli"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Purchase success popup */}
      {purchaseSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 border border-gray-300 rounded-md max-w-sm flex flex-col text-center items-center">
            <BuyCrypto className="text-green-500 w-12 h-12 mb-2" />
            <p className="text-lg font-bold">
              Pembelian <br /> {selectedProduct.name} <br /> Sukses!
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Shopping;
