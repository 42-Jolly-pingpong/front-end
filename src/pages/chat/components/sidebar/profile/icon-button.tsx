import { Button } from 'flowbite-react';

const IconButton = (props: {
	icon: JSX.Element;
	label: string;
	onClickEvent: React.MouseEventHandler<HTMLButtonElement>;
	disabled: boolean;
}) => {
	const { icon, label, onClickEvent, disabled } = props;

	return (
		<div className='mr-2.5 mb-4'>
			<Button
				color='light'
				size='sm'
				onClick={onClickEvent}
				disabled={disabled}
			>
				<div className='flex items-center font-normal text-gray-600'>
					{icon}
					<div className='ml-2 text-xs font-medium'>{label}</div>
				</div>
			</Button>
		</div>
	);
};

export default IconButton;
