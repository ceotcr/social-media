import Image from 'next/image'
import React from 'react'

const Logo = () => {
    return (
        <Image
            src='/logo.png'
            alt='Logo'
            width={200}
            height={200}
            className='w-28 h-28'
        />
    )
}

export default Logo