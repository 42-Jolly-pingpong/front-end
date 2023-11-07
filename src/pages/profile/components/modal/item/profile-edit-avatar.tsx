import { Avatar } from 'flowbite-react';
import { useRecoilValue } from 'recoil';
import { ChangeEvent, useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { userState } from 'ts/states/user-state';

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

const ProfileEditAvatar: React.FC<AvatarProps> = ({ onUpload }) => {
	const user = useRecoilValue(userState);
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
			}
			onUpload('');
		}
	};

	return (
		<>
			<Avatar img={avatarImage || user?.avatarPath || ''} rounded size='lg' />
			<label
				className='flex justify-center items-center pt-2'
				htmlFor='input-file'
			>
				<div className='hover:cursor-pointer'>
					<AiOutlineUpload size='20' />
				</div>
				{fileChange ? (
					<div className='pl-2 text-xs font-medium hover:cursor-pointer'>
						다시 선택하기
					</div>
				) : (
					<div className='pl-2 text-xs font-medium hover:cursor-pointer'>
						이미지 업로드
					</div>
				)}
				<input
					type='file'
					id='input-file'
					className='hidden'
					accept='.jpg, .jpeg, .png'
					onChange={handleUpload}
				/>
			</label>
		</>
	);
};

export default ProfileEditAvatar;
