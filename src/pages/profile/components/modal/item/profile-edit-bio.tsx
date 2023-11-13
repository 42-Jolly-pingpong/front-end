import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Textarea } from 'flowbite-react';
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
		<div className='flex gap-5'>
			<div className='font-bold text-sm w-16'>소개글</div>
			<div className='flex flex-col w-full gap-3'>
				<Textarea
					placeholder={user?.bio || '여기에 본인을 설명해주세요!'}
					rows={6}
					value={bio}
					onChange={handleInputChange}
					className='w-full'
				/>
				<div className='flex text-xs text-gray-500'>{bio.length}/150</div>
			</div>
		</div>
	);
};

export default ProfileEditBio;
