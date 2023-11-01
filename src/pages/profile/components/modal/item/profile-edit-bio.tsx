import { Textarea } from 'flowbite-react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from 'ts/states/user-state';

interface BioProps {
	onChange: (bio: string) => void;
}

const ProfileEditBio: React.FC<BioProps> = ({ onChange }) => {
	const user = useRecoilValue(userState);
	const [bio, setBio] = useState<string>(user?.bio || '');

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const inputValue = event.target.value;
		if (inputValue.length <= 150) {
			setBio(inputValue);
			onChange(inputValue);
		} else {
			const overInput = inputValue.substring(0, 150);
			alert('150글자를 초과할 수 없습니다.');
			setBio(overInput);
			onChange(overInput);
		}
	};

	return (
		<>
			<div className='flex flex-row mt-5'>
				<div className='font-bold text-sm w-16 mx-6'>소개글 </div>
				<Textarea
					placeholder={user?.bio || '여기에 본인을 설명해주세요!'}
					className='w-full'
					rows={6}
					value={bio}
					onChange={handleInputChange}
				/>
			</div>
			<div className='flex text-xs text-gray-500 mt-3 ml-24'>
				{bio.length}/150
			</div>
		</>
	);
};

export default ProfileEditBio;
