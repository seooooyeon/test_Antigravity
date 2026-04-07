import React from 'react';
import { UserCheck, UserPlus, Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherEntry: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col items-center justify-center p-6" data-theme="corporate">
      {/* Top Banner decoration */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-300 via-indigo-300 to-sky-300"></div>
      
      <main className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
        <header className="text-center mb-12 space-y-3">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
            교사용 포털
          </h1>
          <p className="text-xl text-slate-400 font-bold">원하시는 서비스를 선택해 주세요.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Teacher Login Button */}
          <button className="flex flex-col items-center justify-center gap-6 p-10 bg-blue-100 rounded-3xl shadow-xl shadow-blue-200/50 hover:scale-[1.03] active:scale-95 transition-all group border-none">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:rotate-3 transition-transform">
              <UserCheck size={40} className="text-blue-500" />
            </div>
            <div className="text-center space-y-1">
              <span className="block text-3xl font-black text-slate-700">로그인</span>
              <span className="block text-base text-slate-500 font-medium">기존 계정으로 접속</span>
            </div>
          </button>

          {/* Teacher Sign Up Button */}
          <button className="flex flex-col items-center justify-center gap-6 p-10 bg-sky-100 rounded-3xl shadow-xl shadow-sky-200/50 hover:scale-[1.03] active:scale-95 transition-all group border-none">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:-rotate-3 transition-transform">
              <UserPlus size={40} className="text-sky-500" />
            </div>
            <div className="text-center space-y-1">
              <span className="block text-3xl font-black text-slate-700">회원가입</span>
              <span className="block text-base text-slate-500 font-medium">새로운 계정 만들기</span>
            </div>
          </button>
        </div>

        {/* Home Button */}
        <div className="mt-16 text-center">
          <Link to="/" className="btn btn-ghost gap-3 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-2xl transition-all text-lg font-bold">
            <HomeIcon size={24} />
            메인페이지로 돌아가기
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-8 text-slate-300 text-lg font-bold">
        국가기초학력지원포털 교사 전용 시스템
      </footer>
    </div>
  );
};

export default TeacherEntry;
