import { useNavigate } from 'react-router-dom';

const Page404 = () => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<div className='flex flex-col text-center justify-center h-screen'>
			<div className='text-6xl font-extrabold'>404 Error</div>
			<div className='py-6 text-xl text-gray-500 leading-7'>
				요청하신 페이지를 찾을 수 없습니다.
				<br />
				입력하신 주소가 정확한지 다시 한번 확인해주세요.
			</div>
			<div
				className='text-xl text-blue-500 hover:cursor-pointer'
				onClick={handleBack}
			>
				이전 페이지로 돌아가기
			</div>
		</div>
	);
};

export default Page404;
