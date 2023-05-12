import { useNavigate } from "react-router-dom";

import { setDateWritten } from "../../utils/TextProcessing";

import IconButton from "../Button/IconButton";
import { BiTimeFive } from "react-icons/bi";
import { HiPencilSquare } from "react-icons/hi2";
import { AiFillDelete } from "react-icons/ai";

import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";

import { queryClient } from "../..";
import { useMutation } from "react-query";
import { deleteNotification } from "../../apis/adminApi";
import ButtonComponent from "../Button/ButtonComponent";

interface AdminPageTableRowProps {
  title?: string;
  date?: string;
  id?: number;
}
export default function ReportPostTableRow({
  title = "이거 어케 푸나요?",
  date = "2023-05-07 23:04:11",
  id = 2001,
}: AdminPageTableRowProps) {
  const navigate = useNavigate();
  const { open, closeModal, openModal } = useModal();
  // const { mutate } = useMutation({
  //   mutationFn: deleteNotification,
  //   onSuccess: () => {
  //     // TODO : notice query auto refetch
  //     queryClient.invalidateQueries(["notification"]);
  //   },
  // });

  /** 삭제 Confirm 모달 관련 함수들 */
  const handleClickViewButton = () => {
    openModal();
  };

  const handleConfirm = () => {
    // 삭제 API 요청.
    //mutate(id);
    closeModal();
  };

  const handleModifyBtnClick = () => {
    navigate("/write");
  };

  return (
    <>
      {open && (
        <Modal onClose={closeModal}>
          <div className="flex justify-stretch w-full">
            <section className="flex-grow">신고내용</section>
            <section className="flex-grow">
              <table>
                <thead>
                  <tr>
                    <th>하이</th>
                    <th>1</th>
                    <th>하이</th>
                  </tr>
                </thead>
                <tbody>
                  <td>1</td>
                  <td>2</td>
                  <td>3</td>
                </tbody>
              </table>
            </section>
          </div>
        </Modal>
      )}
      <div className={`p-4 gap-1.5 bg-box-bg border-border relative`}>
        <div className={"flex flex-row justify-between h-full w-full"}>
          <div>
            <span className={"font-bold text-sm truncate max-w-[200px]"}>
              {title}
            </span>
            <div className={"flex items-center justify-between w-full text-xs"}>
              <div>
                <BiTimeFive style={{ display: "inline" }} />
                <span className={"text-[#9ca3af] text-xs text-right"}>
                  {setDateWritten(date)}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right absolute bottom-4 right-4">
            <ButtonComponent onClick={handleClickViewButton}>
              신고 사유 보기
            </ButtonComponent>
          </div>
        </div>
      </div>
    </>
  );
}
