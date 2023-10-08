import Webcam from 'react-webcam';
import React, { Suspense, useState } from 'react';
import Layout from '@/components/Layout';
import { ReactElement, useEffect, useContext } from 'react';
import Image from 'next/image';
import getConfig from 'next/config';
import { ConnexContext } from '../_app';
import { toast } from 'react-toastify';
// import create_proof from '../../ezkl_js/create_proof';

const { publicRuntimeConfig } = getConfig();

const imageContraints = {
    width: 1280,
    height: 720,
    facingMode: "environment"
};

export default function Scan() {
    const { thor, vendor } = useContext(ConnexContext);

    const webcamRef = React.useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = React.useState<string | null | undefined>(null);
    const [finalImageUrl, setFinalImageUrl] = useState<string | null | undefined>(null);
    const [tokenId, setTokenId] = useState<string | null | undefined>(null);
    const [location, setLocation] = useState<{ lat: number, lng: number }>({ lat: 42.3744695, lng: -71.1311465 });

    async function mintNFT(url: string) {
        const { publicRuntimeConfig } = getConfig();
        const backend_url = publicRuntimeConfig.BACKEND_URL;
        const addressContract = publicRuntimeConfig.CONTRACT_ADDRESS;
        const mint_abi = {
            "inputs": [
              {
                "internalType": "string",
                "name": "tokenURI",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "location",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "classification",
                "type": "string"
              }
            ],
            "name": "mintNFT",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          };
        try {
            const mintNFTMethod = thor.account(addressContract).method(mint_abi);
            console.log(JSON.stringify(location));
            console.log(url)
            
            const urlParams = new URLSearchParams({
                url: url,
            });
            const data = await fetch(backend_url + urlParams);
            const json = await data.json();
            toast.info(json.result, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });

            const transferClause = mintNFTMethod.asClause(url, JSON.stringify(location), json.result);
            const tokenId = await vendor.sign('tx', [{
                to: addressContract,
                value: 0,
                data: transferClause.data,
            }]).request()
            setTokenId(tokenId.decoded[0]);
        } catch (e) {
            console.log(e);
        }
    }

    async function uploadImage(dataUrl: string | null | undefined) {

        try {
            const imageBytes = (dataUrl as string).split(",")[1];
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({ imageBytes: imageBytes }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
            };
            const data = await fetch('/api/stable_diffusion', requestOptions);
            const json = await data.json();
            return json.stable_diffusion_url;
        } catch (e) {
            console.log(e);
        }
    }

    async function capture() {
        const imageSrc = webcamRef.current?.getScreenshot();
        setImgSrc(imageSrc);
        await uploadImage(imageSrc).then(async (url) => {
            setFinalImageUrl(url);
            await mintNFT(url);
        });
    };

    useEffect(() => {
        const initLocation = async () => {
            const requestOptions = {
                method: 'POST',
            };
            const data = await fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=' + publicRuntimeConfig.GOOGLE_API_KEY, requestOptions);
            const json = await data.json();
            setLocation(json.location);
        };
        initLocation();

    }, [finalImageUrl])

    return (
        <div className='flex flex-col items-center min-h-screen background-patterned'>
            <div className="mt-[8rem] w-max flex flex-col items-center space-y-2 lg:space-y-8 border p-2 rounded-xl border-4 border-[#806D40] bg-white">
                <Suspense fallback={<p className="text-xl">Loading Webcam...</p>}>
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        videoConstraints={imageContraints}
                        className="w-[20rem] h-[17rem] lg:w-[50rem] lg:h-[30rem]"
                    />
                </Suspense>
                <button className="bg-lime-800 text-white w-[6rem] h-[3rem] rounded-lg hover:underline hover:bg-[#A1BA89] hover:text-black border-black border-2" onClick={capture}>Scan</button>
            </div>
            {imgSrc && (
                <div className="flex flex-col items-center justify-center mt-20 bg-white rounded-lg p-4 w-[21rem] lg:w-[50rem] items-center justify-center border border-4 border-[#806D40] mb-20">
                    <h1 className="text-3xl mb-8">Minting...</h1>
                    <div className="flex space-x-8 ">

                        <Image
                            src={imgSrc}
                            alt="Picture of the leaf"
                            width={500}
                            height={500}
                            className="w-[8rem] h-[8rem] lg:w-[20rem] lg:h-[13rem] rounded-md"
                        />
                        {finalImageUrl ? (<Image
                            src={finalImageUrl}
                            alt="Picture of the leaf"
                            width={500}
                            height={500}
                            className="w-[8rem] h-[8rem] lg:w-[20rem] lg:h-[13rem] rounded-md"
                        />) : (<Image
                            src='/images/loading.gif'
                            alt="Loading picture"
                            width={500}
                            height={500}
                            className="w-[8rem] h-[8rem] lg:w-[20rem] lg:h-[13rem] rounded-md animate-pulse"
                        />)}
                    </div>
                </div>
            )}
        </div>
    )
}

Scan.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
}