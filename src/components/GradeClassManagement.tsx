import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2,
  Calendar,
  Search,
  PlusCircle,
  AlertCircle,
  Settings,
  Trash2,
  ChevronDown,
  Info,
  UserCheck
} from 'lucide-react';

type Role = 'ADMIN' | 'HOMEROOM' | 'GENERAL';

type ClassData = {
  id: number;
  grade: string;
  classNum: string;
  neisClass: string | null;
  linkedDate: string | null;
  linkType: 'AUTO' | 'MANUAL' | null;
  linkerName: string | null;
};

const MOCK_DATA: ClassData[] = [
  { id: 1, grade: '1학년', classNum: '1반', neisClass: '1반', linkedDate: '2026-03-02', linkType: 'AUTO', linkerName: '김담임(담임)' },
  { id: 2, grade: '1학년', classNum: '2반', neisClass: '2반', linkedDate: '2026-03-02', linkType: 'AUTO', linkerName: '박담임(담임)' },
  { id: 3, grade: '1학년', classNum: '3반', neisClass: null, linkedDate: null, linkType: null, linkerName: null },
  { id: 4, grade: '2학년', classNum: '1반', neisClass: '2-1반(특수)', linkedDate: '2026-03-04', linkType: 'MANUAL', linkerName: '국기초(담당자)' },
  { id: 5, grade: '3학년', classNum: '1반', neisClass: '1반', linkedDate: '2026-03-03', linkType: 'AUTO', linkerName: '최담임(담임)' },
];

const GRADES = ['1학년', '2학년', '3학년', '4학년', '5학년', '6학년'];

