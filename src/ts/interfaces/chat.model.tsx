import { User } from './user.model';

export interface Chat {
	idx: number;
	user: User;
	content: string;
	sentTime: Date;
}
