// @ts-nocheck
import GoogleMapReact from 'google-map-react';
import React, { ReactElement, useEffect, useContext, useState } from 'react';
import Layout from '@/components/Layout';
import Verify from '@/components/Verify';
import Marker from '@/components/Marker';
import getConfig from 'next/config';
import { ConnexContext } from '../_app';

const { publicRuntimeConfig } = getConfig();

export default function Explore() {

    const [location, setLocation] = useState<{ lat: number, lng: number }>({ lat: 42.3744695, lng: -71.1311465 });

    const { thor, vendor } = useContext(ConnexContext);

    const [markers, setMarkers] = React.useState<any[]>([]);

    const defaultProps = {
        center: location,
        zoom: 14,
    };

    async function getMarkers() {
        const { publicRuntimeConfig } = getConfig();
        const addressContract = publicRuntimeConfig.CONTRACT_ADDRESS;
        const get_locations_abi = {
            "inputs": [],
            "name": "getLocations",
            "outputs": [
                {
                    "internalType": "string[]",
                    "name": "",
                    "type": "string[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        };
        try {
            const getLocationsMethod = thor.account(addressContract).method(get_locations_abi)
            const locations = await getLocationsMethod.call()
            const lat_lngs_decoded = locations.decoded[0];
            const lat_lngs = lat_lngs_decoded.map((lat_lng: string) => {
                return JSON.parse(lat_lng);
            });
            setMarkers(lat_lngs);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const initLocation = async () => {
            const requestOptions = {
                method: 'POST',
            };
            const data = await fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=' + publicRuntimeConfig.GOOGLE_API_KEY, requestOptions);
            const json = await data.json();
            setLocation(json.location);
        };

        const initMarkers = async () => {
            await getMarkers();
        }
        initLocation();
        initMarkers();
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen background-patterned">
            <div className="mt-[2rem] lg:mt-[4rem]">
                <Verify />
            </div>
            <div className="lg:h-[40rem] w-[20rem] h-[30rem] lg:w-[35rem] mt-[2rem] border-2 border border-[#806D40] p-2 bg-white border-4 rounded-xl">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: publicRuntimeConfig.GOOGLE_API_KEY }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    yesIWantToUseGoogleMapApiInternals
                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            lat={marker.lat}
                            lng={marker.lng}
                        />
                    ))}
                </GoogleMapReact>
            </div>
        </div>
    );
}

Explore.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
}