import {Link} from "react-router-dom";

interface Props {
  title: string;
  img: any;
  href: string;
  colorCode: `#${string}`;
}
export default function MainPageMove({ title, img, href, colorCode }: Props) {
  return (
    <Link to={href} className={'gap-6 text-center dash-move'}>
      <div className={'flex justify-center'}>
        <div
          className={`relative border-dashed border-2 rounded-full w-full max-w-[75px] md:max-w-[100px] h-[75px] md:h-[100px] mb-6 move-tag`}
          style={{ borderColor: colorCode }}
        >
          <p
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full overflow-hidden transition-all duration-300`}
            style={{ backgroundColor: colorCode }}
          >
            <img
              src={img}
              className={
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%]'
              }
            />
          </p>
        </div>
      </div>
      <div className={'text-title text-lg md:text-2xl font-medium text-center'}>
        {title}
      </div>
    </Link>
  );
}
