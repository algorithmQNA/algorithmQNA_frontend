import Paper from "../components/Paper/Paper";
import TableRow from "../components/TableRow/TableRow";
import {Link} from "react-router-dom";
import RightIcon from "../components/Icon/Right";
// section className={'col-span-1 py-4 px-2 md:p-4 xl:p-5 bg-primary md:mt-4 md:rounded-lg'}>
//     <div className={'flex items-center justify-between py-3 px-4'}>
//     <h2 className={'font-bold text-2xl text-white'}>Q&N 게시판</h2>
// <span className={'text-white flex gap-2 items-center text-sm'}>
//                             전체 보기
//                             <RightIcon/>
//                         </span>
// </div>
// <div className={'flex flex-col gap-2'}>
//     <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
//     <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
//     <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
//     <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
//     <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
// </div>
// </section>
export default function DashBoardPage(){
    return(
        <div className={'pb-12'}>
            <div className={'min-h-[400px]'}>
                <div className={'flex items-center'}>

                </div>
            </div>
            <div className={'container m-auto grid grid-cols-1 xl:grid-cols-3 h-full md:gap-5'}>
                <section className={'col-span-1 py-4 px-2 md:p-4 xl:p-5 bg-primary md:mt-4 c-shadow'}>
                    <div className={'flex items-center justify-between py-3 px-4'}>
                        <h2 className={'font-bold text-2xl text-white'}>Q&N 게시판</h2>
                        <span className={'text-white flex gap-2 items-center text-sm'}>
                            전체 보기
                            <RightIcon/>
                        </span>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                    </div>
                </section>
                <section className={'col-span-1 py-4 px-2 md:p-4 xl:p-5 bg-primary md:mt-4 c-shadow'}>
                    <div className={'flex items-center justify-between py-3 px-4'}>
                        <h2 className={'font-bold text-2xl text-white'}>꿀팁 게시판</h2>
                        <span className={'text-white flex gap-2 items-center text-sm'}>
                            전체 보기
                            <RightIcon/>
                        </span>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                    </div>
                </section>
                <section className={'col-span-1 py-4 px-2 md:p-4 xl:p-5 bg-primary md:mt-4 c-shadow'}>
                    <div className={'flex items-center justify-between py-3 px-4'}>
                        <h2 className={'font-bold text-2xl text-white'}>미채택 글</h2>
                        <span className={'text-white flex gap-2 items-center text-sm'}>
                            전체 보기
                            <RightIcon/>
                        </span>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                    </div>
                </section>
            </div>
        </div>
    )
}