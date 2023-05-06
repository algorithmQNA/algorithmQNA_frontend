interface Props{
    title:string
}
export default function MainPageMove({title}:Props){
    return(
        <div className={'gap-6 text-center'}>
            <div className={'flex justify-center'}>
                <div className={'border-dashed border-2 border-[#34A853] rounded-full w-[100px] h-[100px] mb-6'}>

                </div>
            </div>
            <div className={'text-title text-2xl font-medium text-center'}>
                {title}
            </div>
        </div>
    )
}