const GradeClassManagement: React.FC = () => {
  // 상태 관리
  const [role, setRole] = useState<Role>('ADMIN');
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState<ClassData[]>(MOCK_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleGradeSelection = (grade: string) => {
    setSelectedGrades(prev => 
      prev.includes(grade) ? prev.filter(g => g !== grade) : [...prev, grade]
    );
  };

  const handleManualLink = (id: number, neisClass: string) => {
    setData(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          neisClass,
          linkedDate: new Date().toISOString().split('T')[0],
          linkType: 'MANUAL',
          linkerName: '국기초(담당자)'
        };
      }
      return item;
    }));
  };

  const handleDelete = (id: number) => {
    if (confirm('해당 학년반을 삭제하시겠습니까?')) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  // 필터링 적용
  const filteredData = data.filter(item => {
    if (selectedGrades.length === 0) return true;
    return selectedGrades.includes(item.grade);
  });

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* 권한 토글 헤더 (테스트용) */}
      <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary"></div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-primary">
            <Settings size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">테스트용 권한 변경</h2>
            <p className="text-sm text-slate-500 mt-1">실제로는 로그인한 계정의 권한을 따릅니다.</p>
          </div>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${role === 'ADMIN' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setRole('ADMIN')}
          >
            국기초 담당자
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${role === 'HOMEROOM' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setRole('HOMEROOM')}
          >
            담임교사
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${role === 'GENERAL' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
            onClick={() => setRole('GENERAL')}
          >
            일반교사
          </button>
        </div>
      </div>

      {/* 권한별 알림 배너 */}
      {role === 'ADMIN' && (
        <div className="alert bg-blue-50/50 border border-blue-100 text-blue-800 rounded-2xl">
          <Info size={20} className="text-blue-500" />
          <span>현재 관리자 모드입니다. 미연결 반에 대한 <strong>수동 연결</strong> 밎 <strong>전체 목록 관리</strong>가 가능합니다. 특수학교의 경우 학과별 반이 중복될 수 있으니 유의해주세요.</span>
        </div>
      )}
      {role === 'HOMEROOM' && (
        <div className="alert bg-green-50/50 border border-green-100 text-green-800 rounded-2xl">
          <UserCheck size={20} className="text-green-500" />
          <span>선생님의 담당 학급은 <strong>교육디지털원패스</strong>를 통해 나이스평가시스템과 <strong>자동 연동</strong>됩니다.</span>
        </div>
      )}
      {role === 'GENERAL' && (
        <div className="alert bg-slate-50/50 border border-slate-200 text-slate-700 rounded-2xl">
          <AlertCircle size={20} className="text-slate-500" />
          <span>일반 교사 권한입니다. 현재 페이지는 <strong>조회 전용</strong>으로 제공되며 수정/연결 권한이 없습니다.</span>
        </div>
      )}

      {/* 상단 검색 필터 영역 */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center gap-2 text-primary font-black text-lg bg-blue-50/50 inline-flex px-4 py-1.5 rounded-full border border-blue-100">
            <Building2 size={20} />
            <span>602초등학교</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* 학년도 묶음 */}
            <div className="space-y-1.5 w-full md:w-36">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                <Calendar size={14} className="text-slate-400" /> 학년도
              </label>
              <select className="select select-bordered w-full bg-slate-50 border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary h-11 text-slate-700 font-medium font-sans">
                <option value="2026">2026</option>
                <option value="2025">2025</option>
              </select>
            </div>

            {/* 학년 (다중선택 커스텀 드롭다운) */}
            <div className="space-y-1.5 w-full md:w-64" ref={dropdownRef}>
              <label className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                학년 선택 (다중)
              </label>
              <div className="relative">
                <div 
                  className="flex items-center justify-between w-full h-11 px-4 border border-slate-300 rounded-lg bg-slate-50 cursor-pointer hover:border-slate-400 transition-colors"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="text-sm text-slate-700 font-medium truncate">
                    {selectedGrades.length === 0 
                      ? '전체 학년 검색' 
                      : `${selectedGrades.length}개 학년 선택됨`}
                  </span>
                  <ChevronDown size={16} className={`text-slate-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {/* 다중 체크박스 드롭다운 내용 */}
                {dropdownOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl py-2 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                    {GRADES.map(grade => (
                      <label 
                        key={grade} 
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 cursor-pointer transition-colors"
                        onClick={(e) => e.stopPropagation()} // 클릭 시 닫히지 않게
                      >
                        <input 
                          type="checkbox" 
                          className="checkbox checkbox-sm checkbox-primary rounded"
                          checked={selectedGrades.includes(grade)}
                          onChange={() => toggleGradeSelection(grade)}
                        />
                        <span className="text-sm font-medium text-slate-700">{grade}</span>
                      </label>
                    ))}
                    {selectedGrades.length > 0 && (
                      <div className="px-4 pt-3 pb-1 mt-1 border-t border-slate-100">
                        <button 
                          className="text-xs text-slate-500 hover:text-slate-800 font-bold underline"
                          onClick={() => setSelectedGrades([])}
                        >
                          선택 초기화
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <button className="btn btn-primary h-11 mt-auto px-8 gap-2 shadow-md">
              <Search size={18} /> 조회
            </button>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="w-full md:w-auto">
          <button 
            className="btn btn-neutral w-full md:w-auto h-11 shadow-md gap-2"
            onClick={() => {
              if(role !== 'ADMIN') {
                alert('학년반 생성은 국기초 담당자(ADMIN) 권한이 필요합니다.');
                return;
              }
              setIsModalOpen(true);
            }}
          >
            <PlusCircle size={18} />
            학년반 생성
          </button>
        </div>
      </div>

      {/* 데이터 테이블 */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-visible shadow-sm">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-[13px]">
              <tr>
                <th className="py-4 pl-6 w-16 text-center">No.</th>
                <th>학년</th>
                <th>시스템 반</th>
                <th>나이스(NEIS) 연동 매칭</th>
                <th>적용(연결)일자</th>
                <th>연결 상태 / 관리자</th>
                <th className="text-center w-24 pr-6">관리</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-500 bg-slate-50/50">
                    조회된 학년/반 데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors border-b border-slate-100">
                    <td className="font-semibold text-slate-400 text-center pl-6">{index + 1}</td>
                    <td className="font-bold text-slate-700">{item.grade}</td>
                    <td className="font-bold text-slate-800">{item.classNum}</td>
                    
                    {/* 나이스반 표시/연결 로직 */}
                    <td>
                      {item.neisClass ? (
                         <div className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                            <span className="font-bold text-slate-700">{item.neisClass}</span>
                         </div>
                      ) : (
                        role === 'ADMIN' ? (
                          <div className="flex items-center gap-2">
                            <select 
                              className="select select-sm select-bordered bg-white"
                              onChange={(e) => handleManualLink(item.id, e.target.value)}
                              defaultValue=""
                            >
                              <option value="" disabled>수동 연결 대상 선택</option>
                              <option value="1반">1반</option>
                              <option value="2반">2반</option>
                              <option value="3반">3반</option>
                              <option value="특수학급1">특수학급1</option>
                            </select>
                            <span className="badge badge-error badge-sm text-[10px] font-bold p-2 text-white">미연결</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 font-medium">연동 대기중</span>
                        )
                      )}
                    </td>

                    <td className="text-slate-500 font-mono">
                      {item.linkedDate || '-'}
                    </td>

                    <td>
                      {item.linkType ? (
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            {item.linkType === 'AUTO' ? (
                               <span className="badge badge-success badge-sm border-0 bg-green-100 text-green-700 font-bold px-2 py-2">자동연결</span>
                            ) : (
                               <span className="badge badge-warning badge-sm border-0 bg-orange-100 text-orange-700 font-bold px-2 py-2">수동연결</span>
                            )}
                          </div>
                          <span className="text-xs text-slate-500 font-medium truncate w-32" title={item.linkerName || ''}>
                            {item.linkerName}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    
                    <td className="text-center pr-6">
                      <button 
                        className={`btn btn-square btn-sm btn-ghost hover:bg-red-50 hover:text-red-600 ${role !== 'ADMIN' ? 'opacity-30 cursor-not-allowed' : 'text-slate-400'}`}
                        disabled={role !== 'ADMIN'}
                        onClick={() => handleDelete(item.id)}
                        title={role !== 'ADMIN' ? '관리자 권한이 필요합니다' : '삭제'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 학년반 자동 생성 모달 */}
      <dialog className={`modal ${isModalOpen ? 'modal-open' : ''} bg-slate-900/40 backdrop-blur-sm`}>
        <div className="modal-box bg-white max-w-lg rounded-3xl p-8 border border-slate-100 shadow-2xl">
          <form method="dialog">
            <button 
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-slate-400"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
          </form>
          <h3 className="font-black text-2xl text-slate-800 mb-6 flex items-center gap-2">
            <PlusCircle className="text-primary" size={24} /> 학년반 생성
          </h3>
          
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-6 flex gap-3 text-sm text-slate-600">
            <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
            <ul className="space-y-1 font-medium list-disc ml-2">
              <li>시작반만 선택하여 저장할 경우 단일 반만 생성됩니다.</li>
              <li>시작반, 종료반 모두 선택 시 해당 범위의 반이 자동 생성됩니다.</li>
              <li>특수학교(학급)는 구조가 특수하므로 수동 연결을 권장합니다.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="form-control">
              <label className="label font-bold text-slate-700"><span className="label-text text-red-500 mr-1">*</span>학년도</label>
              <select className="select select-bordered bg-slate-50 w-full font-medium" defaultValue="2026">
                <option value="2026">2026</option>
              </select>
            </div>
            
            <div className="form-control">
              <label className="label font-bold text-slate-700"><span className="label-text text-red-500 mr-1">*</span>학년</label>
              <select className="select select-bordered bg-white w-full" defaultValue="">
                <option value="" disabled>선택</option>
                {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label font-bold text-slate-700"><span className="label-text text-red-500 mr-1">*</span>시작반</label>
                <select className="select select-bordered bg-white w-full" defaultValue="">
                  <option value="" disabled>선택</option>
                  <option value="1">1반</option>
                  <option value="2">2반</option>
                  <option value="3">3반</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label font-bold text-slate-700">종료반 (다중생성시)</label>
                <select className="select select-bordered bg-white w-full" defaultValue="">
                  <option value="" disabled>선택</option>
                  <option value="1">1반</option>
                  <option value="2">2반</option>
                  <option value="3">3반</option>
                  <option value="4">4반</option>
                  <option value="5">5반</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-action mt-8 flex justify-between">
            <button 
              className="btn btn-outline text-slate-500 hover:bg-slate-50 font-bold"
              onClick={() => {
                alert("특수학교/특수학급의 경우 별도 구조로 인해 설정 화면에서 수동 매칭이 필요합니다.");
              }}
            >
              특수학교(학급) 안내
            </button>
            <div className="flex gap-2">
              <button className="btn btn-neutral px-8 text-white rounded-xl" onClick={() => setIsModalOpen(false)}>저장</button>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <button>닫기</button>
        </form>
      </dialog>
    </div>
  );
};

export default GradeClassManagement;
