import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";
import Input from "../components/input";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img
        src={assets.login_bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />
      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            계정 만들기
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            저희와 함께 지출 내역을 추적해 보세요.
          </p>
          <form className="space-y-4">
            <div className="flex justify-center mb-6"></div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                label="이름"
                placeholder="이름 입력"
                type="text"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="이메일 주소"
                placeholder="email@example.com"
                type="text"
              />

              <div className="col-span-2">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="비밀번호"
                  placeholder="비밀번호 입력"
                  type="password"
                />
              </div>
            </div>
            {error && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <button
              className="btn-primary w-full py-3 text-lg font-medium"
              type="submit"
            >
              회원 가입
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              이미 계정이 있으신가요?{" "}
              <Link
                to="/login"
                className="font-medium text-primary underline hover:text-primary-dark transition-colors"
              >
                로그인
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
