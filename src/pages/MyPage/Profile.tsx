import React from 'react';
import Rounded from '../../components/RoundedImage/RoundedImage';
// import { isLogin } from '../../storage/Login/Login';
// import { useRecoilValue } from 'recoil';

function Profile() {
  // const { id, profile, name } = useRecoilValue(isLogin);

  return (
    <div className="flex p-8 flex-wrap-reverse justify-center sm:justify-between gap-4 sm:gap-32">
      <div className="grow flex flex-col gap-4">
        <div>
          <label htmlFor="name">이름</label>
          <input
            id="name"
            defaultValue={'test'}
            placeholder="nickname"
            className="border border-[#D9D9D9] w-full py-1 px-2 relative rounded text-sm p-0 focus:outline-none"
            disabled
          />
        </div>
        <div>
          <label htmlFor="email ">이메일</label>
          <input
            id="email"
            defaultValue={'test@test.com'}
            placeholder="email"
            className="border border-[#D9D9D9] w-full py-1 px-2 relative rounded text-sm p-0 focus:outline-none"
            disabled
          />
        </div>
      </div>
      <div>
        <Rounded
          alt="user profile image"
          src={
            'https://lh3.googleusercontent.com/ogw/AOLn63HADtscguumy1K7WcYQFGzKCnZLaQa2_f4YwqM66Q=s32-c-mo'
          }
          width="160px"
          height="160px"
        />
      </div>
      {/* <div className="mt-10">
        {/* <ButtonComponent
          onClick={openSeccesionModal}
          className="!bg-red-400 border-none"
        >
          탈퇴
        </ButtonComponent> */}

      {/* {secessionModalOpen && (
          <Modal
            onClose={closeSecessionModal}
            onCancel={() => {}}
            onConfirm={closeSecessionModal}
          >
            탈퇴 모달
          </Modal>
        )} }
      </div> */}
      {/* <CommentList /> */}
    </div>
  );
}

export default Profile;
