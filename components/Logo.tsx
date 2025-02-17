import Link from 'next/link';
import React from 'react'
import { AiTwotonePlayCircle } from 'react-icons/ai';

const Logo = () => {
  return (
    <Link href="/" className="lg:mb-12 text-white">
      <p className="font-dancingScript lg:text-4xl text-3xl flex items-center lg:mt-8">
        <AiTwotonePlayCircle /> Podcasti
        <span className="text-purple-600">f</span>y
      </p>
    </Link>
  );
}

export default Logo