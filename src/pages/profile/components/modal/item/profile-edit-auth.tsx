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
		<div className='flex gap-5'>
			<div className='font-bold text-sm w-16'>2FA</div>
			<div className='inline-flex w-full px-3 py-2 bg-gray-50 rounded-lg justify-between items-center'>
				<div className='flex gap-3'>
					<img src={GoogleIcon} />
					<div className='text-gray-900 text-xs font-bold'>
						Google Authenticator
					</div>
				</div>
				<GrayButton size='xs' onClick={handleAuth}>
					{/* TODO 추가된 경우라면 제거 표시 */}
					추가
				</GrayButton>
			</div>
		</div>
	);
};

export default ProfileEditAuth;
