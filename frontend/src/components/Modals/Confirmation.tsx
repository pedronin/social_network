import { Dispatch, SetStateAction } from "react";
import { useContextConfirm } from "../../../hooks/useContextConfirm";

const info = {
  delete: "Удалить это сообщение",
};

interface ConfirmationModalProps {
  // text: string;
  // setModal: Dispatch<SetStateAction<boolean>>;
  //   function?: (p: any) => void;
  //   textButton?: string;
}

// потом вынести на глобальную арену, запихнуть в body, и использовать везде

export const ConfirmationModal = ({} // text,
// setModal,
: ConfirmationModalProps) => {
  const { modalConfirm, setModalConfirm } = useContextConfirm();

  if (!modalConfirm) {
    return null;
  }

  // @ts-ignore
  const text = info[modalConfirm?.type];

  return (
    <div
      className={`
        fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]
        max-w-[300px] w-full h-fit p-5 bg-[#282e33] ss:p-4 text-left rounded-[8px] z-50 text-sm
      `}
    >
      <p className="mb-5">{text}</p>
      <div className="flex gap-4 ml-auto w-fit">
        <button
          onClick={() => setModalConfirm(null)}
          className="text-[#c0591d]"
        >
          Отмена
        </button>
        <button
          onClick={() => setModalConfirm(null)}
          className="text-[#c0591d]"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};
