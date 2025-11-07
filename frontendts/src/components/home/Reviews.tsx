import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  id: number;
  text: string;
  author: string;
  location: string;
}

const Reviews: React.FC = () => {
  const reviewsRef = useRef<HTMLDivElement>(null);

  const reviews: Review[] = [
    {
      id: 1,
      text: 'Mình rất đánh giá cao về độ hoàn thiện của sản phẩm. Mẫu mã và màu sắc cũng rất đa dạng, nhiều lựa chọn.',
      author: 'Nguyễn Văn A',
      location: 'Hà Nội',
    },
    {
      id: 2,
      text: 'Sản phẩm chất lượng, giao hàng nhanh chóng. Nhân viên tư vấn rất nhiệt tình và chuyên nghiệp.',
      author: 'Trần Thị B',
      location: 'TP.HCM',
    },
    {
      id: 3,
      text: 'Đồ nội thất đẹp, chắc chắn. Giá cả hợp lý so với chất lượng. Sẽ quay lại mua tiếp.',
      author: 'Lê Văn C',
      location: 'Đà Nẵng',
    },
    {
      id: 4,
      text: 'Dịch vụ tuyệt vời! Từ tư vấn đến lắp đặt đều rất chuyên nghiệp. Rất hài lòng.',
      author: 'Phạm Thị D',
      location: 'Hải Phòng',
    },
  ];

  const scrollCarousel = (direction: 'left' | 'right') => {
    const scrollAmount = 320;
    if (reviewsRef.current) {
      reviewsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1560px] mx-auto px-5">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--green-primary)] m-0">
            Đánh giá của khách hàng
          </h2>
          <div className="flex lg:hidden gap-2">
            <button
              className="bg-[var(--green-primary)] text-white border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[var(--yellow-primary)] hover:text-[var(--green-primary)] transition-colors"
              onClick={() => scrollCarousel('left')}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="bg-[var(--green-primary)] text-white border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[var(--yellow-primary)] hover:text-[var(--green-primary)] transition-colors"
              onClick={() => scrollCarousel('right')}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div
          ref={reviewsRef}
          className="flex lg:grid lg:grid-cols-4 gap-8 overflow-x-auto lg:overflow-visible scroll-smooth pb-4 lg:pb-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map(review => (
            <div
              key={review.id}
              className="bg-white border border-[var(--green-primary)] p-4 lg:p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 min-w-[280px] max-w-[280px] lg:min-w-0 lg:max-w-none flex-shrink-0"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} fill="gold" color="gold" size={16} />
                ))}
              </div>
              <p className="text-base leading-relaxed mb-4 text-gray-700">{review.text}</p>
              <div className="flex items-center gap-4">
                <img
                  src="https://vcdn1-giaitri.vnecdn.net/2024/09/11/topp1-1726024148-7569-1726024442.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=Ft9T12dIYvit5NVvh6_NrQ"
                  alt={review.author}
                  className="w-12 h-12 lg:w-15 lg:h-15 rounded-full object-cover border-2 border-[var(--yellow-primary)]"
                />
                <div>
                  <h4 className="text-base font-semibold text-[var(--green-primary)] m-0">
                    Bạn {review.author}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1 m-0">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
