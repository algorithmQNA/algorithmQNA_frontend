import { useLocation } from 'react-router-dom';
import useSetLogin from '../../components/Login/UseSetLogin';

export default function LoginProcessPage() {
  const { search } = useLocation();
  const code = new URLSearchParams(search).get('code');
  const state = new URLSearchParams(search).get('state');
  useSetLogin({ code, state });
  return (
      <div className={'fixed z-[1000] top-0 left-0 w-full h-screen bg-white flex justify-center items-center select-none'}>
        <img src={'/svg/spinner.svg'} alt={'loading'}/>
      </div>
  )
}
