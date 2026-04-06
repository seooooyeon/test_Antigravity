import { LogIn, GraduationCap, Home } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans" data-theme="corporate">
      {/* Navigation Bar */}
      <nav className="navbar bg-base-100 shadow-sm px-4 md:px-8">
        <div className="flex-1">
          <a className="flex items-center gap-2 cursor-pointer">
            <img src="/logo.png" alt="로고" className="h-10 w-auto" />
          </a>
        </div>
        <div className="flex-none">
          <button className="btn btn-ghost btn-sm gap-2 text-slate-600">
            <Home className="w-4 h-4" />
            메인페이지
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-12 tracking-tight">
            국가기초학력지원포털
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 justify-center items-stretch mt-12 min-h-[50vh]">
            {/* Student Exam Button */}
            <button className="btn btn-primary h-full min-h-[400px] flex-col gap-6 text-5xl shadow-2xl shadow-blue-400/30 transition-all hover:scale-[1.02] active:scale-95 group font-black rounded-3xl border-none">
              <GraduationCap className="w-24 h-24 group-hover:animate-bounce" />
              <span>학생 응시하기</span>
            </button>

            {/* Teacher Login Button */}
            <button className="btn btn-outline btn-secondary h-full min-h-[400px] flex-col gap-6 text-5xl shadow-2xl transition-all hover:scale-[1.02] active:scale-95 group font-black rounded-3xl">
              <LogIn className="w-24 h-24 group-hover:translate-x-4 transition-transform" />
              <span>교사 로그인</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer footer-center p-12 bg-slate-50 text-slate-400 mt-auto border-t border-slate-100">
        <aside>
          <p className="font-bold">
            국가기초학력지원포털<br />교육의 미래를 연결하는 파우스너
          </p>
          <p>Copyright © 2026 - All right reserved</p>
        </aside>
      </footer>
    </div>
  );
};

export default App;
