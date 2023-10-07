import { ReactElement } from 'react';
import Layout from '@/components/Layout';

export default function Collection() {
    return (
        <>
        </>
    );
}

Collection.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
}