import { useState, useContext } from "react";
import { ConnexContext } from "../../pages/_app";
import getConfig from "next/config";
import { toast } from 'react-toastify';

export default function Verify() {

    const { thor, vendor } = useContext(ConnexContext);

    const [publicSignals, setPublicSignals] = useState<number[]>([]);
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
        const addressContract = publicRuntimeConfig.VERIFIER_ADDRESS;
        const verify_abi = {
            "inputs": [
                {
                    "internalType": "bytes",
                    "name": "proof",
                    "type": "bytes"
                },
                {
                    "internalType": "uint256[]",
                    "name": "instances",
                    "type": "uint256[]"
                }
            ],
            "name": "verifyProof",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        };
        try {
            console.log(proof)
            console.log(publicSignals)
            const verifyMethod = thor.account(addressContract).method(verify_abi);
            const result_encoded = await verifyMethod.call(proof, publicSignals);
            const result = result_encoded.decoded[0];

            if (result) {
                toast.success('Verified', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error('Proof failed', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });
            }
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