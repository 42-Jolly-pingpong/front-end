import { atom } from "recoil";
import User from "ts/interfaces/user.model";


export const opponentInfoState = atom<User | null>({
	key: 'opponentInfoState',
	default: null,
});
