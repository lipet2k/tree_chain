import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="flex justify-between items-center p-4 olivine h-[4rem]">
            <div className="flex space-x-4">
                <Link href='/scan' className="flex space-x-2 items-center">
                    <Image src='/images/tree.png' alt='tree-logo' width={30} height={30} />
                    <h1 className='text-2xl lg:text-4xl hover:underline'>TreeChain</h1>
                </Link>
            </div>
            <div className="lg:hidden">
                <button onClick={toggleMenu}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 olivine z-50 flex flex-col justify-center items-center">
                    <div className="p-4">
                        <ul className="flex flex-col space-y-4 list-disc">
                            <li><Link href='/scan' className="text-xl hover:underline" onClick={toggleMenu}>Scan</Link></li>
                            <li><Link href='/explore' className="text-xl hover:underline" onClick={toggleMenu}>Explore</Link></li>
                            <li><Link href='/collection' className="text-xl hover:underline" onClick={toggleMenu}>Collection</Link></li>
                        </ul>
                    </div>
                    <div className="absolute top-0 right-0 m-4">
                        <button onClick={toggleMenu}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
            {!isMenuOpen && (
                <div className={`lg:flex space-x-4 lg:space-x-6 text-md lg:text-xl flex items-center hidden lg:block`}>
                <Link href='/scan' className="hover:underline">Scan</Link>
                <Link href='/explore' className="hover:underline">Explore</Link>
                <Link href='/collection' className="hover:underline">Collection</Link>
            </div>
            )}
        </div>
    )
}