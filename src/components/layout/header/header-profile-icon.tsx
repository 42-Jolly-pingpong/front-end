import { Link } from 'react-router-dom';

interface HeaderProfileIconProps {
	src: string;
}

const HeaderProfileIcon: React.FC<HeaderProfileIconProps> = ({ src }) => {
	return (
		<div className='avatar online layout-icon'>
			<div className='rounded-full'>
				<Link to='/profile'>
					<img src={src} />
				</Link>
			</div>
		</div>
	);
};

export default HeaderProfileIcon;
