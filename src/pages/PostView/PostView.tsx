import './style.css'
import PageTitle from "../../components/PageTitle/PageTitle";
import PostViewDetailBlock from "../../components/Board/PostView/PostDetail";
import PostViewContent from "../../components/Board/PostView/PostContent";

export default function PostViewPage(){

    return(
        <div>
            <PageTitle>{''}</PageTitle>
            <div className={'main-content post-view-page'}>
                <div className={'content-set'}>
                    <PostViewDetailBlock/>
                    <PostViewContent/>
                </div>
            </div>
        </div>
    )
}