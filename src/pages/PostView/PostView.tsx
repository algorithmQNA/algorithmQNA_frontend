import {RecommendBtn, UnRecommendBtn} from "../../components/Recommend/RecoomendButton";
import './style.css'
import PageTitle from "../../components/PageTitle/PageTitle";

export default function PostViewPage(){
    return(
        <div>
            <PageTitle>{''}</PageTitle>
            <div className={'main-content post-view-page'}>
                <div className={'content-set'}>
                    <section className={'page-section'}>
                        <h1 className={'post-title'}>제목</h1>
                        <div className={'post-info-block'}>
                            <p>게시판 / 카테고리</p>
                            <p>2023년 5월 2일 작성</p>
                        </div>
                        <div className={'writer-block'}>
                            <div className={'writer-profile-img'}></div>
                            <div className={'writer-info-block'}>
                                <p>사용자 명</p>
                                <p className={'writer-badge-block'}>
                                    <span className={'writer-badge'}></span>
                                    <span className={'writer-badge'}></span>
                                    <span className={'writer-badge'}></span>
                                </p>
                            </div>
                        </div>
                        <div className={'post-info'}>
                            <div className={'view-comment'}>
                                <p>조회수 12</p>
                                <p>댓글 12</p>
                            </div>
                            <div className={'recommend-block'}>
                                <p className={'text-blue-500'}>
                                    추천 12
                                </p>
                                <p className={'text-red-500'}>
                                    비추천 12
                                </p>
                            </div>
                        </div>
                    </section>
                    <div className={'post-content'}>
                        <div className={'min-h-[350px]'}>
                            가나다
                        </div>
                        <div className={'recommend-btn-block'}>
                            <RecommendBtn/>
                            <UnRecommendBtn/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}