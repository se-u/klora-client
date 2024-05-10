import React, { useState } from "react";
import AppButton from "../AppButton.tsx";

// Dummy data for transactions
const dummyData = [
    {
        id: 1,
        name: "Calvin",
        address: "0:1234567890abcdef",
        totalBottles: 10,
        verified: false,
    },
    {
        id: 2,
        name: "Sen",
        address: "0:abcdef1234567890",
        totalBottles: 5,
        verified: true,
    },
    // Add more dummy data here
];

const ModeratUi = () => {
    const [transactions, setTransactions] = useState(dummyData);
    const [totalCollected, setTotalCollected] = useState(15); // Example total bottles collected by admin

    const handleVerify = (id) => {
        const updatedTransactions = transactions.map((transaction) =>
            transaction.id === id ? { ...transaction, verified: true } : transaction
        );
        setTransactions(updatedTransactions);
    };

    const handleCancel = (id) => {
        const updatedTransactions = transactions.filter(
            (transaction) => transaction.id !== id
        );
        setTransactions(updatedTransactions);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-xl font-semibold mt-3 mb-4">Halo👋, Selamat datang Bastian</h1>
            <div className="bg-white hover:bg-primary-100 justify-between items-center px-2 py-4 rounded-lg border-t-2 border-l-2 border-r-[5.2px] pr-2 border-b-[3px] border-border mb-4 flex">
                <h2 className="text-lg font-semibold">Total Bottles Collected</h2>
                <p className="text-lg font-semibold">{totalCollected}</p>
            </div>
            <div className="bg-white   border-t-2 border-l-2 border-r-[5.2px] pr-2 border-b-[3px] border-border p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Transactions</h2>
                {transactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className=" p-3 mb-3 border-2 border-border rounded-md shadow-md"
                    >
                        <h3 className="text-lg font-semibold">{transaction.name}</h3>
                        <p className="text-sm font-medium">Address: {transaction.address}</p>
                        <div className=" flex justify-between">
                            <p className="text-sm font-medium">Total Botol :</p>
                            <input type="text" name="jml_botol" className="rounded-md "
                                   value={transaction.totalBottles}/>
                        </div>
                        {transaction.verified ? (
                            <AppButton text="Verify"/>
                        ) : (
                            <div className="flex gap-3 mt-2">
                                <AppButton text="Verify" onClick={() => handleVerify(transaction.id)}/>
                                <AppButton text="Cancel" onClick={() => handleCancel(transaction.id)}/>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ModeratUi;
