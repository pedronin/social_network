import SidebarClient from "../chats/List";
import type { PropsWithChildren } from "react";
import React from "react";
import style from "./Layout.module.scss";

function LayoutClient({ children }: PropsWithChildren<unknown>) {
  return (
    <main className={style.layout}>
      <SidebarClient />
      {children}
    </main>
  );
}

export default LayoutClient;
