import { Link } from 'react-router-dom';
import { ReactComponent as GoogleIcon } from '../../assets/images/Google.svg';
import './styles.css';
export default function LoginButton() {
  return (
    <Link to={'/path'} className={'login-btn'}>
      <GoogleIcon />
        <p className={'w-full text-center'}>
            <span>구글 로그인</span>
        </p>
    </Link>
  );
}
