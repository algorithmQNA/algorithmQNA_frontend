
import TableRow from "../components/TableRow/TableRow";
import RightIcon from "../components/Icon/Right";
import {Swiper,SwiperSlide} from "swiper/react";
import {Scrollbar} from "swiper";

import "swiper/swiper.css";
import "swiper/css/scrollbar";

export default function DashBoardPage(){
    return(
        <div className={'pb-12'}>
            <div className={'h-[400px]'}>
                <Swiper
                    scrollbar={{
                        hide: true,
                    }}
                    modules={[Scrollbar]}
                    className="mySwiper w-full h-full"
                >
                    <SwiperSlide className={'w-full h-full bg-blue-300'}>
                    </SwiperSlide>
                    <SwiperSlide className={'w-full h-full bg-blue-400'}>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className={'container m-auto grid grid-cols-1 xl:grid-cols-3 h-full p-3 sm:p-0 gap-3 md:gap-5 mt-6'}>
                <section className={'col-span-1 md:mt-4 bg-white rounded-xl'}>
                    <div className={'flex items-center justify-between py-4 px-6 dashboard-title rounded-t-xl hover:bg-gray-100 hover:cursor-pointer'}>
                        <h2 className={'font-bold text-xl'}>Q&N 게시판</h2>
                        <RightIcon/>
                    </div>
                    <div className={'flex flex-col border-t border-t-basic px-4 mb-4'}>
                        <div className={'border-b border-b-basic py-1'}>
                            <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        </div>
                        <div className={'border-b border-b-basic py-1'}>
                            <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        </div>
                        <div className={'border-b border-b-basic py-1'}>
                            <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        </div>
                        <div className={'border-b border-b-basic py-1'}>
                            <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        </div>
                        <div className={'border-b border-b-basic py-1'}>
                            <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        </div>
                    </div>
                </section>
                <section className={'col-span-1 md:mt-4 bg-white rounded-xl'}>
                    <div className={'flex items-center justify-between py-4 px-6 dashboard-title rounded-t-xl hover:bg-gray-100 hover:cursor-pointer'}>
                        <h2 className={'font-bold text-xl'}>꿀팁 게시판</h2>
                        <RightIcon/>
                    </div>
                    <div className={'flex flex-col border-t border-t-basic px-4 mb-4'}>
                        <div className={'border-b border-b-basic py-1'}>
                            <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        </div>
                        <div className={'border-b border-b-basic py-1'}>
                            <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        </div>
                        <div className={'border-b border-b-basic py-1'}>
                            <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        </div>
                        <div className={'border-b border-b-basic py-1'}>
                            <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        </div>
                        <div className={'border-b border-b-basic py-1'}>
                            <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        </div>
                    </div>
                </section>
                <section className={'col-span-1 md:mt-4 bg-white rounded-xl'}>
                    <div className={'flex items-center justify-between py-4 px-6 dashboard-title rounded-t-xl hover:bg-gray-100 hover:cursor-pointer'}>
                        <h2 className={'font-bold text-xl'}>미채택 글</h2>
                        <RightIcon/>
                    </div>
                    <div className={'flex flex-col border-t border-t-basic px-4 mb-4'}>
                        <div className={'border-b border-b-basic py-1'}>
                            <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        </div>
                        <div className={'border-b border-b-basic py-1'}>
                            <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        </div>
                        <div className={'border-b border-b-basic py-1'}>
                            <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        </div>
                        <div className={'border-b border-b-basic py-1'}>
                            <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        </div>
                        <div className={'border-b border-b-basic py-1'}>
                            <TableRow img={'/logo512.png'} title={'포스트 제목'} writer={'작성자'} date={'2020-10-20 11:12:31'} view={1000} comment={1000}/>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}