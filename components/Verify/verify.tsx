export default function Verify() {
    return (
        <div className="flex items-center rounded-xl shadow border-2 border-black">
            <div className="flex items-center p-2 bg-white rounded-l-lg w-[15rem] lg:w-[30rem]">
                <input className="w-[14rem] lg:w-[29rem] outline-none" placeholder="{publicSignals, proof}"></input>
            </div>
            <button className="hover:bg-[#A1BA89] hover:text-black p-2 rounded-r-lg hover:underline bg-lime-800 text-white">Verify</button>
        </div>
    );
}