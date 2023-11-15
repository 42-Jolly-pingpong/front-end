interface Props {
	isWinner: boolean;
}

const ProfileGameHistoryBorder: React.FC<Props> = ({ isWinner }) => {
	return (
		<div
			className={`w-2 h-[120px] rounded-l-lg  ${
				isWinner ? 'bg-blue-500' : 'bg-red-500'
			}`}
		/>
	);
};

export default ProfileGameHistoryBorder;
