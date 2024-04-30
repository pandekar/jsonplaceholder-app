import * as React from 'react';
import { Link, useParams } from 'react-router-dom'
import { BiArrowBack } from "react-icons/bi";

import { useGetAlbumPhotosByAlbumIdQuery } from '../../redux/jsonplaceholderApi';

export default function UserDetailAlbum() {
  const params = useParams();
  const { data: photos, isFetching: isFetchingPhotos } = useGetAlbumPhotosByAlbumIdQuery(params.albumId)

  return (
    <div className='container p-2'>
      <Link to={`/users/${params.id}`}>
        <div className='flex flex-row items-center gap-2 mb-8 text-xl'>
          <BiArrowBack /> Back to user's detail
        </div>
      </Link>

      <div className='mb-10'>
        <span className='text-3xl'>user's album detail</span>
      </div>
      { isFetchingPhotos ? 
        <div>loading...</div> :
        <div className='grid grid-cols-6 gap-2'>
          {photos.map(photo => {
            return (
              <div key={photo.id} className='flex flex-row'>
                <Link to={`photo/${photo.id}?title=${encodeURIComponent(photo.title)}&url=${encodeURIComponent(photo.url)}`}>
                  <img src={photo.thumbnailUrl} alt='thumbnail' />
                </Link>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
};
