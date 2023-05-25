import AnnouncementTableRow from "../TableRow/Announcement";
interface Props{

}

export default function NoticeBlock(){
    return(
        <div className={'flex flex-col gap-2'}>
            <AnnouncementTableRow/>
            <AnnouncementTableRow/>
            <AnnouncementTableRow/>
        </div>
    )
}