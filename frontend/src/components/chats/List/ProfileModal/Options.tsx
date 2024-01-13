import { Info, LogOut } from "lucide-react";
import { useContextChat } from "../../../../../hooks";
import { type Dispatch, type SetStateAction } from "react";

interface OptionsModalProps {
  setModal: any;
  setCurrTabs: Dispatch<SetStateAction<"info" | "edit">>;
}

export const OptionsModal = ({ setModal, setCurrTabs }: OptionsModalProps) => {
  const { setUser } = useContextChat();

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <ul
      className="absolute top-5 -right-2 flex flex-col gap-2 w-[200px] h-fit p-3 text-sm
    bg-[#282e33] text-left rounded-md shadow-2xl"
    >
      <li
        onClick={() => setCurrTabs("edit")}
        className="flex items-center gap-3 cursor-pointer"
      >
        <Info width={18} />
        Изменить профиль
      </li>
      <li
        onClick={logOut}
        className="flex items-center gap-3 text-[#d43f3f] cursor-pointer"
      >
        <LogOut color="#d43f3f" width={18} />
        Выйти
      </li>
    </ul>
  );
};
