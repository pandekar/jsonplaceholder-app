import * as React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { BiReply } from "react-icons/bi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { TbMessageDots } from "react-icons/tb";
import { useGetPostCommentsByIdQuery, usePostCommentMutation } from '../../redux/jsonplaceholderApi';
import { HiPencil } from "react-icons/hi2";

export default function UserDetailPost() {
  const params = useParams();
  const { postId } = params
  const { state: { user, post } } = useLocation();
  const { name, email } = user;
  const { title, body } = post;
  const { data: comments, isFetching: isFetchingComments } = useGetPostCommentsByIdQuery(params.postId);
  const [postComment] = usePostCommentMutation();

  const [localComments, setLocalComments] = React.useState([])
  const [commentId, setCommentId] = React.useState(null);

  React.useEffect(() => {
    if (comments) {
      setLocalComments(comments)
    }
  }, [comments])

  const [form, setForm] = React.useState({
    name: '',
    email: '',
    body: ''
  });

  const [placeholder, setPlaceholder] = React.useState({
    name: '',
    email: '',
    body: ''
  });

  const addReply = () => {
    setForm(prev => ({
      ...prev,
      name: '',
      email: '',
      body: ''
    }));
    window.add.showModal()
  }

  const submitReply = () => {
    const data = {
      postId,
      name: form?.name,
      email: form?.email,
      body: form?.body
    }

    postComment({...data})
      .then((response) => {
        const newComment = response.data;
        const newComments = [
          ...localComments,
          newComment
        ]
        setLocalComments(newComments)
      })

    setForm(prev => ({
      ...prev,
      name: '',
      email: '',
      body: ''
    }));
  }

  const showCommentEditable = (selectedId) => {
    setCommentId(selectedId);
    const commentIndex = localComments.findIndex((comment) => comment.id === selectedId)
    const commentEditTargetObject = localComments[commentIndex]
    setPlaceholder(prev => ({
      ...prev,
      name: commentEditTargetObject.name,
      email: commentEditTargetObject.email,
      body: commentEditTargetObject.body
    }))
    window.edit.showModal()
  }

  const submitUpdateReply = () => {
    const data = {
      commentId: commentId,
      postId: postId,
      name: form?.name ? form.name : placeholder.name,
      email: form?.email ? form.email : placeholder.email,
      body: form?.body ? form.body : placeholder.body
    }

    // update local data
    const commentIndex = localComments.findIndex(comment => comment.id === commentId)
    const newComments = [...localComments]
    newComments[commentIndex] = {
      ...localComments[commentIndex],
      name: data.name,
      email: data.email,
      body: data.body
    }
    setLocalComments(newComments)
    
    setForm(prev => ({
      ...prev,
      name: '',
      email: '',
      body: ''
    }));

    setPlaceholder(prev => ({
      ...prev,
      name: '',
      email: '',
      body: ''
    }))
  }

  return (
    <div className='p-2'>
      <Link to={`/users/${params.id}`}>
        <div className='flex flex-row items-center gap-2 mb-8 text-xl'>
          <BiArrowBack /> Back to user's detail
        </div>
      </Link>

      <div className='border rounded-md p-2'>

        <div className='flex flex-row justify-start gap-2 mb-1'>
          <div>
            <IoPersonCircleOutline className='text-6xl' />
          </div>
          <div className='flex flex-col'>
            <span className='text-3xl'>{name}</span>
            <span>{email}</span>
            <span className='text-3xl'>{title}</span>
            <span className='text-xl'>{body}</span>
            <div
              className='flex flex-row mt-2 mr-4 items-center gap-2'
              onClick={() => addReply()}
            >
              <span className='text-2xl'>reply</span>
              <TbMessageDots className='text-3xl' />
            </div>
          </div>
        </div>

        { !isFetchingComments ?
          <div className='ml-16 mt-3'>
            {localComments.map((comment, index) => {
              return (
                <div key={index} className='flex flex-row mb-2 border-b gap-1'>
                  <div>
                    <BiReply className='text-4xl rotate-180' />
                  </div>
                  <div>
                    <IoPersonCircleOutline className='text-6xl' />
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-2xl'>{comment.name}</span>
                    <span>{comment.email}</span>
                    <div className='mt-2 text-xl'>
                      <span>{comment.body}</span>
                    </div>
                    <div className='p-2'>
                      <div
                        className='flex items-center justify-center border border-blue-500 rounded-md bg-blue-300 hover:bg-blue-500 p-2 w-8'
                        onClick={() => showCommentEditable(comment.id)}
                      >
                        <HiPencil className='text-white' />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div> :
          <div>Loading comments...</div>
        }
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
          <h3 className="text-lg font-bold">Reply</h3>
          <div className="mt-5">
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="py-4 font-semibold">Name</h4>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full p-2"
                  onChange={(e) =>
                    setForm(prev => ({
                      ...prev,
                      name: e.target.value
                    }))
                  }
                  value={form?.name}
                />
              </div>
              <div>
                <h4 className="py-4 font-semibold">Email</h4>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full input input-bordered p-2"
                  onChange={(e) =>
                    setForm(prev => ({
                      ...prev,
                      email: e.target.value
                    }))
                  }
                  value={form?.email}
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
                    setForm(prev => ({
                      ...prev,
                      body: e.target.value
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
              onClick={submitReply}
            >
              SEND
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
          <h3 className="text-lg font-bold">Edit reply</h3>
          <div className="mt-5">
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="py-4 font-semibold">Name</h4>
                <input
                  type="text"
                  name="name"
                  placeholder={placeholder.name}
                  className="w-full p-2"
                  onChange={(e) =>
                    setForm(prev => ({
                      ...prev,
                      name: e.target.value
                    }))
                  }
                  value={form?.name}
                />
              </div>
              <div>
                <h4 className="py-4 font-semibold">Email</h4>
                <input
                  type="email"
                  name="email"
                  placeholder={placeholder.email}
                  className="w-full input input-bordered p-2"
                  onChange={(e) =>
                    setForm(prev => ({
                      ...prev,
                      email: e.target.value
                    }))
                  }
                  value={form?.email}
                />
              </div>
              <div>
                <h4 className="py-4 font-semibold">Body</h4>
                <input
                  type="text"
                  name="body"
                  placeholder={placeholder.body}
                  className="w-full input input-bordered p-2"
                  onChange={(e) =>
                    setForm(prev => ({
                      ...prev,
                      body: e.target.value
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
              onClick={submitUpdateReply}
            >
              UPDATE
            </button>
          </div>
        </form>
      </dialog>
      {/* edit */}
    </div>
  )
};
