import sendAPI from 'api/sendAPI';
import { Dm } from 'ts/interfaces/dm.model';
import User from 'ts/interfaces/user.model';

export const getDM = async (user: User): Promise<Dm | undefined> => {
	console.log(user);
	try {
		const dm = await sendAPI({
			method: 'POST',
			url: '/chat-rooms/dm',
			body: { chatMate: user },
		});
		return dm;
	} catch (e) {
		console.log(e);
		return;
	}
};
