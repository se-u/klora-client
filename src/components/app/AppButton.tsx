
function AppButton({ onClick, text }) {
    return (
        <button className="relative block w-full mt-4">
            {/* Background overlay */}
            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-border"></span>
            {/* Button */}
            <span
                className="relative inline-block w-full h-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-primary-100 hover:text-gray-900"
                onClick={onClick}
            >
        {text}
      </span>
        </button>
    );
}

export default AppButton;
