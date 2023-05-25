import '../style.css';
import HeaderLeft from './Left';
import HeaderCenter from './Center';
import HeaderRight from './Right';

export default function HeaderTest() {
  return (
    <header className={'w-full absolute top-[30px]'}>
      <div
        className={
          'grid grid-cols-2 md:grid-cols-4 max-w-[1024px] w-full m-auto text-white gap-4 items-center'
        }
      >
        <HeaderLeft />
        <HeaderCenter />
        <HeaderRight />
      </div>
    </header>
  );
}
