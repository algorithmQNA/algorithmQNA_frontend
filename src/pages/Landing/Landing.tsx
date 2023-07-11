import Google from '../../assets/images/Google.svg';

export default function LandingPage() {
  return (
    <div
      className={
        'fixed z-[1000] top-0 left-0 w-full h-screen bg-white flex justify-center items-center select-none'
      }
    >
      <div
        className={
          'border border-basic w-full max-w-[500px] h-fit rounded-2xl p-4 grid gap-6 m-4'
        }
      >
        <p className={'font-medium text-sm text-center'}>
          페이지 이용을 위해서 로그인이 필요합니다!
        </p>
        <a
          href={`http://algoqna.ddns.net/oauth/google?redirectUri=${process.env.REACT_APP_OAUTH_REDIRECT_URI}/google/callback`}
          className={
            'h-full border border-basic p-4 rounded-lg text-basic hover:text-black hover:border-primary transition duration-300'
          }
        >
          <div className={'flex gap-4 items-center font-medium'}>
            <button>
              <img
                src={Google}
                className={'w-[50px] h-[50px]'}
                alt={'구글 로그인'}
              />
            </button>
            <p className={'text-2xl w-full text-center'}>구글 로그인 하기</p>
          </div>
        </a>
      </div>
    </div>
  );
}
