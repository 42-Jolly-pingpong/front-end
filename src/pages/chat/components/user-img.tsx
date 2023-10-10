const UserImg = (props: { src: string; size: string | number }) => {
	return (
		<div className={`h-${props.size} w-${props.size} overflow-hidden`}>
			<img src={props.src} className='object-cover w-full h-full rounded-md' />
		</div>
	);
};

export default UserImg;
