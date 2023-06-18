import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Rounded from '../../components/RoundedImage/RoundedImage';
import ButtonComponent from '../../components/Button/ButtonComponent';
import useModal from '../../hooks/useModal';
import Modal from '../../components/Modal/Modal';
import IconButton from '../../components/Button/IconButton';
import { BiPencil } from 'react-icons/bi';
import InputComponent from '../../components/Input/InputComponent';
import { useMutation, useQueryClient } from 'react-query';
import {
  successionUserRequest,
  updateMemberNicknameRequest,
  updateProfileImgRequest,
} from '../../apis/authApi';
import { useNavigate } from 'react-router-dom';
import useGetMember from '../../hooks/useGetMember';
import MessageBox from '../../components/MessageBox';

function Profile() {
  const memberInfo = useGetMember();

  const [nickname, setNickname] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const {
    open: secessionModalOpen,
    openModal: openSeccesionModal,
    closeModal: closeSecessionModal,
  } = useModal();

  const profileUploadRef = useRef<HTMLInputElement>(null);

  const updateNickname = useMutation(updateMemberNicknameRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      window.alert('닉네임 변경을 성공했습니다');
    },
  });
  const updateProfileImg = useMutation(updateProfileImgRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      window.alert('프로필 이미지 업데이트를 성공했습니다');
    },
  });
  const successUser = useMutation(successionUserRequest, {
    onSettled: () => closeSecessionModal(),
    onSuccess: () => {
      navigate('/access');
      window.alert('회원 탈퇴를 성공했습니다');
    },
    onError: () => {
      window.alert('회원 탈퇴를 실패했습니다');
    },
  });

  useEffect(() => {
    if (!memberInfo.isLoading && memberInfo.data?.data.data.memberName)
      setNickname(memberInfo.data?.data.data.memberName);
  }, [memberInfo.isLoading, memberInfo.data?.data.data.memberName]);

  const handleUpdateNicknameBtn = () => {
    updateNickname.mutate(nickname);
  };

  const handleProfileImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      const data = new FormData();
      data.append('file', file[0]);
      updateProfileImg.mutate(data);
    }
  };

  const data = memberInfo.data?.data.data;

  if (memberInfo.isLoading) {
    return <div>불러오는중</div>;
  }

  if (!data) return <MessageBox msg={`😊 사용자 정보를 가져올 수 없습니다`} />;

  const isValidRepeatEmail = repeatEmail === data?.memberEmail;

  return (
    <div>
      {secessionModalOpen && (
        <Modal onClose={closeSecessionModal} title="회원 탈퇴">
          <p>탈퇴하시려면 이메일을 입력해주세요</p>
          <div className="w-1/2 mx-auto my-2">
            <InputComponent
              value={repeatEmail}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRepeatEmail(e.target.value)
              }
              placeholder="email"
            />
            <div className="flex mt-4 justify-around">
              <ButtonComponent type="outline" onClick={closeSecessionModal}>
                취소
              </ButtonComponent>
              <button
                disabled={!isValidRepeatEmail}
                className="bg-primary border border-primary text-white px-6 py-2 font-semibold text-base rounded-full w-fit disabled:bg-gray-500 disabled:border-none disabled:cursor-not-allowed"
                onClick={() => {
                  if (data.memberId) successUser.mutate(data.memberId);
                }}
              >
                탈퇴
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div className="flex p-8 flex-wrap-reverse justify-center sm:justify-between gap-4 sm:gap-32">
        <div className="grow flex flex-col gap-4">
          <div>
            <label htmlFor="name">닉네임</label>
            <input
              id="name"
              value={nickname}
              placeholder="nickname"
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              className="border border-[#D9D9D9] w-full py-1 px-2 relative rounded text-sm p-0 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              defaultValue={data.memberEmail}
              placeholder="email"
              className="bg-border border border-[#D9D9D9] w-full py-1 px-2 relative rounded text-sm p-0 focus:outline-none hover:cursor-not-allowed"
              disabled
            />
          </div>
        </div>
        <div>
          <Rounded
            alt="user profile image"
            size="rg"
            src={
              data.memberProfileUrl ||
              'https://lh3.googleusercontent.com/ogw/AOLn63HADtscguumy1K7WcYQFGzKCnZLaQa2_f4YwqM66Q=s32-c-mo'
            }
            width="160px"
            height="160px"
          />
          <div className="relative -top-5 bg-slate-200 w-fit rounded-md border-border">
            <input
              ref={profileUploadRef}
              onChange={handleProfileImgChange}
              type="file"
              accept=".png, .jpg, .jpeg"
              className="hidden"
            />
            <IconButton
              Icon={<BiPencil style={{ display: 'inline' }} />}
              onClick={() => {
                profileUploadRef.current?.click();
              }}
            >
              수정
            </IconButton>
          </div>
        </div>
      </div>
      <div className="px-8 flex gap-4">
        <ButtonComponent onClick={openSeccesionModal}>탈퇴</ButtonComponent>
        <ButtonComponent onClick={handleUpdateNicknameBtn}>
          저장
        </ButtonComponent>
      </div>
      <p className="px-8 py-2 font-thin text-sm">
        닉네임 변경사항을 저장하시려면 닉네임을 수정하고 '저장'버튼을 눌러주세요
      </p>
    </div>
  );
}

export default Profile;
