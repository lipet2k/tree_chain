import Webcam from 'react-webcam';
import React, { Suspense, useState } from 'react';
import Layout from '@/components/Layout';
import { ReactElement, useEffect, useContext } from 'react';
import Image from 'next/image';
import getConfig from 'next/config';
import { ConnexContext } from '../_app';

export default function Scan() {
    return (<>
    </>)
}

Scan.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
}