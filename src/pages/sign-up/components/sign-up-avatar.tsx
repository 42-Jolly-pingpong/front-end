import { uploadFile } from 'components/utils/file-utils';
import { Avatar } from 'flowbite-react';
import { ChangeEvent, useState } from 'react';
import { FiUpload } from 'react-icons/fi';

interface AvatarProps {
	onUpload: (path: string) => void;
}

const SignUpAvatar: React.FC<AvatarProps> = ({ onUpload }) => {
	const [avatarImage, setAvatarImage] = useState('');
	const [fileChange, setFileChange] = useState(false);

	const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		const validFile = await uploadFile(event.target.files![0]);

		if (validFile) {
			onUpload(validFile);
			setAvatarImage(validFile);
			setFileChange(true);
		} else {
			setAvatarImage('');
			onUpload('');
		}
	};

	return (
		<div className='flex-flex-col'>
			<Avatar img={avatarImage || ''} rounded size='lg' />
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

export default SignUpAvatar;
