export default function Footer() {
  return (
    <div
      className={
        'w-full flex justify-between items-center p-2 container m-auto'
      }
    >
      <div>
        <p className={'text-[#77A4E8] font-bold'}>팀 프로젝트</p>
        <p className={'text-[#666666] text-sm'}>
          <span className={'font-bold'}>프론트엔드</span> - 전오승 · 이진희
        </p>
        <p className={'text-[#666666] text-sm'}>
          <span className={'font-bold'}>백엔드</span> - 장윤희 · 김솔민
        </p>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
