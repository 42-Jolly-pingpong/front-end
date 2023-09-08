import { Link, Navigate } from 'react-router-dom';
import { User } from 'ts/interfaces/user.model';

const HeaderProfileIcon: React.FC<User> = (props) => {
	const handleLogout = () => {
		localStorage.removeItem('jwtToken');
		console.log('hi');
		return <Link to='/' />;
	};

	return (
		<div className='dropdown dropdown-end'>
			<button className='avatar online' tabIndex={0}>
				<div className='avatar'>
					<div className='w-16 rounded-full'>
						<img src={props.avatarPath} alt='Avatar' />
					</div>
				</div>
			</button>
			<ul
				tabIndex={0}
				className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
			>
				<li>
					<Link to={`/profile/${props.idx}`}>SHOW PROFILE</Link>
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
