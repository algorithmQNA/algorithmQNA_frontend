import AnnouncementTableRow from '../TableRow/Announcement';
import {PostFilter} from "../../types/Post/Post";
import {useRecoilValue} from "recoil";
import {PostFilterState} from "../../storage/Post/Post";
import {useQuery} from "react-query";
import {getCategoryPostsRequest} from "../../apis/postApi";

export default function NoticeBlock() {
    const {postCategory}:PostFilter = useRecoilValue(PostFilterState)
    const {data,isLoading} = useQuery<any>(
        ['notice-list',postCategory],
        ()=>{
            return getCategoryPostsRequest(
                postCategory as any,
                "LATESTASC",
                0,
                'NOTICE'
            )
        })
  return (
    <div className={''}>
        {
            !isLoading && data &&
            <div className={'flex flex-col gap-2'}>
                {
                    data.data.data.posts.length !== 0
                        ?
                        data.data.data.posts.map((li:any)=>(
                            <AnnouncementTableRow key={li.postId} title={li.title} date={li.createdAt} pid={li.postId}/>
                        ))
                        :
                        <div className={'w-full h-[100px] flex justify-center items-center text-content border border-content rounded'}>
                            공지사항이 없습니다.
                        </div>
                }
            </div>
        }
    </div>
  );
}
