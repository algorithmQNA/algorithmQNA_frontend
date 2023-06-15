import './style.css';
import PageTitle from '../../../components/PageTitle/PageTitle';
import PostViewDetailBlock from '../../../components/Board/PostView/PostDetail';
import PostViewContent from '../../../components/Board/PostView/PostContent';
import PostViewKeywordBlock from "../../../components/Board/PostView/PostKeyword";
import {useNavigate} from "react-router-dom";
import useGetParams from "../../../hooks/useGetParams";
import {useEffect} from "react";
import {useQuery, useQueryClient} from "react-query";
import {getPostRequest} from "../../../apis/postApi";

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

    const {data,isLoading} = useQuery('post-view', () => getPostRequest(is), {
        onError: (err: any) => {
            const { status } = err.response.data;
            alert(status.message);
            if (status.code === 403) {
                nav('/access');
            } else {
                nav(-1);
            }
        },
    });

  return (
    <div>
      <PageTitle>{''}</PageTitle>
      <div className={'main-content post-view-page p-4'}>
          {
              data && !isLoading &&
              <div className={'content-set'}>
                  <PostViewDetailBlock data={data.data}/>
                  <PostViewContent data={data.data}/>
                  <PostViewKeywordBlock data={data.data}/>
              </div>
          }
      </div>
    </div>
  );
}
