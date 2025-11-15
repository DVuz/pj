import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

interface ImageCarouselProps {
  mainImage: string;
  subImages: string[];
  productName: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ mainImage, subImages, productName, product }) => {
  // Giới hạn tối đa 10 ảnh để UX tốt hơn
  console.log('Rendering ImageCarousel with images:', { product });
  const maxImages = 10;
  const limitedSubImages = subImages.slice(0, maxImages - 1);
  const allImages = [mainImage, ...limitedSubImages];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Show warning in console if too many images
  if (subImages.length > maxImages - 1) {
    console.warn(`Product has ${subImages.length + 1} images. Only showing first ${maxImages}.`);
  }

  const handlePrevious = () => {
    setCurrentImageIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image Display */}
      <div className="relative bg-gray-50 rounded-lg overflow-hidden group">
        <img
          src={allImages[currentImageIndex]}
          alt={`${productName} - ${currentImageIndex + 1}`}
          className="w-full h-[450px] object-contain"
        />

        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2.5 py-1 rounded-full text-xs">
          {currentImageIndex + 1} / {allImages.length}
        </div>
      </div>

      {/* Thumbnail List */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {allImages.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
              currentImageIndex === index
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
