import React from 'react';
import { useLocation } from '@tanstack/react-router';

const Top: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isDetailPage = currentPath.startsWith('/product/');
  if(isDetailPage) {
    return null;
  }
  const companyName = (
    import.meta.env.VITE_COMPANY_NAME || 'Cửa hàng gỗ Dương Dũng - DDStore'
  ).trim();
  const companyNameShort = 'DDStore';
  const companyPhone = (import.meta.env.VITE_COMPANY_PHONE || '0328715219').trim();
  const companyAddress = (
    import.meta.env.VITE_COMPANY_ADDRESS || 'Đông Lâm, Tiền Hải, Thái Bình, Việt Nam'
  ).trim();

  return (
    <div className="w-full bg-gray-50 border-b border-gray-200">
      <div className="max-w-[1560px] mx-auto w-full box-border px-5 py-2.5 flex justify-between items-center font-semibold">
        <p className="hidden md:block text-lg font-bold m-0 text-left text-[var(--green-primary)]">
          {companyName}
        </p>

        <p className="block md:hidden text-base font-bold m-0 text-left text-[var(--green-primary)]">
          {companyNameShort}
        </p>

        <div className="flex items-center gap-8 flex-shrink-0">
          <p className="flex items-center gap-1 whitespace-nowrap text-sm text-gray-700 m-0">
            Hotline: {companyPhone}
          </p>
          <p className="hidden md:flex items-center gap-1 whitespace-nowrap text-sm text-gray-700 m-0">
            Địa chỉ: {companyAddress}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Top;
