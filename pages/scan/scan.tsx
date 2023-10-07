import Webcam from 'react-webcam';
import React, { Suspense } from 'react';
import Layout from '@/components/Layout';
import { ReactElement } from 'react';
import Image from 'next/image';
import OpenAI from 'openai';
import getConfig from 'next/config';

const imageContraints = {
    width: 1280,
    height: 720,
    facingMode: "environment"
};

export async function getServerSideProps() {
    const serverRuntimeConfig = getConfig();
    const openai = new OpenAI(serverRuntimeConfig.OPENAI_API_KEY);
    const response = await openai.images.generate(
        {
            prompt: "This is a photo of a dog",
            n: 1,
            size: "1024x1024"
        }
    )
    
}

export default function Scan() {
    const webcamRef = React.useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = React.useState<string | null | undefined>(null);
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current?.getScreenshot();
            setImgSrc(imageSrc);
        },
        [webcamRef, setImgSrc]
    );
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
                <div className="flex flex-col items-center justify-center mt-20 bg-white rounded-lg p-4 w-[21rem] lg:w-[50rem] items-center justify-center border border-4 border-[#806D40]">
                    <h1 className="text-3xl mb-8">Minting...</h1>
                <div className="flex space-x-8 ">
                    
                    <Image
                        src={imgSrc}
                        alt="Picture of the author"
                        width={500}
                        height={500}
                        className="w-[8rem] h-[7rem] lg:w-[20rem] lg:h-[13rem] rounded-md"
                    />
                                        <Image
                        src={imgSrc}
                        alt="Picture of the author"
                        width={500}
                        height={500}
                        className="w-[8rem] h-[7rem] lg:w-[20rem] lg:h-[13rem] rounded-md"
                    />
                </div>
                </div>
            )}
        </div>
    )
}

Scan.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
}