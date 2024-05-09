import React from "react";

function AppButton({ onClick, text }) {
    return (
        <button
            className="w-full py-2 px-4 mt-4 bg-primary-700 border-primary-100 aria-pressed:border-4  text-white rounded-xl hover:bg-primary-600 transition duration-300"
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default AppButton;
