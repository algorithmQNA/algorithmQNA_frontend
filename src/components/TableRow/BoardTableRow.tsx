import TableRow from "./Row";
import {setDateWritten, setOverValue} from "../../utils/TextProcessing";
import {ReactComponent as View} from "../../assets/images/Eye.svg";
import {ReactComponent as BookMark} from "../../assets/images/BookMarks.svg";
import {ReactComponent as Up} from "../../assets/images/HandUpFill.svg";
import {ReactComponent as Down} from "../../assets/images/HandDownFill.svg";
interface Props{
    title:string
}
export default function BoardTableRow(){
    return(
        <TableRow>
            <div className={'border border-black h-[75px]'}></div>
            <div>
                <div className={'flex items-center justify-between'}>
                    <h1 className={'row-post-title'}>Google Inc</h1>
                    <p className={'text-[#739093] text-sm'}>{setDateWritten('2020-12-15 10:12:10')}</p>
                </div>
                <div className={'flex gap-1 items-center text-[#739093] text-xs my-1'}>
                    <div className={'flex gap-1 font-bold text-[#3c4f74]'}>
                        User
                    </div>
                </div>
                <div className={'flex justify-between items-center'}>
                    <div className={'flex gap-1 items-center text-xs text-[#739093]'}>
                        <p className={'flex gap-1 items-center'}>
                            <span><View/></span>
                            <span>{setOverValue(999,99)}</span>
                        </p>
                        <div className={'text-xl pb-0.5 font-normal'}>·</div>
                        <p className={'flex gap-1 items-center'}>
                            <span><BookMark/></span>
                            <span>{setOverValue(999,99)}</span>
                        </p>
                    </div>
                    <div className={'flex gap-1 items-center text-xs text-[#739093]'}>
                        <p className={'flex gap-1 items-center text-blue-500'}>
                            <span className={'text-blue-500'}><Up/></span>
                            <span>{setOverValue(999,99)}</span>
                        </p>
                        <p className={'flex gap-1 items-center text-red-500'}>
                            <span className={'text-red-500'}><Down/></span>
                            <span>{setOverValue(999,99)}</span>
                        </p>
                    </div>
                </div>
            </div>
        </TableRow>
    )
}