import { createChatsClient } from "@/$api";
import { SERVER_URL } from "../env";

export const chatsApi = createChatsClient(SERVER_URL!);