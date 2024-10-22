// components/Image.tsx
import Image from 'next/image';
import React from 'react';

interface CustomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  rounded?: boolean;
  shadow?: boolean;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  rounded = false,
  shadow = false,
}) => {
  return (
    <div
      className={`relative ${rounded ? 'rounded-full' : 'rounded-lg'} 
      ${shadow ? 'shadow-lg' : ''} overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill" // Tailwind hỗ trợ responsive cho ảnh
        objectFit="cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default CustomImage;
