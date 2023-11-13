import { Spinner } from 'flowbite-react';

interface TimeSpinnerProps {
	seconds: number;
}

const TimeSpinner: React.FC<TimeSpinnerProps> = ({ seconds }) => {
	return (
		<div className='relative'>
			<Spinner className='w-24 h-24 fill-yellow-300' />
			<div className='absolute my-8 top-0 left-0 right-0 bottom-0 text-2xl font-bold'>
				{seconds}
			</div>
		</div>
	);
};

export default TimeSpinner;
