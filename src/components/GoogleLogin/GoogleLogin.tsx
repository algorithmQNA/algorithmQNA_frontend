import {useEffect, useRef} from "react";
interface win extends Window{
    google?:any
}

export default function GoogleLoginButton(){
    /** 버튼 지정 */
    const Button = useRef<HTMLButtonElement>(null);
    /** 구글 로그인 버튼을 눌르면 로그인으로 인증 후 res로 토큰을 받을 수 있음 */
    const Callback = async (res:any) =>{
        console.log(res)
    }
    /**
     * 클라이언트 아이디 값 설정 및 콜백 함수 지정
     * rederButton을 통해 스타일 지정(현재는 해당 버튼을 가리고 직접 스타일 지정할 수 있게 구현)
     * */
    const setUp = () =>{
        const win:win  = window
        win.google.accounts.id.initialize({
            client_id:'444520536460-8c6h8epkvh4okpv0blaaq94teoapm9i1.apps.googleusercontent.com',
            callback:Callback
        })
        win.google.accounts.id.renderButton(Button.current, {
            type:'icon',
        });
    }
    /** 구글 클라이언트 라이브러리 셋업 */
    useEffect(()=>{
        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client';
        script.onload = setUp;
        document.head.appendChild(script)
        return ()=>{
            document.head.removeChild(script)
        }
    },[setUp])
    /**
     * 기본 설정된 버튼 스타일을 display:none처리 하고 표시된 버튼을 클릭 시 none처리된 버튼이 클릭
     * iframe으로 되어있기 때문에 아래와 같이 구현해야함
     * */
    function click(){
        const target:HTMLElement | null = document.querySelector('[aria-labelledby="button-label"]')
        target?.click();
    }
    return(
        <div>
            <button onClick={click}>구글 로그인</button>
            <button className={'hidden'} ref={Button}></button>
        </div>
    )
}