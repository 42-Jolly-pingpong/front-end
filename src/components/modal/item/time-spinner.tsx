import { Spinner } from 'flowbite-react';

interface TimeSpinnerProps {
	seconds: number;
}

const TimeSpinner: React.FC<TimeSpinnerProps> = ({ seconds }) => {
	return (
		<>
			<Spinner className='w-20 h-20 fill-yellow-300' />
			<div className='absolute my-8 top-16 left-0 right-0 bottom-0 text-2xl font-bold'>
				{seconds}
			</div>
		</>
	);
};

export default TimeSpinner;
