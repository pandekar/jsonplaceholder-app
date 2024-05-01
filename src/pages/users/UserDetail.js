import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";

import {
  useGetUserByIdQuery,
  useGetPostByUserIdQuery,
  useGetAlbumsByUserIdQuery,
  usePostPostMutation,
  usePutPostMutation,
  useGetPostByIdQuery,
  useDeletePostMutation,
} from '../../redux/jsonplaceholderApi';

export default function UserDetail() {
  const [postId, setPostId] = React.useState(null);

  const { id: userId } = useParams();
  const { data: user, isFetching: isFetchingUser } = useGetUserByIdQuery(userId)
  const { data: userPosts, isFetching: isFetchingUserPosts } = useGetPostByUserIdQuery(userId)
  const { data: userAlbums, isFetching: isFetchingUserAlbums } = useGetAlbumsByUserIdQuery(userId)
  const { data: post, refetch: refetchPost } = useGetPostByIdQuery(postId)
  
  const [postPost] = usePostPostMutation();
  const [putPost] = usePutPostMutation();
  const [deletePost] = useDeletePostMutation();

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

  const showDeleteModal = (id) => {
    setPostId(id);
    window.delete.showModal();
  };

  const showPostEditable = (id) => {
    setPostId(id);
    refetchPost()
    window.edit.showModal();
  };

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

  const updatePost = () => {
    const data = {
      id: postId,
      title: form?.title ? form.title : post.title,
      body: form?.body ? form.body : post.body,
      userId
    }

    putPost({...data})
      .then((response) => {
        const newUpdateData = response.data
        const postIndex = localUserPosts.findIndex((post) => post.id === newUpdateData.id)
        const newPostsLocalData = [...localUserPosts]
        newPostsLocalData[postIndex] = newUpdateData
        setLocalUserPosts(newPostsLocalData)
      })

    setForm(prev => ({
      ...prev,
      title: '',
      body: '',
      userId: '',
    }));
  }

  const destroyPost = (postId) => {
    deletePost(postId)
    const newPostsLocalData = localUserPosts.filter((post) => post.id !== postId)
    setLocalUserPosts(newPostsLocalData)
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
          {isFetchingUserPosts || !localUserPosts.length ?
            <div>Loading...</div> :
            <div className='p-2 overflow-x-auto'>
              <table className='table'>
                <thead className="text-sm">
                <tr>
                  <th className="text-center">Title</th>
                  <th className="text-center">Body</th>
                  <th className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                  {localUserPosts.map((post, index) => {
                    return (
                      <tr key={index}>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                        <td className='flex flex-row justify-center gap-1'>
                          <div className='border border-gray-950 rounded-md hover:bg-black hover:text-white px-2 font-bold'>
                            <Link
                              to={`post/${post.id}`}
                              state={{user, post}}
                            >
                              DETAIL
                            </Link>
                          </div>
                          <div className='border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white px-2 font-bold'>
                            <button
                              name='edit'
                              onClick={() => showPostEditable(post.id)}
                            >
                              EDIT
                            </button>
                          </div>
                          <div className='border border-red-500 rounded-md hover:bg-red-500 hover:text-white px-2 font-bold'>
                            <button
                              name='delete'
                              onClick={() => showDeleteModal(post.id)}
                            >
                              DELETE
                            </button>
                          </div>
                        </td>
                      </tr>
                      )
                    })
                  }
                </tbody>
              </table>
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
              Add Post
            </button>
          </div>
        </form>
      </dialog>
      {/* add */}

      {/* edit */}
      <dialog id="edit" className='w-1/2 p-4 rounded-lg'>
        <form method="dialog">
          <button
            htmlFor="edit"
            className="absolute right-4 top-4"
          >
            ✕
          </button>
          <h3 className="text-lg font-bold">Edit Post</h3>
          <div className="mt-5">
            <div className="flex flex-col gap-8">
              <div>
                <small className="text-xs font-semibold text-red-500">
                  Nb: Fill in the form if you want to make a change
                </small>
                <h4 className="py-4 font-semibold">Title</h4>
                <input
                  type="text"
                  name="title"
                  placeholder={post?.title}
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
                  placeholder={post?.body}
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
              onClick={updatePost}
            >
              Update Post
            </button>
          </div>
        </form>
      </dialog>
      {/* edit */}

      {/* delete */}
      <dialog id="delete" className="w-1/3 p-4 rounded-lg">
        <form method="dialog">
          <h3 className="text-lg font-bold">Delete Post</h3>
          <p className="py-4">Are you sure to delete this post?</p>
          <div className="flex flex-row gap-2">
            {/* if there is a button in form, it will close the modal */}
            <button
              className='flex flex-row items-center justify-center border border-red-300 bg-red-300 rounded-md hover:bg-red-500 hover:text-white p-2 w-28'
              onClick={() => destroyPost(postId)}
            >
              yes, delete
            </button>
            <button
              className='flex flex-row items-center justify-center border border-blue-300 bg-blue-300 rounded-md hover:bg-blue-500 hover:text-white p-2 w-28'
            >
              cancel
            </button>
          </div>
        </form>
      </dialog>
      {/* delete */}
    </div>
  )
}