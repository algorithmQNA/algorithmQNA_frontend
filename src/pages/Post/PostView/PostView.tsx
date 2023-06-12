import './style.css';
import PageTitle from '../../../components/PageTitle/PageTitle';
import PostViewDetailBlock from '../../../components/Board/PostView/PostDetail';
import PostViewContent from '../../../components/Board/PostView/PostContent';
import PostViewKeywordBlock from "../../../components/Board/PostView/PostKeyword";
import {useNavigate} from "react-router-dom";
import useGetParams from "../../../hooks/useGetParams";
import {useEffect} from "react";

export default function PostViewPage() {
    const nav = useNavigate();
    const params = useGetParams('pid')
    const query = params ? parseInt(params) : 'a';
    const is = parseInt(query as string);

    useEffect(() => {
        if (isNaN(is)) {
            nav(-1);
        }
    }, []);
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
