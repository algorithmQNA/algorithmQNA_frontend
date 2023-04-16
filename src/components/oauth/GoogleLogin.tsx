import {useEffect, useRef} from "react";
import './style.css'
interface win extends Window{
    google?:any
}

export default function GoogleLoginButton(){
    const Button = useRef<HTMLButtonElement>(null);
    const Callback = async (res:any) =>{
        document.cookie = 'same-site-cookie=foo; SameSite=Lax';
        document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
        console.log(res)
    }
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
    useEffect(()=>{
        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client';
        script.onload = setUp;
        document.head.appendChild(script)
        return ()=>{
            document.head.removeChild(script)
        }
    },[setUp])
    function test(){
        const target:HTMLElement | null = document.querySelector('[aria-labelledby="button-label"]')
        target?.click();
    }
    return(
        <div>
            <button onClick={test}>구글 로그인</button>
            <button className={'hidden'} ref={Button}></button>
        </div>
    )
}