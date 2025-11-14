import { Award, Clock, Heart, Mail, MapPin, Phone, Truck, Users } from 'lucide-react';
import React from 'react';

const AboutUs: React.FC = () => {
  const companyInfo = {
    name: import.meta.env.VITE_COMPANY_NAME || 'Cửa hàng gỗ Dương Dũng - DDStore',
    email: import.meta.env.VITE_COMPANY_EMAIL || 'vtd262002@gmail.com',
    phone: import.meta.env.VITE_COMPANY_PHONE || '0328715219',
    address: import.meta.env.VITE_COMPANY_ADDRESS || 'Đông Lâm, Tiền Hải, Thái Bình, Việt Nam',
    hours: import.meta.env.VITE_COMPANY_HOURS || '8:00 - 17:00, Thứ 2 - Chủ Nhật',
  };

  const features = [
    {
      icon: Award,
      title: 'Chất lượng đảm bảo',
      description: 'Sản phẩm gỗ tự nhiên, được tuyển chọn kỹ càng từ nguồn gỗ uy tín',
    },
    {
      icon: Users,
      title: 'Đội ngũ chuyên nghiệp',
      description: 'Thợ mộc lành nghề với nhiều năm kinh nghiệm trong ngành',
    },
    {
      icon: Heart,
      title: 'Tận tâm khách hàng',
      description: 'Luôn lắng nghe và đáp ứng mọi nhu cầu của khách hàng',
    },
    {
      icon: Truck,
      title: 'Giao hàng tận nơi',
      description: 'Vận chuyển an toàn, lắp đặt tận nhà miễn phí',
    },
  ];

  const stats = [
    { number: '15+', label: 'Năm kinh nghiệm' },
    { number: '5000+', label: 'Khách hàng tin tưởng' },
    { number: '100+', label: 'Sản phẩm đa dạng' },
    { number: '24/7', label: 'Hỗ trợ tư vấn' },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dfizo8h6h/image/upload/v1763116647/wallpaperflare.com_wallpaper_fkljkb.jpg"
            alt="Nội thất gỗ cao cấp"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Về chúng tôi</h1>
            <p className="text-xl md:text-2xl text-green-100 drop-shadow-md">
              Hơn 15 năm đồng hành cùng không gian sống Việt
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Câu chuyện của chúng tôi</h2>
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  <strong className="text-green-700">{companyInfo.name}</strong> được thành lập với
                  tâm huyết mang đến những sản phẩm nội thất gỗ tự nhiên, chất lượng cao cho mọi gia
                  đình Việt Nam.
                </p>
                <p className="leading-relaxed">
                  Với hơn 15 năm kinh nghiệm trong lĩnh vực chế tác và kinh doanh đồ gỗ, chúng tôi
                  tự hào là đơn vị cung cấp những sản phẩm nội thất đẹp mắt, bền vững và thân thiện
                  với môi trường.
                </p>
                <p className="leading-relaxed">
                  Mỗi sản phẩm của chúng tôi đều được làm thủ công tỉ mỉ bởi đội ngũ thợ mộc lành
                  nghề, kết hợp giữa kỹ thuật truyền thống và công nghệ hiện đại, mang đến giá trị
                  bền vững cho không gian sống của bạn.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-green-200 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://res.cloudinary.com/dfizo8h6h/image/upload/v1763116880/HD-wallpaper-living-room-furniture-home-interior_hhul6r.jpg"
                  alt="Xưởng sản xuất"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-green-700 font-bold text-3xl">15+</div>
                <div className="text-gray-600 text-sm">Năm kinh nghiệm</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl font-bold text-green-700 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Giá trị cốt lõi</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-green-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Liên hệ với chúng tôi</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Địa chỉ</h3>
                      <p className="text-green-100">{companyInfo.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Điện thoại</h3>
                      <a
                        href={`tel:${companyInfo.phone}`}
                        className="text-green-100 hover:text-white transition-colors"
                      >
                        {companyInfo.phone}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a
                        href={`mailto:${companyInfo.email}`}
                        className="text-green-100 hover:text-white transition-colors"
                      >
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Giờ làm việc</h3>
                      <p className="text-green-100">{companyInfo.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
