import '../style.css';
import HeaderLinkBlock from "./Link/LinkBlock";
import HeaderSearchBlock from "./Search/SearchBlock";
import HeaderUserBlock from "./User/UserBlock";

export default function HeaderTest() {
  return (
    <header className={'w-full absolute top-[30px]'}>
      <div
        className={
          'grid grid-cols-2 md:grid-cols-4 max-w-[1024px] w-full m-auto text-white gap-4 items-center'
        }
      >
          <HeaderLinkBlock/>
          {/*<HeaderUserBlock/>*/}
      </div>
    </header>
  );
}
