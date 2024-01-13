import { chatsApi } from "@/lib/chatsApi";
import type { SetStateAction, Dispatch } from "react";
import { useContextChat } from "../../../../../hooks";

interface MassOperationsProps {
  checkMessages: string[];
  setCheckMessages: Dispatch<SetStateAction<string[]>>;
}

export const MassOperations = ({
  checkMessages,
  setCheckMessages,
}: MassOperationsProps) => {
  const { setMessages } = useContextChat();

  const deleteMany = async () => {
    const { data } = await chatsApi.deleteManyMessage({ ids: checkMessages });
    setMessages(data);
    setCheckMessages([]);
  };

  return (
    <div className="flex justify-between w-full">
      <div className="flex gap-4">
        <button className="px-3 py-2 bg-[#c0591d] rounded-[4px] text-[13px]">
          ПЕРЕСЛАТЬ
          <span className="inline-block w-[19px] ml-1 text-[#ea9e69]">
            {checkMessages.length}
          </span>
        </button>
        <button
          onClick={deleteMany}
          className="px-3 py-2 bg-[#c0591d] rounded-[4px] text-[13px]"
        >
          УДАЛИТЬ
          <span className="inline-block w-[19px] ml-1 text-[#ea9e69]">
            {checkMessages.length}
          </span>
        </button>
      </div>
      <button
        onClick={() => setCheckMessages([])}
        className="text-[13px] text-[#fda674] mr-3"
      >
        ОТМЕНА
      </button>
    </div>
  );
};
