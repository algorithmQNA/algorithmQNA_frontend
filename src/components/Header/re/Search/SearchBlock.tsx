import {FiSearch} from "react-icons/fi";

export default function HeaderSearchBlock(){
    return(
        <div
            className={
                'justify-between items-center border border-white p-2 gap-2 w-full max-w-[300px] col-span-2 m-auto hidden md:flex'
            }
        >
            <input type={'text'} className={'bg-transparent w-full h-full text-sm'} />
            <span>
        <FiSearch />
      </span>
        </div>
    )
}