import { useState, useContext } from "react";
import { ConnexContext } from "../../pages/_app";
import getConfig from "next/config";

export default function Verify() {

    const {thor, vendor} = useContext(ConnexContext);

    const [publicSignals, setPublicSignals] = useState<any>([]);
    const [proof, setProof] = useState<string>("");

    function handleChange(e: any) {
        e.preventDefault();
        if (e.target.value !== "" || e.target.value !== null) {
            try {
                const data = JSON.parse(e.target.value);
                setProof(data.proof);
                setPublicSignals(data.publicSignals);
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function verify() {
        const { publicRuntimeConfig } = getConfig();
        const addressContract = publicRuntimeConfig.CONTRACT_ADDRESS;
        const verify_abi = {};
        try {
            const verifyMethod = thor.account(addressContract).method(verify_abi);
            const result = await verifyMethod.call(proof, publicSignals);
            console.log(result.decoded[0]);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="flex items-center rounded-xl shadow border-2 border-black">
            <div className="flex items-center p-2 bg-white rounded-l-lg w-[15rem] lg:w-[30rem]">
                <input className="w-[14rem] lg:w-[29rem] outline-none" placeholder="{publicSignals, proof}" onChange={(e) => { handleChange(e) }}></input>
            </div>
            <button className="hover:bg-[#A1BA89] hover:text-black p-2 rounded-r-lg hover:underline bg-lime-800 text-white" onClick={verify}>Verify</button>
        </div>
    );
}