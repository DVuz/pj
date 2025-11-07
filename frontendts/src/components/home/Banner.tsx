import React from 'react';
import { Link } from '@tanstack/react-router';
import { ShoppingCart } from 'lucide-react';
import homeImg from '../../assets/home.jpg';

const Banner: React.FC = () => {
  return (
    <section className="bg-[var(--green-primary)] text-white py-24">
      <div className="max-w-[1560px] mx-auto px-5 flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="flex-1 max-w-full lg:max-w-[50%] text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl mb-4 font-semibold text-[var(--yellow-primary)] leading-tight animate-bounce">
            Nội thất
          </h1>
          <p className="text-base lg:text-xl mb-6 lg:mb-8 leading-relaxed opacity-90">
            Khám phá nội thất thiết kế đương đại mang đến cảm giác thoải mái, sang trọng. Cá nhân
            hoá trong từng sản phẩm phù hợp với mọi không gian sống.
          </p>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-[var(--yellow-primary)] text-[var(--green-primary)] px-6 py-3 rounded-2xl font-semibold text-lg hover:bg-yellow-400 transition-colors no-underline"
          >
            <ShoppingCart size={20} />
            Mua Ngay
          </Link>
        </div>
        <div className="flex-1 text-center">
          <img
            src={homeImg}
            alt="Interior design showcase"
            className="max-w-full lg:max-w-[400px] h-auto mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
