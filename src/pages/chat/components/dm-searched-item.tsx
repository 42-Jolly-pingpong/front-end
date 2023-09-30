import { Avatar } from 'flowbite-react';
import { User } from 'ts/interfaces/user.model';

const DmSearchedItem = (props: { friend: User; isTheLast: boolean }) => {
	const { friend } = props;
	const margin = props.isTheLast ? '' : 'mb-2';

	return (
		<div className={`w-full ${margin}`}>
			<button className='flex w-full hover:bg-gray-200 text-left'>
				<Avatar img={friend.avatarPath} size='xs' className='mr-2' />
				{friend.nickname}
			</button>
		</div>
	);
};

export default DmSearchedItem;
