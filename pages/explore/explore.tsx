import React, { ReactElement } from 'react';
import Layout from '@/components/Layout';
import Verify from '@/components/Verify';
import getConfig from 'next/config';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import GoogleMapReact from 'google-map-react';

const { publicRuntimeConfig } = getConfig();

export async function getServerSideProps() {
    const requestOptions = {
        method: 'POST',
    };
    const data = await fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=' + publicRuntimeConfig.GOOGLE_API_KEY, requestOptions);
    const json = await data.json();
    return {
        props: {
            location: json.location,
        },
    };
}

export default function Explore({location}: {location: {lat: number, lng: number}}) {
    const defaultProps = {
        center: location,
        zoom: 11,
        }
    
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
                onGoogleApiLoaded={({ map, maps }) => {
                    // do stuff with map and maps objects
                }}
            >
            </GoogleMapReact>
            </div>
        </div>
    );
}

Explore.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
}