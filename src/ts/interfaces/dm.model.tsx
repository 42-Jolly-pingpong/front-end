import { User } from 'ts/interfaces/user.model';

export interface Dm {
	id: number;
	chatMate: User;
	updatedTime: Date;
	status: boolean;
}
