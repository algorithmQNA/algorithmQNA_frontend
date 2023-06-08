import './style.css';
import PageTitle from '../../../components/PageTitle/PageTitle';
import PostViewDetailBlock from '../../../components/Board/PostView/PostDetail';
import PostViewContent from '../../../components/Board/PostView/PostContent';
import PostViewKeywordBlock from "../../../components/Board/PostView/PostKeyword";

export default function PostViewPage() {
  return (
    <div>
      <PageTitle>{''}</PageTitle>
      <div className={'main-content post-view-page p-4'}>
        <div className={'content-set'}>
          <PostViewDetailBlock />
          <PostViewContent />
          <PostViewKeywordBlock/>
        </div>
      </div>
    </div>
  );
}
