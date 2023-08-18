import { User } from './user.model';

export interface Chat {
	id: number;
	user: User;
	content: string;
	sentTime: string;
} //임시s
