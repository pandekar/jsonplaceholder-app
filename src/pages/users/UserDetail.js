import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";

import {
  useGetUserByIdQuery,
  useGetPostByUserIdQuery,
  useGetAlbumsByUserIdQuery
} from '../../redux/jsonplaceholderApi';

export default function UserDetail() {
  const { id: userId } = useParams();
  const { data: user, isFetching: isFetchingUser } = useGetUserByIdQuery(userId)
  const { data: userPosts, isFetching: isFetchingUserPosts } = useGetPostByUserIdQuery(userId)
  const { data: userAlbums, isFetching: isFetchingUserAlbums } = useGetAlbumsByUserIdQuery(userId)

  return (
    <div className='p-2'>

      <Link to='/'>
        <div className='flex flex-row items-center gap-2 mb-8 text-xl'>
          <BiArrowBack /> Back
        </div>
      </Link>

      <div className='flex flex-col'>
        
        <div className='mb-10'>
          {isFetchingUser ?
            <div>Loading...</div> :
            <div className=''>
              <h1 className='text-3xl'>{user.name}</h1>
              <h4>{user.email}</h4>
            </div>
          }
        </div>

        <h1 className='text-3xl mb-3'>Posts</h1>
        <div className='flex border rounded-md p-2 mb-6'>
          {isFetchingUserPosts ?
            <div>Loading...</div> :
            <div>
              {userPosts.map((post, index) => {
                return (
                  <div key={index}>
                    <Link
                      to={`post/${post.id}`}
                      state={ user }
                    >
                      <div className='border-b p-1'>{post.title}</div>
                    </Link>
                  </div>
                );
              })}
            </div>
          }
        </div>

        <h1 className='text-3xl mb-3'>Albums</h1>
        <div className='flex border rounded-md p-2 mb-6'>
          {isFetchingUserAlbums ?
            <div>Loading...</div> :
            <div>
              {userAlbums.map((album, index) => {
                return (
                  <div key={index}>
                    <Link to={`album/${album.id}`}>
                      <div className='border-b p-1'>{album.title}</div>
                    </Link>
                  </div>
                )
              })}
            </div>
          }
        </div>
      </div>
    </div>
  )
}