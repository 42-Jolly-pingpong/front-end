import { Avatar } from 'flowbite-react';
import { UserStatus } from 'ts/enums/user/user-status.enum';
import User from 'ts/interfaces/user.model';

const AvatarStatus = (props: { user: User }) => {
	const user = props.user;

	const status = () => {
		const base = 'flex w-[8px] h-[8px] rounded-full';

		switch (user.status) {
			case UserStatus.ONLINE:
				return <div className={`${base} bg-green-500`}></div>;
			case UserStatus.OFFLINE:
				return (
					<div className={`${base} border border-gray-600 bg-white`}></div>
				);
			case UserStatus.INGAME:
				return <div className={`${base} bg-primary-500`}></div>;
		}
	};

	return (
		<div className='relative'>
			<Avatar img={user.avatarPath} size='xs' />
			{
				<div className='absolute -top-0.5 left-4 rounded-full border-2 border-white'>
					{status()}
				</div>
			}
		</div>
	);
};

export default AvatarStatus;
