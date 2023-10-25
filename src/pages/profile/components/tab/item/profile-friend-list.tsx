import User from 'ts/interfaces/user.model';

interface FriendListProps {
	requests: User[];
	friends: User[];
}

const ProfileFriendList: React.FC<FriendListProps> = ({
	requests,
	friends,
}) => {
	//1) 친구 요청 리스트 map
	//2) 친구 리스트 map
	return <div>여기에 친구 리스트</div>;
};

export default ProfileFriendList;
