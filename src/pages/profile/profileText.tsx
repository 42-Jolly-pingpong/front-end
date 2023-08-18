function ProfileText(props: any) {
	return (
		<div className='flex text-center'>
			<span className=' w-28'>{props.item}</span>
			<span className='ml-3 mb-3 w-10'>:</span>
			<span>{props.value}</span>
		</div>
	);
}

export default ProfileText;
