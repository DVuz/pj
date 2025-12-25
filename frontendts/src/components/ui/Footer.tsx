interface CompanyInformation {
  hotline: string;
  email: string;
  address: string;
}

const FooterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      {/* Mobile: collapsible */}
      <details className="md:hidden rounded-lg bg-white/5 px-3 py-2">
        <summary className="cursor-pointer list-none select-none flex items-center justify-between">
          <span className="text-sm font-semibold text-[#f59e0b]">{title}</span>
          <span className="text-white/70 text-xs">Mở</span>
        </summary>
        <div className="pt-2">{children}</div>
      </details>

      {/* Desktop: normal block */}
      <div className="hidden md:block">
        <h3 className="text-base lg:text-[1.125rem] mb-3 lg:mb-[15px] font-semibold text-[#f59e0b] border-b-2 border-[#f59e0b] pb-[5px] inline-block">
          {title}
        </h3>
        {children}
      </div>
    </>
  );
};

const Footer: React.FC = () => {
  const companyInformation: CompanyInformation = {
    hotline: import.meta.env.VITE_COMPANY_PHONE || '0328715219',
    email: import.meta.env.VITE_COMPANY_EMAIL || 'info@ddstore.com',
    address: import.meta.env.VITE_COMPANY_ADDRESS || 'Đông Lâm, Tiền Hải, Thái Bình, Việt Nam',
  };

  return (
    <footer className="bg-[#16512e] text-white px-3 pt-6 pb-4 sm:px-4 sm:pt-8 md:px-4 md:pt-9 lg:px-5 lg:pt-10 rounded-t-2xl md:rounded-t-[35px] lg:rounded-t-[40px]">
      <div className="max-w-[1560px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 md:gap-[25px] lg:gap-[30px] mb-6 md:mb-[30px] text-center md:text-left">
          {/* Brand Section */}
          <div className="flex flex-col gap-3 md:gap-[15px]">
            <div className="text-2xl md:text-[1.75rem] lg:text-[2rem] font-extrabold text-[#f59e0b]">
              DDStore
            </div>
            <p className="text-sm md:text-[0.9rem] lg:text-base leading-[1.6] opacity-90 max-w-full md:max-w-[350px] lg:max-w-[400px] mx-auto md:mx-0">
              Chuyên cung cấp nội thất gỗ chất lượng cao với giá cả hợp lý. Uy tín - Chất lượng -
              Dịch vụ tốt nhất dành cho khách hàng.
            </p>

            {/* Mobile quick contact */}
            <div className="md:hidden grid grid-cols-2 gap-2 text-left">
              <a
                href={`tel:${companyInformation.hotline}`}
                className="rounded-lg bg-white/10 px-3 py-2 text-xs leading-tight hover:bg-white/15"
              >
                Hotline
                <div className="font-semibold text-white">{companyInformation.hotline}</div>
              </a>
              <a
                href={`mailto:${companyInformation.email}`}
                className="rounded-lg bg-white/10 px-3 py-2 text-xs leading-tight hover:bg-white/15"
              >
                Email
                <div className="font-semibold text-white truncate">{companyInformation.email}</div>
              </a>
            </div>
          </div>

          {/* Về chúng tôi */}
          <FooterSection title="Về chúng tôi">
            <ul className="list-none p-0 m-0 grid grid-cols-2 gap-y-2 gap-x-3 md:gap-y-1.5 md:gap-x-3 lg:gap-y-2 lg:gap-x-[15px] justify-items-center md:justify-items-start">
              <li>
                <a
                  href="/about"
                  className="text-white no-underline text-sm md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Giới thiệu
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-white no-underline text-sm md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Liên hệ
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-white no-underline text-sm md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a
                  href="/news"
                  className="text-white no-underline text-sm md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Tin tức
                </a>
              </li>
            </ul>
          </FooterSection>

          {/* Sản phẩm */}
          <FooterSection title="Sản phẩm">
            <ul className="list-none p-0 m-0 grid grid-cols-2 gap-y-2 gap-x-3 md:gap-y-1.5 md:gap-x-3 lg:gap-y-2 lg:gap-x-[15px] justify-items-center md:justify-items-start">
              <li>
                <a
                  href="/products/table"
                  className="text-white no-underline text-sm md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Bàn gỗ
                </a>
              </li>
              <li>
                <a
                  href="/products/chair"
                  className="text-white no-underline text-sm md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Ghế gỗ
                </a>
              </li>
              <li>
                <a
                  href="/products/cabinet"
                  className="text-white no-underline text-sm md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Tủ gỗ
                </a>
              </li>
              <li>
                <a
                  href="/products/bed"
                  className="text-white no-underline text-sm md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Giường gỗ
                </a>
              </li>
            </ul>
          </FooterSection>

          {/* Chính sách */}
          <FooterSection title="Chính sách">
            <ul className="list-none p-0 m-0 grid grid-cols-2 gap-y-2 gap-x-3 md:gap-y-1.5 md:gap-x-3 lg:gap-y-2 lg:gap-x-[15px] justify-items-center md:justify-items-start">
              <li>
                <a
                  href="/warranty"
                  className="text-white no-underline text-sm md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Bảo hành
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-white no-underline text-sm md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Bảo mật
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-white no-underline text-sm md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Điều khoản
                </a>
              </li>
              <li>
                <a
                  href="/return"
                  className="text-white no-underline text-sm md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Đổi trả
                </a>
              </li>
            </ul>
          </FooterSection>

          {/* Liên hệ */}
          <FooterSection title="Liên hệ">
            <ul className="list-none p-0 m-0 flex flex-col gap-2 items-center md:items-start">
              <li className="md:hidden text-sm opacity-90">Địa chỉ: {companyInformation.address}</li>
              <li className="hidden md:block">
                <a
                  href={`tel:${companyInformation.hotline}`}
                  className="text-white no-underline text-[0.85rem] md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Hotline: {companyInformation.hotline}
                </a>
              </li>
              <li className="hidden md:block">
                <a
                  href={`mailto:${companyInformation.email}`}
                  className="text-white no-underline text-[0.85rem] md:text-[0.8rem] lg:text-[0.875rem] transition-all duration-300 block py-1.5 md:py-1 opacity-90 hover:text-[#f59e0b] hover:opacity-100 md:hover:translate-x-[5px]"
                >
                  Email: {companyInformation.email}
                </a>
              </li>
              <li className="hidden md:block">
                <span className="text-white text-[0.85rem] md:text-[0.8rem] lg:text-[0.875rem] block py-1.5 md:py-1 opacity-90">
                  Địa chỉ: {companyInformation.address}
                </span>
              </li>
            </ul>
          </FooterSection>
        </div>

        <div className="border-t border-white/30 pt-4 md:pt-[15px] lg:pt-5 text-center mt-4 md:mt-5 lg:mt-0">
          <p className="text-xs sm:text-[0.8rem] lg:text-[0.875rem] m-0 opacity-80">
            © 2025 DDStore. All rights reserved. Made with ❤️ in Vietnam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
