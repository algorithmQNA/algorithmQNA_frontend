export default function PostViewPage(){
    return(
        <div className={'container m-auto bg-white p-4 flex flex-col gap-4'}>
            <div className={'flex justify-between items-center py-4'}>
                <div className={'flex items-center gap-4'}>
                    <p className={'w-[75px] h-[75px] rounded-full border border-basic'}>
                    </p>
                    <div>
                        <p className={'font-bold'}>닉네임</p>
                        <p className={'text-sm'}>추가 정보</p>
                    </div>
                </div>
                <div className={'w-fit text-right text-sm'}>
                    <p>2023-04-16</p>
                    <p>조회수</p>
                </div>
            </div>
            <div className={'flex flex-col gap-4 border-basic'}>
                <div className={'flex flex-col gap-1 text-sm border-basic border rounded-lg p-4 bg-white'}>
                    <p className={'text-basic'}>게시판 명</p>
                    <p className={'text-xl font-bold'}>제목</p>
                    <p className={'text-basic'}>분류</p>
                </div>
                <div className={'border-basic border bg-white rounded-lg'}>
                    <div className={'min-h-[500px] p-4'}>
                        내용
                    </div>
                    <p className={'flex justify-end p-6'}>
                        <button className={'text-red-500'}>신고</button>
                    </p>
                </div>
            </div>
            <p className={'flex gap-4'}>
                <button className={'w-full p-2 bg-blue-500 text-white flex justify-center rounded-lg'}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.3678 22.4712H2.71079C2.31823 22.4712 2 22.153 2 21.7604V10.1509C2 9.7583 2.31823 9.44006 2.71079 9.44006H5.98945C6.82171 9.44006 7.59293 9.0034 8.02111 8.28976L11.232 2.93824C11.9249 1.78352 13.5567 1.67375 14.398 2.7253C14.7945 3.22094 14.9223 3.87973 14.7399 4.4877L13.5287 8.52503C13.3918 8.98108 13.7334 9.44006 14.2095 9.44006H19.6294C21.1916 9.44006 22.3262 10.9256 21.9152 12.4327L19.6536 20.7253C19.3724 21.7562 18.4362 22.4712 17.3678 22.4712Z" stroke="white" stroke-width="3" stroke-linecap="round"/>
                        <path d="M6.14629 22.4712V9.44006" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button className={'w-full p-2 bg-red-500 text-white flex justify-center rounded-lg'}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.3678 2H2.71079C2.31823 2 2 2.31823 2 2.71079V14.3204C2 14.713 2.31823 15.0312 2.71079 15.0312H5.98945C6.82171 15.0312 7.59293 15.4678 8.02111 16.1815L11.232 21.533C11.9249 22.6877 13.5567 22.7975 14.398 21.7459C14.7945 21.2502 14.9223 20.5916 14.7399 19.9835L13.5287 15.9462C13.3918 15.4901 13.7334 15.0312 14.2095 15.0312H19.6294C21.1916 15.0312 22.3262 13.5456 21.9152 12.0385L19.6536 3.74589C19.3724 2.7151 18.4362 2 17.3678 2Z" stroke="white" stroke-width="3" stroke-linecap="round"/>
                        <path d="M6.14628 15.0312V2" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </p>
        </div>
    )
}