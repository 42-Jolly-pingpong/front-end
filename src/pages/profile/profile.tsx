import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserDTO from './userDto';
import userData from './Mock-up/userData';

function Profile() {
  const [userInfo, setUserInfo] = useState<UserDTO>();
  const user_idx = useParams().user_idx!;
  const idx: number = parseInt(user_idx, 10);
  const getUserInfo = async () => {
    setUserInfo(userData[idx]);
  };
  useEffect(() => {
    getUserInfo();
    console.log(userInfo);
  }, []);
  return (
    <div className='flex'>
      <div className='container mx-auto mt-52 mb-{60} '>
        <div>
          <div className=' bg-zinc-200 flex shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto'>
            <div className='flex justify-center'>
              <img
                src={userInfo?.avatar_path}
                alt=''
                className='rounded-full mx-auto absolute -top-20 w-48 h-48 shadow-md border-4 border-black transition duration-200 hover:scale-110'
              ></img>
            </div>
            <div className='mt-40'>
              <div className='ml-16'>
                <div className='flex'>
                  <span className='w-28'>ID</span>
                  <span className='ml-3 mb-3 w-10'>:</span>
                  <span>{userInfo?.intra_id}</span>
                </div>
                <div className='flex'>
                  <span className='w-28'>E_MAIL</span>
                  <span className='ml-3 mb-3 w-10'>:</span>
                  <span>{userInfo?.e_mail}</span>
                </div>
                <div className='flex'>
                  <span className='w-28'>NICKNAME</span>
                  <span className='ml-3 mb-3 w-10'>:</span>
                  <span>{userInfo?.nickname}</span>
                </div>
                <div className='flex'>
                  <span className=' w-28'>WIN RATE</span>
                  <span className='ml-3 mb-3 w-10'>:</span>
                  <span>{userInfo?.win_rate}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
