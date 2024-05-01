import * as React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { BiReply } from "react-icons/bi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useGetPostCommentsByIdQuery } from '../../redux/jsonplaceholderApi';

export default function UserDetailPost() {
  const params = useParams();
  const { state: { user, post } } = useLocation();
  const { name, email } = user;
  const { title, body } = post;
  const { data: comments, isFetching: isFetchingComments } = useGetPostCommentsByIdQuery(params.postId);

  return (
    <div className='p-2'>
      <Link to={`/users/${params.id}`}>
        <div className='flex flex-row items-center gap-2 mb-8 text-xl'>
          <BiArrowBack /> Back to user's detail
        </div>
      </Link>

      <div className='border rounded-md p-2'>
        <div className='flex flex-row items-center gap-2 mb-1'>
          <IoPersonCircleOutline className='text-6xl' />
          <div className='flex flex-col'>
            <span className='text-3xl'>{name}</span>
            <span>{email}</span>
          </div>
        </div>

        <div className='flex flex-col mb-10'>
          <span className='text-3xl'>{title}</span>
          <span className='text-xl'>{body}</span>
        </div> 
        { !isFetchingComments ?
          <div>
            {comments.map((comment, index) => {
              return (
                <div key={index} className='flex flex-row mb-2 border-b'>
                  <BiReply className='text-4xl rotate-180' />
                  <div className='flex flex-col'>
                    <span className='text-2xl'>{comment.name}</span>
                    <span>{comment.email}</span>
                    <div className='mt-2 text-xl'>
                      <span>{comment.body}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div> :
          <div>Loading comments...</div>
        }
      </div>
    </div>
  )
};
