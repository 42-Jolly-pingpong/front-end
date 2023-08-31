import { User } from 'ts/interfaces/user.model';

const AnswerButton = (user: User) => {
	const onClickAccept = () => {
		//
	};

	const onClickUnaccept = () => {
		//
	};

	return (
		<div className='join'>
			<button className='btn btn-sm join-item' onClick={onClickAccept}>
				Y
			</button>
			<button className='btn btn-sm join-item' onClick={onClickUnaccept}>
				N
			</button>
		</div>
	);
};

export default AnswerButton;
