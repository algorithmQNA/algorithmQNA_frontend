interface Props {
  title: string;
  img: any;
  href: string;
  colorCode: `#${string}`;
}
export default function MainPageMove({ title, img, href, colorCode }: Props) {
  return (
    <a href={href} className={'gap-6 text-center'}>
      <div className={'flex justify-center'}>
        <div
          className={`relative border-dashed border-2 rounded-full w-[100px] h-[100px] mb-6`}
          style={{ borderColor: colorCode }}
        >
          <p
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full overflow-hidden`}
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
      <div className={'text-title text-2xl font-medium text-center'}>
        {title}
      </div>
    </a>
  );
}
