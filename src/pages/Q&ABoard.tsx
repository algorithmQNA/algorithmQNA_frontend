import PenIcon from '../components/Icon/pen';
import SortIcon from '../components/Icon/Sort';
import SearchIcon from '../components/Icon/Search';
import CategoryIcon from '../components/Icon/category';
import TableRow from '../components/TableRow/TableRow';
import { DropDown } from '../components/DropDown/DropDown';
import { SelectOption } from '../components/DropDown/SelectBox';

export default function QNABoard() {
  return (
    <div className={'container mx-auto py-6'}>
      <h1 className={'text-3xl text-[#212121] font-bold my-6 text-center p-6'}>
        Q&A 게시판
      </h1>
      <div className={'w-full border-y border-y-[#EAEAEA] bg-white h-fit'}>
        <div
          className={
            'bg-primary px-2 py-2 flex items-center justify-between gap-2'
          }
        >
          <button
            className={
              'flex justify-center items-center bg-primary focus:outline-none px-2 py-1 border-2 border-white rounded-lg w-[50px]'
            }
          >
            <PenIcon />
          </button>
          <div className={'flex justify-end gap-2'}>
            <button
              className={
                'flex justify-center items-center bg-primary focus:outline-none px-2 py-1 border-2 border-white rounded-lg w-[50px]'
              }
            >
              <SearchIcon />
            </button>
            <DropDown
              component={
                <span
                  className={
                    'flex justify-center items-center bg-primary focus:outline-none px-2 py-1 border-2 border-white rounded-lg w-[50px]'
                  }
                >
                  <CategoryIcon />
                </span>
              }
              location={'right'}
            >
              <SelectOption value={'카테고리1'}>adawdawadwadwadw</SelectOption>
              <SelectOption value={'카테고리2'}>a</SelectOption>
              <SelectOption value={'카테고리3'}>a</SelectOption>
            </DropDown>
            <button
              className={
                'flex justify-center items-center bg-primary focus:outline-none px-2 py-1 border-2 border-white rounded-lg w-[50px]'
              }
            >
              <SortIcon />
            </button>
          </div>
        </div>
        <div className={'bg-white min-h-[500px] p-3 flex flex-col gap-3'}>
          {Array(20).fill(
            <TableRow
              img={'/logo512.png'}
              title={'제목'}
              writer={'작성자'}
              date={'2020-12-31'}
              view={2020}
              comment={10}
            />
          )}
        </div>
        <div className={'flex justify-between items-center p-3'}>
          <button
            className={
              'flex justify-center items-center bg-primary focus:outline-none px-2 py-2 border-2 border-white rounded-lg w-[50px]'
            }
          >
            <svg
              width="11"
              height="19"
              viewBox="0 0 11 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.19281 2.25836L1.69281 9.75836L9.19281 17.2584"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            className={
              'flex justify-center items-center bg-primary focus:outline-none px-2 py-2 border-2 border-white rounded-lg w-[50px]'
            }
          >
            <svg
              width="11"
              height="19"
              viewBox="0 0 11 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.69281 2.25836L9.19281 9.75836L1.69281 17.2584"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
