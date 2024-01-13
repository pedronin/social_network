import React, {
  useState,
  type Dispatch,
  type SetStateAction,
  useRef,
} from "react";

import { IUser } from "@/$api";
import { MoreVertical, X } from "lucide-react";
import { OptionsModal } from "./Options";
import ProfileModalInfo from "./Info";
import { EditProfile } from "./Edit";

interface ProfileModalProps {
  user: IUser;
  setModal: Dispatch<SetStateAction<boolean>>;
}

export const ProfileModal = ({ user, setModal }: ProfileModalProps) => {
  const [currTabs, setCurrTabs] = useState<"info" | "edit">("edit");
  const [modalOption, setModalOption] = useState(false);
  const openOptionRef = useRef<SVGSVGElement>(null);

  return (
    <div
      onClick={(e) => {
        // @ts-ignore
        if (!openOptionRef.current?.contains(e.target)) {
          setModalOption(false);
        }
      }}
      // onClick={() => setModalProf(false)}
      className="fixed z-40 top-0 left-0 flex justify-center w-screen h-screen bg-[#000000ad]"
    >
      <div
        className="flex flex-col max-w-[395px] w-full h-fit mt-10 bg-[#313b43] 
        rounded-[10px] overflow-hidden z-50"
      >
        <div>
          <div className="flex justify-between pb-8 px-5 pt-2 bg-[#282e33]">
            <h2 className="text-[17px] pt-3">Профиль</h2>
            <div className="flex items-center gap-4">
              <div
                className={`
                  relative flex justify-center items-center w-10 h-10 rounded-full transition-all ease-linear
                  ${modalOption && "bg-[#313b43]"}
                `}
              >
                <MoreVertical
                  ref={openOptionRef}
                  onClick={() => setModalOption(true)}
                  className="cursor-pointer"
                  color="#656565"
                  width={22}
                />
                {modalOption && (
                  <OptionsModal
                    setModal={setModalOption}
                    setCurrTabs={setCurrTabs}
                  />
                )}
              </div>
              <X
                onClick={() => setModal(false)}
                className="cursor-pointer"
                color="#656565"
                width={22}
              />
            </div>
          </div>
        </div>
        {currTabs === "info" && <ProfileModalInfo user={user} />}
        {currTabs === "edit" && <EditProfile user={user} />}
      </div>
    </div>
  );
};
