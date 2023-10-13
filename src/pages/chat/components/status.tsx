import { UserStatus } from 'ts/enums/user-status.enum';

const Status = (props: { status: UserStatus }) => {
	switch (props.status) {
		case UserStatus.ONLINE:
			return <div className='flex w-2 h-2 bg-green-500 rounded-full'></div>;
		case UserStatus.OFFLINE:
			return (
				<div className='flex w-3 h-3 border border-gray-400 rounded-full'></div>
			);
		case UserStatus.INGAME:
			return <div className='flex w-2 h-2 bg-yellow-500 rounded-full'></div>;
	}
};

export default Status;
