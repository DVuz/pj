import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Blog {
  id: number;
  title: string;
  description: string;
  time: string;
}

const Blogs: React.FC = () => {
  const blogsRef = useRef<HTMLDivElement>(null);

  const blogs: Blog[] = [
    {
      id: 1,
      title: 'Hướng dẫn tự decor phòng ngủ đẹp và chuẩn phong thủy 2024',
      description:
        'Trong bài viết này, chúng tôi sẽ hướng dẫn bạn cách tự decor phòng ngủ của mình sao cho đẹp và hợp phong thủy nhất.',
      time: 'Thứ năm, 30 tháng 9 năm 2024',
    },
    {
      id: 2,
      title: 'Xu hướng nội thất phòng khách hiện đại 2024',
      description:
        'Khám phá những xu hướng nội thất phòng khách mới nhất, từ màu sắc, chất liệu đến cách bố trí không gian.',
      time: 'Thứ ba, 28 tháng 9 năm 2024',
    },
    {
      id: 3,
      title: '10 mẹo sắp xếp nội thất cho không gian nhỏ',
      description:
        'Những bí quyết giúp bạn tối ưu hóa không gian sống, tạo cảm giác rộng rãi và thoáng mát cho ngôi nhà.',
      time: 'Chủ nhật, 26 tháng 9 năm 2024',
    },
  ];

  const scrollCarousel = (direction: 'left' | 'right') => {
    const scrollAmount = 320;
    if (blogsRef.current) {
      blogsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-[1560px] mx-auto px-5">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--green-primary)] m-0">Blog</h2>
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
          ref={blogsRef}
          className="flex lg:grid lg:grid-cols-3 gap-8 overflow-x-auto lg:overflow-visible scroll-smooth pb-4 lg:pb-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {blogs.map(blog => (
            <article
              key={blog.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer min-w-[300px] max-w-[300px] lg:min-w-0 lg:max-w-none flex-shrink-0"
            >
              <div className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1200"
                  alt={blog.title}
                  className="w-full h-48 lg:h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 lg:p-6">
                <p className="text-gray-500 text-sm mb-2 font-medium">{blog.time}</p>
                <h3 className="text-lg lg:text-xl font-semibold mb-3 leading-snug text-[var(--green-primary)]">
                  {blog.title}
                </h3>
                <p className="text-base leading-relaxed text-gray-700 mb-4">{blog.description}</p>
                <a
                  href="#"
                  className="text-[var(--yellow-primary)] font-semibold text-sm hover:text-[var(--green-primary)] transition-colors no-underline"
                >
                  Xem thêm →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
