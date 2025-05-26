import { Message } from "@/model/User";


export interface ApiResponse {
  accept: boolean;
  message: string;
  isAccepted?: boolean;
  messages?: Message[];
}