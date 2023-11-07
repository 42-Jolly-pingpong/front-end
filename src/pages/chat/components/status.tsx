import { UserStatus } from 'ts/enums/user/user-status.enum';

const Status = (props: { status: UserStatus }) => {
	const base = 'flex w-2 h-2 rounded-full';

	switch (props.status) {
		case UserStatus.ONLINE:
			return <div className={`${base} bg-green-500`}></div>;
		case UserStatus.OFFLINE:
			return <div className={`${base} border border-gray-600 bg-white`}></div>;
		case UserStatus.INGAME:
			return <div className={`${base} bg-primary-500`}></div>;
	}
};

export default Status;
