import { ChatInterface } from '@interfaces/models/chat.interfaces';

export type BoardKind = 'message' | 'request';

export interface BoardItemBase {
  id: number;
  createdAt: string;
  kind: BoardKind;
  title: string;
  preview: string;
}

export interface MessagePayload {
  id: number;
  idUser: number;
  username: string;
  title: string;
  body: string;
  createdAt: string;
}

export interface RequestParameter {
  idParameter: number;
  title: string;
  body: string;
  type: number;
  num: number;
  valueString: string | null;
  valueNum: number | null;
}

export interface RequestEnrolled {
  idUser: number;
  username: string;
  reputation: number;
  votes: number;
  status: number;
}

export interface RequestPayload {
  id: number;
  idUser: number;
  username: string;
  reputation: number;
  votes: number;
  title: string;
  body: string;
  reward: number;
  status: number;
  completedAt: string | null;
  createdAt: string;
  participantsTotal: number;
  participantsAccepted: number;
  isEnrolled: 0 | 1;
  enrollmentStatus: number | null;
  parameters: RequestParameter[];
  enrolled: RequestEnrolled[];
}

export interface BoardItem extends BoardItemBase {
  payload: MessagePayload | RequestPayload;
}

export interface BoardResponse {
  status: string;
  chats: ChatInterface[];
  board: BoardItem[];
  page: number;
  limit: number;
  nextPage: number | null;
}
