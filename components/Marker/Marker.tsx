import Image from 'next/image';

export default function Marker() {
    return (
        <div >
            <Image src='/images/location-pin.png' width={50} height={50} alt='location marker' className="w-[2rem] h-[2rem]" />
        </div>
    )
}