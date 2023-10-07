// @ts-nocheck
import GoogleMapReact from 'google-map-react';
import React, { ReactElement, useEffect, useContext } from 'react';
import Layout from '@/components/Layout';
import getConfig from 'next/config';
import { ConnexContext } from '../_app';

export default function Explore() {
    return (
        <>
        </>
    )
}

Explore.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
}