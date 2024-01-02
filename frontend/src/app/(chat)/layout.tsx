import type { Metadata } from "next";
import styles from "./ChatsPage.module.scss";
import ChatSidebar from "@/components/chats/List";

export const metadata: Metadata = {
  title: "Telegram",
};

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <ChatSidebar />
      {children}
    </div>
  );
}
