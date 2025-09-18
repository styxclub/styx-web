export interface ChatInterface {
  id: number;
  idRequest: number | null;
  idUserFrom: number;
  username: string | null;
  body: string | null;
  isRead: boolean;
  createdAt: string;
}
