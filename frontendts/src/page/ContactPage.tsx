import Button from '@/components/ui/custome/Button';
import Input from '@/components/ui/custome/Input';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const companyInfo = {
    name: import.meta.env.VITE_COMPANY_NAME || 'Cửa hàng gỗ Dương Dũng - DDStore',
    email: import.meta.env.VITE_COMPANY_EMAIL || 'vtd262002@gmail.com',
    phone: import.meta.env.VITE_COMPANY_PHONE || '0328715219',
    address: import.meta.env.VITE_COMPANY_ADDRESS || 'Đông Lâm, Tiền Hải, Thái Bình, Việt Nam',
    hours: import.meta.env.VITE_COMPANY_HOURS || '8:00 - 17:00, Thứ 2 - Chủ Nhật',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Xử lý gửi form
    console.log('Form data:', formData);
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200"
            alt="Liên hệ với chúng tôi"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-xl md:text-2xl text-green-100 drop-shadow-md">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
            </p>
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info - Left Side */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  Thông tin liên hệ
                </h2>

                <div className="space-y-5">
                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-green-100 p-3 rounded-lg shrink-0">
                      <MapPin className="w-5 h-5 text-green-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Địa chỉ</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{companyInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-green-100 p-3 rounded-lg shrink-0">
                      <Phone className="w-5 h-5 text-green-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Điện thoại</h3>
                      <a
                        href={`tel:${companyInfo.phone}`}
                        className="text-green-700 hover:text-green-800 text-sm font-medium transition-colors"
                      >
                        {companyInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-green-100 p-3 rounded-lg shrink-0">
                      <Mail className="w-5 h-5 text-green-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a
                        href={`mailto:${companyInfo.email}`}
                        className="text-green-700 hover:text-green-800 text-sm font-medium transition-colors break-all"
                      >
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-green-100 p-3 rounded-lg shrink-0">
                      <Clock className="w-5 h-5 text-green-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">Giờ làm việc</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{companyInfo.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Contact Form - Right Side */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  Gửi thông tin
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Họ và tên"
                      type="text"
                      name="name"
                      placeholder="Nhập họ và tên"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />

                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      placeholder="example@email..."
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Input
                    label="Số điện thoại"
                    type="tel"
                    name="phone"
                    placeholder="0123456789"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />

                  <Input
                    label="Tiêu đề"
                    type="text"
                    name="subject"
                    placeholder="Nhập tiêu đề"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nội dung
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Nhập nội dung tin nhắn..."
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="large"
                      className="w-full flex items-center justify-center gap-2 whitespace-nowrap"
                      icon={Send}
                    >
                      Gửi thông tin
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
