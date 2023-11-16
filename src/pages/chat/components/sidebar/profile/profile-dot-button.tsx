import {
	addBlockedFriend,
	deleteBlockedFriend,
	deleteFriend,
	getFriendList,
	getFriendRelation,
	updateFriend,
} from 'api/friend-api';
import { Dropdown } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { HiOutlineUserAdd, HiOutlineUserRemove } from 'react-icons/hi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ProfileStatus } from 'ts/enums/profile/profile-status.enum';
import User from 'ts/interfaces/user.model';
import { chatSidebarState } from 'ts/states/chat-sidebar-state';
import { userState } from 'ts/states/user-state';
import { userFriendsState } from 'ts/states/user/user-friends-state';

const ProfileDotButton = () => {
	const user = useRecoilValue(userState) as User;
	const otherUser = useRecoilValue(chatSidebarState).profile as User;
	const setFriendsState = useSetRecoilState(userFriendsState);
	const [relation, setRelation] = useState<ProfileStatus>(
		ProfileStatus.UNDEFINED
	);

	const isFriend = relation === ProfileStatus.FRIEND;
	const isBlocked = relation === ProfileStatus.BLOCKEDBYME;

	useEffect(() => {
		(async () => {
			const relation = await getFriendRelation(otherUser.id);
			setRelation(relation);
		})();
	}, []);

	const isPending =
		relation === ProfileStatus.REQUESTEDBYME ||
		relation === ProfileStatus.REQUESTEDBYOTHER;

	const textForFriendRelation = (() => {
		switch (relation) {
			case ProfileStatus.FRIEND:
				return '친구 제거하기';
			case ProfileStatus.REQUESTEDBYME:
				return '수락 대기 중';
			case ProfileStatus.REQUESTEDBYOTHER:
				return '응답 대기 중';
			default:
				return '친구 신청하기';
		}
	})();

	const renderTrigger = () => {
		return (
			<div>
				<button
					disabled={user.id === otherUser.id}
					className='disabled:cursor-not-allowed disabled:opacity-50 rounded-lg flex items-stretch items-center justify-center p-2 text-center text-gray-900 bg-white border border-gray-300 enabled:hover:bg-gray-100 focus:ring-4 focus:ring-cyan-300 '
				>
					<BiDotsVerticalRounded size={16} />
				</button>
			</div>
		);
	};

	const onClickManageFriend = async () => {
		if (isFriend) {
			await deleteFriend(otherUser.id);
			const friends = await getFriendList(user!.id);
			setFriendsState((pre) => ({ ...pre, friends }));
		} else {
			await updateFriend(otherUser.id);
		}
		const newRelation = await getFriendRelation(otherUser.id);
		setRelation(newRelation);
	};

	const onClickManageBlock = async () => {
		if (isBlocked) {
			await deleteBlockedFriend(otherUser.id);
		} else {
			await addBlockedFriend(otherUser.id);
		}
		const newRelation = await getFriendRelation(otherUser.id);
		setRelation(newRelation);
	};

	return (
		<Dropdown
			label=''
			dismissOnClick={false}
			renderTrigger={() => renderTrigger()}
		>
			<Dropdown.Item onClick={onClickManageFriend} disabled={isPending}>
				<div
					className={`flex items-center font-normal text-sm ${
						isPending ? 'text-gray-400' : 'text-gray-700'
					}`}
				>
					<HiOutlineUserAdd className='mr-2' />
					{textForFriendRelation}
				</div>
			</Dropdown.Item>
			<Dropdown.Item onClick={onClickManageBlock}>
				<div className='flex items-center font-normal text-sm text-red-500'>
					<HiOutlineUserRemove className='mr-2' />
					{isBlocked ? '차단 해제' : '차단하기'}
				</div>
			</Dropdown.Item>
		</Dropdown>
	);
};

export default ProfileDotButton;
