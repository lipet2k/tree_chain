import { ReactElement, useContext, useState, useEffect } from 'react';
import { ConnexContext } from '../_app';
import Layout from '@/components/Layout';
import getConfig from 'next/config';
import Image from 'next/image';

export default function Collection() {
    const { thor, vendor } = useContext(ConnexContext);
    const [collection, setCollection] = useState<any[] | null | undefined>(null);

    async function getCollection() {
        const { publicRuntimeConfig } = getConfig();
        const addressContract = publicRuntimeConfig.CONTRACT_ADDRESS;
        const collection_abi = {
            "inputs": [],
            "name": "getCollection",
            "outputs": [
              {
                "components": [
                  {
                    "internalType": "string",
                    "name": "uri",
                    "type": "string"
                  },
                  {
                    "internalType": "string",
                    "name": "location",
                    "type": "string"
                  },
                  {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                  },
                  {
                    "internalType": "string",
                    "name": "classification",
                    "type": "string"
                  }
                ],
                "internalType": "struct MyNFT.Collection[]",
                "name": "",
                "type": "tuple[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          };
        try {
            const getCollectionMethod = thor.account(addressContract).method(collection_abi)
            const collection = await getCollectionMethod.call()
            console.log(collection)
            const collection_decoded = collection.decoded[0];
            setCollection(collection_decoded);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const initCollection = async () => {
            await getCollection();
        }
        initCollection();
    }, [getCollection]);

    return (<div className="flex flex-col items-center min-h-screen background-patterned grid justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {collection && collection.map((item: any, index: number) => {
            return (
                <div className="flex flex-col bg-white rounded p-2 items-center space-y-4 mt-10 border-4 border-[#806D40] w-[23rem]" key={index}>
                    <Image src={item.uri} width={50} height={50} alt="Image" className="lg:w-[20rem] lg:h-[10rem] w-[10rem] h-[10rem]" />
                    <h1 className="text-sm lg:text-md">{'Loc:' + `${item.location}`}</h1>
                    <h1 className="text-sm lg:text-md">{`Owner: ${item.owner.substring(0, 10)}...`}</h1>
                    <h1 className="text-sm lg-text-md">{`Class: ${item.classification}`}</h1>
                </div>)
        })}
        </div>

    </div >)
}

Collection.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
}