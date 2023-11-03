import CancelButton from 'components/button/cancel-button';

interface HeaderProps {
	onClose: () => void;
}

const ProfileEditHeader: React.FC<HeaderProps> = ({ onClose }) => {
	return (
		<div className='flex justify-between p-8'>
			<div className=' text-xl'>프로필 편집</div>
			<CancelButton size='6' onClick={onClose} />
		</div>
	);
};

export default ProfileEditHeader;
