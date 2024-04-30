import * as React from 'react'
import { useLocation, Link, useParams } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";

export default function UserDetailAlbumPhoto() {
  const params = useParams();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const title = urlParams.get('title');
  const imageUrl = urlParams.get('url')

  return (
    <div className='p-2'>
      <Link to={`/users/${params.id}/album/${params.albumId}`}>
        <div className='flex flex-row items-center gap-2 mb-8 text-xl'>
          <BiArrowBack /> Back to user's album detail
        </div>
      </Link>

      <div className='mb-10'>
       <span className='text-3xl'>{title}</span>
      </div>

      <img src={imageUrl} alt='album' />
    </div>
  )
}