interface Props{
    page:number
}
export default function RowListTo({page}:Props){
    const start = (page-1) * 10 + 1
    const end = page * 10
    return(
        <div className={'whitespace-nowrap'}>
            <p className={'font-semibold text-[#3c4f74] text-sm flex items-center gap-2'}>
                <span>현재 목록</span>
                <span className={'text-primary'}>
                    {start} to {end}
                </span>
            </p>
        </div>
    )
}