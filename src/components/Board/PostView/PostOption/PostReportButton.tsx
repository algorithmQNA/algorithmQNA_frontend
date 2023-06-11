import Modal from "../../../Modal/Modal";
import useModal from "../../../../hooks/useModal";
import {SelectBox, SelectOption} from "../../../DropDown/SelectBox";
import {ChangeEvent, useState} from "react";
import ButtonComponent from "../../../Button/ButtonComponent";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {useLocation} from "react-router-dom";
import {privateRequest} from "../../../../apis/instance";

export default function PostReportButton(){
    const location = useLocation();
    const params = new URLSearchParams(location.search).get('pid');
    const query = params ? parseInt(params) : 'a';
    const is = parseInt(query as string);
    const {open,closeModal ,openModal} = useModal()

    const startReport = () =>{
        openModal()
    }
    const categorys = [
        {text:'비속어',value:'SLANG'},
        {text:'정치적 발언',value:'POLITICAL'},
        {text:'광고 등 상업적인 목적',value:'AD'},
        {text:'모욕',value:'INSULT'},
        {text:'음란',value:'LUSTFUL'},
        {text:'주제와 맞지 않는 글/댓글',value:'OUT_OF_TOPIC'},
        {text:'게시판 형식에 맞지 않음',value:'OUT_OF_FORMAT'},
        {text:'기타 발언',value:'ETC'},
    ]
    const [state,setState] = useState({
        category:categorys[0].value,
        content:''
    })

    const changeContent = (e:ChangeEvent<HTMLTextAreaElement>) =>{
        setState((prev)=>({
            ...prev,content: e.target.value
        }))
    }
    const changeCategory = (value:string)=>{
        setState((prev)=>({
            ...prev,category: value
        }))
    }
    const report = useMutation(({pid}:{pid:number})=>privateRequest.post(`/post/${pid}/report`),{
        onError:(error:AxiosError)=>{
            alert('에러')
        },
        onSuccess:()=>{
            alert('성공적으로 게시물을 신고했습니다.')
        }
    })
    const endReport = () =>{
        report.mutate({pid:is})
    }
    return(
        <div>
            <button onClick={startReport}>
                신고
            </button>
            {
                open &&
                <Modal onClose={closeModal}>
                    <div className={'grid gap-4 px-4 text-left'}>
                        <SelectBox event={changeCategory}>
                            {
                                categorys.map((li)=>(
                                    <SelectOption key={li.value} value={li.value}>{li.text}</SelectOption>
                                ))
                            }
                        </SelectBox>
                        <textarea
                            value={state.content}
                            className={'border border-basic rounded resize-none min-h-[250px] text-content p-2'}
                            onChange={changeContent}
                            spellCheck={false}
                            placeholder={'신고 사유를 입력 해주세요'}
                        >
                        </textarea>
                        <div className={'flex justify-end'}>
                            <ButtonComponent onClick={endReport}>신고하기</ButtonComponent>
                        </div>
                    </div>
                </Modal>
            }
        </div>
    )
}