import { type PropsWithChildren } from "react";

import { ContextMenuProvider } from "@/Context/Menu/ContextMenuProvider";
import ChatContextProvider from "@/Context/Chat/ContextChatProvider";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ChatContextProvider>
      <ContextMenuProvider>{children}</ContextMenuProvider>
    </ChatContextProvider>
  );
}
