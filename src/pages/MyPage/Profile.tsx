import React, { useState } from "react";
import InputComponent from "../../components/Input/InputComponent";
import Rounded from "../../components/RoundedImage/RoundedImage";
import ButtonComponent from "../../components/Button/ButtonComponent";
import CommentView from "../../components/CommentView/CommentList";
import Modal from "../../components/Modal/Modal";
import useModal from "../../hooks/useModal";

function Profile() {
  const [state, setState] = useState("");
  const { open: changePwdModalOpen, openModal, closeModal } = useModal();
  const {
    open: secessionModalOpen,
    openModal: openSeccesionModal,
    closeModal: closeSecessionModal,
  } = useModal();

  return (
    <>
      <div className="flex flex-auto gap-9 md:gap-36">
        <div className="grow">
          <div>
            <label htmlFor="nickname">닉네임</label>
            <InputComponent
              id="nickname"
              input={{
                value: state,
                event: (e) => {
                  setState(e.target.value);
                },
                placeholder: "hihi",
              }}
            />
          </div>
          <div>
            <label htmlFor="id">아이디</label>
            <InputComponent
              id="id"
              disabled
              input={{
                value: state,
                event: (e) => {
                  setState(e.target.value);
                },
                placeholder: "id",
              }}
            />
          </div>
          <div>
            <label htmlFor="email">이메일</label>
            <InputComponent
              id="email"
              disabled
              input={{
                value: "",
                event: (e) => {},
                placeholder: "email",
              }}
            />
          </div>
        </div>
        <div>
          <Rounded
            alt="hi"
            src="https://lh3.googleusercontent.com/ogw/AOLn63HADtscguumy1K7WcYQFGzKCnZLaQa2_f4YwqM66Q=s32-c-mo"
            width="216px"
            height="216px"
          ></Rounded>
        </div>
      </div>
      <div className="mt-10">
        <ButtonComponent
          onClick={openModal}
          className="!bg-slate-300 border-none mr-3"
        >
          비밀번호 변경
        </ButtonComponent>
        <ButtonComponent
          onClick={openSeccesionModal}
          className="!bg-red-400 border-none"
        >
          탈퇴
        </ButtonComponent>
        {changePwdModalOpen && (
          <Modal onClose={closeModal}>비밀번호 변경 모달</Modal>
        )}
        {secessionModalOpen && (
          <Modal
            onClose={closeSecessionModal}
            onCancel={() => {}}
            onConfirm={closeSecessionModal}
          >
            탈퇴 모달
          </Modal>
        )}
        <CommentView />
      </div>
    </>
  );
}

export default Profile;
