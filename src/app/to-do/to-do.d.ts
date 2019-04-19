import { IUser } from '../common/auth/auth.service';

export interface IToDo {
  id: number;
  name: string;
  isCompleted: boolean;
  dateCompleted: Date;
  userId: number;
  orderId: number;
  User?: IUser;
  createdAt: Date;
}
