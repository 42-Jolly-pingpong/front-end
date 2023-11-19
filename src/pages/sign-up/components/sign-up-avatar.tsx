import { Avatar } from 'flowbite-react';
import { ChangeEvent, useState } from 'react';
import { FiUpload } from 'react-icons/fi';

interface AvatarProps {
	onUpload: (path: string) => void;
}

const readFileAsBase64 = async (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.result) {
				resolve(reader.result.toString());
			} else {
				reject('');
			}
		};
		reader.onerror = (e) => reject(e);
		reader.readAsDataURL(file);
	});
};

const SignUpAvatar: React.FC<AvatarProps> = ({ onUpload }) => {
	const [avatarImage, setAvatarImage] = useState('');
	const [fileChange, setFileChange] = useState(false);

	const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
			const maxSizeInBytes = 5 * 1024 * 1024;

			if (allowedExtensions.test(file.name) && file.size <= maxSizeInBytes) {
				const base64String = await readFileAsBase64(file);
				onUpload(base64String);
				setAvatarImage(base64String);
				setFileChange(true);
			} else {
				onUpload('');
			}
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
