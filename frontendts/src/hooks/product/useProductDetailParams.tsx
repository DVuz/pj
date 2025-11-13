import { useLocation } from '@tanstack/react-router';

const parseSlugId = (param: string | undefined) => {
  if (!param) return { slug: '', product_id: '' };

  const parts = param.split('-');
  const product_id = parts[parts.length - 1];
  const slug = parts.slice(0, -1).join('-');
  return { slug, product_id };
};

export const useProductDetailParams = () => {
  const location = useLocation();

  const pathname = location.pathname;

  const pathSegments = pathname.split('/');

  const productParam = pathSegments[2];

  const product = parseSlugId(productParam);

  return {
    product,
  };
};
