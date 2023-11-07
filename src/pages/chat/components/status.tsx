import { UserStatus } from 'ts/enums/user/user-status.enum';

const Status = (props: { status: UserStatus }) => {
	switch (props.status) {
		case UserStatus.ONLINE:
			return <div className='flex w-2 h-2 bg-green-500 rounded-full'></div>;
		case UserStatus.OFFLINE:
			return (
				<div className='flex w-2 h-2 border border-gray-600 rounded-full'></div>
			);
		case UserStatus.INGAME:
			return <div className='flex w-2 h-2 bg-primary-500 rounded-full'></div>;
	}
};

export default Status;
