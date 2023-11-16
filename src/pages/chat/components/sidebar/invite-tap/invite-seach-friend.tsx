import { TextInput } from 'flowbite-react';
import { BiSearch } from 'react-icons/bi';

const InviteSearchFriend = (props: {
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const { input, setInput } = props;

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	return (
		<div className='p-4 border-b'>
			<TextInput
				icon={BiSearch}
				value={input}
				placeholder='멤버 추가하기'
				onChange={onChangeInput}
			/>
		</div>
	);
};

export default InviteSearchFriend;
