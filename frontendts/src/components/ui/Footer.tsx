interface CompanyInformation {
  hotline: string;
  email: string;
  address: string;
}

const Footer: React.FC = () => {
  const companyInformation: CompanyInformation = {
    hotline: import.meta.env.VITE_COMPANY_PHONE || '0328715219',
    email: import.meta.env.VITE_COMPANY_EMAIL || 'info@ddstore.com',
    address: import.meta.env.VITE_COMPANY_ADDRESS || 'Đông Lâm, Tiền Hải, Thái Bình, Việt Nam',
  };

  return (
    <footer className="bg-[#16512e] rounded-t-[40px] text-white px-5 pt-10 pb-5 md:rounded-t-[35px] md:px-4 md:pt-9 lg:rounded-t-[40px] lg:px-5 lg:pt-10 max-[768px]:rounded-t-[25px] max-[768px]:px-3 max-[768px]:pt-8">
      <div className="max-w-[1560px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-[25px] md:gap-[25px] lg:gap-[30px] mb-[30px] text-center md:text-left">
          {/* Brand Section */}
          <div className="flex flex-col gap-3 md:gap-[15px]">
            <div className="text-2xl md:text-[1.75rem] lg:text-[2rem] font-extrabold text-[#f59e0b]">
              DDStore
            </div>
            <p className="text-[0.9rem] md:text-[0.9rem] lg:text-base leading-[1.6] opacity-90 max-w-full md:max-w-[350px] lg:max-w-[400px] mx-auto md:mx-0">
              Chuyên cung cấp nội thất gỗ chất lượng cao với giá cả hợp lý. Uy tín - Chất lượng -
              Dịch vụ tốt nhất dành cho khách hàng.
            </p>
          </div>

          {/* Về chúng tôi */}
          <div>
            <h3 className="text-base md:text-base lg:text-[1.125rem] mb-3 md:mb-3 lg:mb-[15px] font-semibold text-[#f59e0b] border-b-2 border-[#f59e0b] pb-[5px] inline-block">
              Về chúng tôi
            </h3>
            <ul className="list-none p-0 m-0 grid grid-cols-2 gap-y-[6px] gap-x-[15px] md:gap-y-[6px] md:gap-x-3 lg:gap-y-2 lg:gap-x-[15px] justify-items-center md:justify-items-start">
              <li>
                <a
                  href="/about"
                  className="text-white no-underline text-[0.85rem] md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Giới thiệu
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-white no-underline text-[0.85rem] md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Liên hệ
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-white no-underline text-[0.85rem] md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a
                  href="/news"
                  className="text-white no-underline text-[0.85rem] md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Tin tức
                </a>
              </li>
            </ul>
          </div>

          {/* Sản phẩm */}
          <div>
            <h3 className="text-base md:text-base lg:text-[1.125rem] mb-3 md:mb-3 lg:mb-[15px] font-semibold text-[#f59e0b] border-b-2 border-[#f59e0b] pb-[5px] inline-block">
              Sản phẩm
            </h3>
            <ul className="list-none p-0 m-0 grid grid-cols-2 gap-y-[6px] gap-x-[15px] md:gap-y-[6px] md:gap-x-3 lg:gap-y-2 lg:gap-x-[15px] justify-items-center md:justify-items-start">
              <li>
                <a
                  href="/products/table"
                  className="text-white no-underline text-[0.85rem] md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Bàn gỗ
                </a>
              </li>
              <li>
                <a
                  href="/products/chair"
                  className="text-white no-underline text-[0.85rem] md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Ghế gỗ
                </a>
              </li>
              <li>
                <a
                  href="/products/cabinet"
                  className="text-white no-underline text-[0.85rem] md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Tủ gỗ
                </a>
              </li>
              <li>
                <a
                  href="/products/bed"
                  className="text-white no-underline text-[0.85rem] md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Giường gỗ
                </a>
              </li>
            </ul>
          </div>

          {/* Chính sách */}
          <div>
            <h3 className="text-base md:text-base lg:text-[1.125rem] mb-3 md:mb-3 lg:mb-[15px] font-semibold text-[#f59e0b] border-b-2 border-[#f59e0b] pb-[5px] inline-block">
              Chính sách
            </h3>
            <ul className="list-none p-0 m-0 grid grid-cols-2 gap-y-[6px] gap-x-[15px] md:gap-y-[6px] md:gap-x-3 lg:gap-y-2 lg:gap-x-[15px] justify-items-center md:justify-items-start">
              <li>
                <a
                  href="/warranty"
                  className="text-white no-underline text-[0.85rem] md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Bảo hành
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-white no-underline text-[0.85rem] md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Bảo mật
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-white no-underline text-[0.85rem] md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Điều khoản
                </a>
              </li>
              <li>
                <a
                  href="/return"
                  className="text-white no-underline text-[0.85rem] md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Đổi trả
                </a>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="text-base md:text-base lg:text-[1.125rem] mb-3 md:mb-3 lg:mb-[15px] font-semibold text-[#f59e0b] border-b-2 border-[#f59e0b] pb-[5px] inline-block">
              Liên hệ
            </h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-[6px] md:gap-2 lg:gap-2 items-center md:items-start">
              <li>
                <a
                  href={`tel:${companyInformation.hotline}`}
                  className="text-white no-underline text-[0.85rem] md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Hotline: {companyInformation.hotline}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInformation.email}`}
                  className="text-white no-underline text-[0.85rem] md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Email: {companyInformation.email}
                </a>
              </li>
              <li>
                <span className="text-white text-[0.85rem] md:text-[0.8rem] lg:text-[0.875rem] block py-1.5 md:py-1 opacity-90">
                  Địa chỉ: {companyInformation.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/30 pt-5 md:pt-[15px] lg:pt-5 text-center mt-5 md:mt-5 lg:mt-0">
          <p className="text-[0.8rem] md:text-[0.8rem] lg:text-[0.875rem] m-0 opacity-80">
            © 2025 DDStore. All rights reserved. Made with ❤️ in Vietnam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
