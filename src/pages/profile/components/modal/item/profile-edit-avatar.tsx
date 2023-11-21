import { Avatar } from 'flowbite-react';
import { useRecoilValue } from 'recoil';
import { FiUpload } from 'react-icons/fi';
import { ChangeEvent, useState } from 'react';
import { userState } from 'ts/states/user-state';
import { uploadFile } from 'components/utils/file-utils';

interface AvatarProps {
	onUpload: (path: string) => void;
}

const ProfileEditAvatar: React.FC<AvatarProps> = ({ onUpload }) => {
	const user = useRecoilValue(userState);
	const [avatarImage, setAvatarImage] = useState('');
	const [fileChange, setFileChange] = useState(false);

	const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		const validFile = await uploadFile(event.target.files![0]);
		if (validFile) {
			onUpload(validFile);
			setAvatarImage(validFile);
			setFileChange(true);
		} else {
			alert('5MB 이하 파일만 등록할 수 있습니다.');
			setAvatarImage('');
			onUpload('');
		}
	};

	return (
		<div className='flex-flex-col'>
			<Avatar img={avatarImage || user?.avatarPath || ''} rounded size='lg' />
			<label
				className='flex items-center justify-center gap-2 py-2 hover:cursor-pointer'
				htmlFor='input-file'
			>
				<FiUpload size='16' />
				<span className='text-xs font-medium'>
					{fileChange ? '다시 선택하기' : '이미지 업로드'}
				</span>
				<input
					type='file'
					id='input-file'
					className='hidden'
					accept='.jpg, .jpeg, .png'
					onChange={handleUpload}
				/>
			</label>
		</div>
	);
};

export default ProfileEditAvatar;
