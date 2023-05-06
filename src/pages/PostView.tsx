import {RecommendBtn, UnRecommendBtn} from "../components/Recommend/RecoomendButton";

export default function PostViewPage(){
    return(
        <div>
            <div>

            </div>
            <div className={'container m-auto bg-white p-4 flex flex-col gap-4'}>
                <div className={'flex flex-col gap-6'}>
                    <section className={'border border-basic p-4 xl:px-8 xl:py-6 flex flex-col gap-3'}>
                        <h1 className={'text-3xl text-title font-bold'}>제목</h1>
                        <div className={'w-fit items-center flex gap-6 justify-between text-content text-sm'}>
                            <p>게시판 / 카테고리</p>
                            <p>2023년 5월 2일 작성</p>
                        </div>
                        <div className={'w-fit items-center flex gap-3'}>
                            <div className={'w-[50px] h-[50px] bg-primary rounded-full'}></div>
                            <div className={'flex flex-col gap-1 text-title text-sm font-medium'}>
                                <p>사용자 명</p>
                                <p className={'flex gap-1'}>
                                    <span className={'w-[20px] h-[20px] bg-primary rounded-full'}></span>
                                    <span className={'w-[20px] h-[20px] bg-primary rounded-full'}></span>
                                    <span className={'w-[20px] h-[20px] bg-primary rounded-full'}></span>
                                </p>
                            </div>
                        </div>
                        <div className={'flex items-center justify-between font-medium'}>
                            <div className={'flex gap-3 text-content text-sm'}>
                                <p>
                                    조회수 12
                                </p>
                                <p>
                                    댓글 12
                                </p>
                            </div>
                            <div className={'flex gap-3 text-sm'}>
                                <p className={'text-blue-500'}>
                                    추천 12
                                </p>
                                <p className={'text-red-500'}>
                                    비추천 12
                                </p>
                            </div>
                        </div>
                    </section>
                    <div className={'border border-basic p-4 xl:px-8 xl:py-6 text-content flex flex-col gap-4'}>
                        <div className={'min-h-[350px]'}>
                            가나다
                        </div>
                        <div className={'flex justify-center gap-4'}>
                            <RecommendBtn/>
                            <UnRecommendBtn/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}