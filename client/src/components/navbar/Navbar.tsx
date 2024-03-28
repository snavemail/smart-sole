import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 w-full border-b bg-white py-4">
      <div className="mx-auto max-w-[1500px] px-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={50} height={50} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
