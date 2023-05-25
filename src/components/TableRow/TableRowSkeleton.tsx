export default function TableRowS() {
  return (
    <div
      className={`table-row-img border-none items-center p-1.5 gap-1.5 rounded-lg animate-pulse`}
    >
      <div className={'w-[50px] h-[50px] bg-neutral-700 rounded'} />
      <div className={'flex flex-col justify-between h-full w-full gap-1.5'}>
        <p className={'h-full w-1/2 min-w-[200px]  bg-neutral-700 rounded'}></p>
        <p className={'h-full w-1/4 min-w-[100px] bg-neutral-700 rounded'}></p>
      </div>
    </div>
  );
}
