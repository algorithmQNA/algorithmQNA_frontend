interface Props {
  size: number
  totalPage: number
}
export default function RowListTo({ size, totalPage }: Props) {
    const list = 20;
    const start = () =>{
        const value = totalPage-1;
        return totalPage === 0 ? 0 : (list * value) + 1
    }
  return (
    <div className={'whitespace-nowrap'}>
      <p
        className={
          'font-semibold text-[#3c4f74] text-sm flex items-center gap-2'
        }
      >
        <span>현재 목록</span>
        <span className={'text-primary'}>
          {start()} to {size}
        </span>
      </p>
    </div>
  );
}
