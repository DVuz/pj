// ...existing code...
import { Link } from '@tanstack/react-router';
import { Lock, LogIn, Mail } from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/logo.png';
import Button from '../../components/ui/custome/Button';
import Input from '../../components/ui/custome/Input';
import { useLoginMutation } from '../../services/api/authApi';

const Login = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      console.log('Login successful:', response);
      //TODO: execute further actions after successful login
    } catch (error) {
      console.error('Login failed:', error);
      //TODO: handle login error, e.g., show error message
    }
    console.log('Login data:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Content chính chiếm hết chiều cao còn lại và căn giữa hoàn toàn */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-lg m-auto px-5">
          <div className="rounded-xl shadow-lg border border-gray-200 bg-white">
            {/* Header */}
            <div className="p-8 pb-0">
              <div className="mb-6 flex gap-3 items-center pb-6 border-b border-gray-200">
                <img src={logo} alt="DDStore Logo" className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">DDStore</h1>
                  <p className="text-gray-500 text-sm">Đăng nhập vào tài khoản của bạn</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="px-8 pb-8" onSubmit={handleSubmit}>
              {error && (
                <div className="text-red-500 text-sm mb-4">
                  {(() => {
                    if (typeof error === 'object' && error !== null && 'data' in error) {
                      const e = error as { data?: { message?: string } };
                      return e.data?.message || 'Đăng nhập thất bại, vui lòng thử lại.';
                    }
                    if (error instanceof Error) {
                      return error.message;
                    }
                    return 'Đăng nhập thất bại, vui lòng thử lại.';
                  })()}
                </div>
              )}

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Nhập địa chỉ email của bạn"
                icon={Mail}
                required
              />

              <Input
                label="Mật khẩu"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Nhập mật khẩu của bạn"
                icon={Lock}
                required
              />

              <div className="text-right mb-6">
                <Link
                  to="/forgot-password"
                  className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="medium"
                fullWidth
                icon={LogIn}
                iconPosition="left"
                className="mb-6"
                disabled={isLoading}
              >
                Đăng nhập
              </Button>

              <div className="text-center text-sm">
                <span className="text-gray-600">Chưa có tài khoản? </span>
                <Link
                  to="/register"
                  className="text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Đăng ký ngay
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
// ...existing code...
