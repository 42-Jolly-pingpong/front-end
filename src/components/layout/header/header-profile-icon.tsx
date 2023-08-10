import { Link, Navigate } from 'react-router-dom';

interface HeaderProfileIconProps {
	src: string;
}

const HeaderProfileIcon: React.FC<HeaderProfileIconProps> = ({ src }) => {
	const handleLogout = () => {
		localStorage.removeItem('jwtToken');
		console.log('hi');
		return <Link to='/' />;
	};

	return (
		<div className='dropdown dropdown-end'>
			<label tabIndex={0} className='btn m-1'>
				<button className='avatar online layout-icon' tabIndex={0}>
					<img src={src} alt='Avatar' className='rounded-full' />
				</button>
			</label>
			<ul
				tabIndex={0}
				className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
			>
				<li>
					<Link to='/profile'>SHOW PROFILE</Link>
				</li>
				<li>
					<Link to='/'>LOGOUT</Link>
					{/*<button onClick={handleLogout}> LOGOUT </button>*/}
				</li>
			</ul>
		</div>
	);
};

export default HeaderProfileIcon;
