import {FiBell} from "react-icons/fi";
import {setDateWritten} from "../../utils/TextProcessing";
import './style.css'

interface Props{
    title?:string
    date?:string
}
export default function AnnouncementTableRow({title='공지사항',date='1900-01-01'}:Props){
    return(
        <div className={'anno-post-row'}>
            <p className={'anno-icon'}>
                <FiBell size={20}/>
            </p>
            <p className={'anno-title'}>
                {title}
            </p>
            <p className={'anno-date'}>
                {setDateWritten(date)}
            </p>
        </div>
    )
}