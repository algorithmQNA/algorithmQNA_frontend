import FilterBar from "./FilterBar";
import CategoryBar from "./CategoryBar";
import BoardSideModal from "./Modal";

export default function BoardModalContent(){
    return(
        <BoardSideModal>
            <div className={'grid gap-3'}>
                <FilterBar/>
                <CategoryBar/>
            </div>
        </BoardSideModal>
    )
}