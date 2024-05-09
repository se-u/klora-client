import DisplayTasHome from "../../components/app/Home/DisplayTasHome";
import NearModHome from "../../components/app/Home/NearModHome";

// import React from "react";
function Home() {
    return (
        <>
            <div className="grid gap-3">
                <DisplayTasHome />
                <NearModHome />
            </div>
        </>
    );
}

export default Home;
