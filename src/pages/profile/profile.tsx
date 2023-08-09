import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



function Profile() {
  // const [userInfo, setUserInfo] = useState([]);
  const { user_idx } = useParams();
  const getUserInfo = async (params:userInfo) => {
    
  }
  useEffect(() => {
    getUserInfo()
  }, []);
  return (
    <div>
      <h1 className='text-blue-500 text-xl font-bold'>Profile</h1>
    </div>
  );
}

export default Profile;
