import GoogleIcon from 'images/google.png';
import GrayButton from 'components/button/gray-button';

interface AuthProps {
	onChange: (auth: boolean) => void;
}

const ProfileEditAuth: React.FC<AuthProps> = ({ onChange }) => {
	const handleAuth = () => {
		onChange(false);
	};

	return (
		<div className='flex flex-row mt-5 mb-6'>
			<div className='font-bold text-sm w-16 ml-6 mr-3'>2FA </div>
			<div className='inline-flex w-80 px-3 py-2 bg-gray-50 rounded-lg justify-between items-center'>
				<div className='flex h-4 items-center gap-3'>
					<img src={GoogleIcon} />
					<div className='text-gray-900 text-xs font-bold'>
						Google Authenticator
					</div>
				</div>
				<GrayButton size='xs' onClick={handleAuth}>
					추가
				</GrayButton>
			</div>
		</div>
	);
};

export default ProfileEditAuth;
