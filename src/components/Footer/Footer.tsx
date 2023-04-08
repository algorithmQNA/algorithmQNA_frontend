export default function Footer(){
    return(
        <footer className={'flex justify-between items-center p-2 w-full border-t border-t-[#D9D9D9]'}>
            <div className={'w-full flex justify-between items-center p-2 max-w-[1280px] m-auto'}>
                <div>
                    <p className={'text-[#77A4E8] font-bold'}>팀 프로젝트</p>
                    <p className={'text-[#666666] text-sm'}><span className={'font-bold'}>프론트엔드</span> - 전오승 · 이진희</p>
                    <p className={'text-[#666666] text-sm'}><span className={'font-bold'}>백엔드</span> - 장윤희 · 박재민</p>
                </div>
                <div></div>
                <div></div>
            </div>
        </footer>
    )
}