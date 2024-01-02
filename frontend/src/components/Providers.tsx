"use client";

import {
  type PropsWithChildren,
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { IUser } from "@/$api";
import { chatsApi } from "@/lib/chatsApi";

interface IChatsContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  user2: IUser | null;
  setUser2: Dispatch<SetStateAction<IUser | null>>;
  chatId: string;
  setChatId: Dispatch<SetStateAction<string>>;
  allChatsId: IAllChatsId;
  setAllChatsId: Dispatch<SetStateAction<IAllChatsId>>;
  findMes: string;
  setFindMes: Dispatch<SetStateAction<string>>;
}

type IAllChatsId = {
  chatId: string;
  user2Id: string;
}[];

export const ChatsContext = createContext<IChatsContext>({} as IChatsContext);

export default function Providers({ children }: PropsWithChildren) {
  const router = useRouter();

  const [user, setUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [user2, setUser2] = useState<IUser | null>(
    JSON.parse(localStorage.getItem("user2") || "{}")
  );
  const [chatId, setChatId] = useState("");
  const [allChatsId, setAllChatsId] = useState<IAllChatsId>([]);
  const [findMes, setFindMes] = useState("");

  // useEffect(() => {
  //   const unSubscribe = async () => {
  //     await chatsApi.toggleOnline(new Date().toString(), user?._id!);
  //   };
  //   window.addEventListener("beforeunload", (e: any) => {
  //     e.preventDefault();
  //     return unSubscribe();
  //   });

  //   (async () => {
  //     try {
  //       const { data } = await chatsApi.toggleOnline("online", user?._id!);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();

  //   return () => {
  //     unSubscribe();
  //   };
  // }, []);

  useEffect(() => {
    if (!user || !user.email) {
      router.push("/login");
    }
  }, [user]);

  return (
    <ChatsContext.Provider
      value={{
        user,
        setUser,
        user2,
        setUser2,
        chatId,
        setChatId,
        allChatsId,
        setAllChatsId,
        findMes,
        setFindMes,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
}
