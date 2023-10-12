import { Sidebar } from 'flowbite-react';
import { useRecoilValue } from 'recoil';
import { sidebarSelector } from 'ts/states/sidebar-state';

const Section = (props: { section: JSX.Element }) => {
	const sidebarState = useRecoilValue(sidebarSelector);

	return (
		<div>
			<div>{props.section}</div>
			{sidebarState ? <Sidebar /> : null}
		</div>
	);
};

export default Section;

//const Section = (props: { section: JSX.Element }) => {
//	const sidebarState = useRecoilValue(sidebarSelector);

//	return (
//		<div className='flex w-full h-full'>
//			<div className='flex flex-col flex-grow justify-center items-center'>
//				{props.section}
//			</div>
//			{sidebarState ? <Sidebar /> : null}
//			<Snackbar />
//		</div>
//	);
//}; //임시
