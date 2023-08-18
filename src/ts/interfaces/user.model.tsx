export interface User{
  idx: number;
  intraId: string;
  email: string;
  nickname: string;
  avatarPath: string;
  status: boolean;
  auth: boolean;
  winCount: number;
  loseCount: number;
  isLeave: boolean;
}