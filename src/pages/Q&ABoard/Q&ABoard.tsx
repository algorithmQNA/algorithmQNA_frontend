import ButtonComponent from "../../components/Button/ButtonComponent";
import PenIcon from "../../components/Icon/pen";
import SortIcon from "../../components/Icon/Sort";
import SearchIcon from "../../components/Icon/Search";
import CategoryIcon from "../../components/Icon/category";
import SelectArea from "../../components/DropDown/SelectArea";
import {useState} from "react";

export default function QNABoard(){
    const [test,setTest] = useState('')
    const testF = (value:string) =>{
        setTest(value)
    }
    return(
        <div className={'container mx-auto py-6'}>
            <h1 className={'text-3xl text-[#212121] font-bold my-6 text-center p-6'}>
                Q&A 게시판
            </h1>
            <div className={'w-full border-y border-y-[#EAEAEA] bg-white'}>
                <div className={'bg-primary px-2 py-2 flex items-center justify-between gap-2'}>
                    <button className={'flex justify-center items-center bg-primary focus:outline-none px-2 py-1 border-2 border-white rounded-lg w-[50px]'}>
                        <PenIcon/>
                    </button>
                    <div className={'flex justify-end gap-2'}>
                        <button className={'flex justify-center items-center bg-primary focus:outline-none px-2 py-1 border-2 border-white rounded-lg w-[50px]'}>
                            <SearchIcon/>
                        </button>
                        <button className={'flex justify-center items-center bg-primary focus:outline-none px-2 py-1 border-2 border-white rounded-lg w-[50px]'}>
                            <CategoryIcon/>
                        </button>
                        <button className={'flex justify-center items-center bg-primary focus:outline-none px-2 py-1 border-2 border-white rounded-lg w-[50px]'}>
                            <SortIcon/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}