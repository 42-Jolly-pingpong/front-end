import React, { ReactNode } from 'react';

interface ButtonProps {
	icon?: ReactNode;
	message: string;
	onClick?: () => void;
}

const GameCustomButton: React.FC<ButtonProps> = ({
	icon,
	message,
	onClick,
}) => {
	return (
		<button
			className={`px-5 py-2.5 rounded-lg border border-yellow-400 hover:bg-gray-500 justify-center items-center gap-2 flex ${
				!onClick ? 'cursor-not-allowed' : ''
			}`}
			onClick={onClick}
			disabled={!onClick}
		>
			{icon}
			<div className='text-yellow-400 text-sm font-medium'>{message}</div>
		</button>
	);
};
export default GameCustomButton;
