const UserImg = (props: { src: string; size: number }) => {
	return (
		<div className={`w-${props.size} h-${props.size} overflow-hidden`}>
			<img src={props.src} className='object-cover w-full h-full rounded-md' />
		</div>
	);
};

export default UserImg;
