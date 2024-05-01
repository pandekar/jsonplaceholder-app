import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";

import {
  useGetUserByIdQuery,
  useGetPostByUserIdQuery,
  useGetAlbumsByUserIdQuery,
  usePostPostMutation,
} from '../../redux/jsonplaceholderApi';

export default function UserDetail() {
  const { id: userId } = useParams();
  const { data: user, isFetching: isFetchingUser } = useGetUserByIdQuery(userId)
  const { data: userPosts, isFetching: isFetchingUserPosts } = useGetPostByUserIdQuery(userId)
  const { data: userAlbums, isFetching: isFetchingUserAlbums } = useGetAlbumsByUserIdQuery(userId)
  const [postPost] = usePostPostMutation();

  const [form, setForm] = React.useState({
    title: '',
    body: '',
    userId: '',
  });

  const [localUserPosts, setLocalUserPosts] = React.useState([]);

  React.useEffect(() => {
    if (userPosts) {
      setLocalUserPosts(userPosts)
    }
  }, [userPosts])

  const addPost = () => {
    setForm(prev => ({
      ...prev,
      title: '',
      body: '',
      userId: '',
    }));
    window.add.showModal();
  }

  const submitPost = () => {
    const data = {
      title: form?.title,
      body: form?.body,
      userId
    }

    postPost({...data})
      .then((response) => {
        const newData = response.data
        const newDatas = [
          ...localUserPosts,
          newData
        ]
        setLocalUserPosts(newDatas)
      })

    setForm(prev => ({
      ...prev,
      title: '',
      body: '',
      userId: '',
    }));
  }

  return (
    <div className='p-2'>
      {/* back navigation */}
      <Link to='/'>
        <div className='flex flex-row items-center gap-2 mb-8 text-xl'>
          <BiArrowBack /> Back
        </div>
      </Link>

      <div className='flex flex-col'>
        {/* user's identity */}
        <div className='mb-10'>
          {isFetchingUser ?
            <div>Loading...</div> :
            <div className=''>
              <h1 className='text-3xl'>{user.name}</h1>
              <h4>{user.email}</h4>
            </div>
          }
        </div>
        {/* posts */}
        <div className='flex flex-row gap-2 mb-3'>
          <h1 className='text-3xl'>Posts</h1>
          <button
            className='flex flex-row items-center justify-center border border-gray-950 rounded-md hover:bg-black hover:text-white w-10'
            onClick={addPost}
          >
            <FaPlus className='text-2xl' />
          </button>
        </div>
        <div className='flex border rounded-md p-2 mb-6'>
          {isFetchingUserPosts ?
            <div>Loading...</div> :
            <div>
              {localUserPosts.length && localUserPosts.map((post, index) => {
                return (
                  <div key={index}>
                    <Link
                      to={`post/${post.id}`}
                      state={{user, post}}
                    >
                      <div className='border-b p-1'>{post.title}</div>
                    </Link>
                  </div>
                );
              })}
            </div>
          }
        </div>
        {/* albums */}
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

      {/* add */}
      <dialog id="add" className='w-1/2 p-4 rounded-lg'>
        <form method="dialog">
          <button
            htmlFor="add"
            className="absolute right-4 top-4"
          >
            ✕
          </button>
          <h3 className="text-lg font-bold">Add New Post</h3>
          <div className="mt-5">
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="py-4 font-semibold">Title</h4>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="w-full p-2"
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  value={form?.title}
                />
              </div>
              <div>
                <h4 className="py-4 font-semibold">Body</h4>
                <input
                  type="text"
                  name="body"
                  placeholder="Body"
                  className="w-full input input-bordered p-2"
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      body: e.target.value,
                    }))
                  }
                  value={form?.body}
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-row-reverse">
            <button
              className='flex flex-row items-center justify-center border border-gray-950 rounded-md hover:bg-black hover:text-white p-2'
              onClick={submitPost}
            >
              Add Contact
            </button>
          </div>
        </form>
      </dialog>
      {/* add */}
    </div>
  )
}