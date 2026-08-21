import React from 'react';
import img2 from '../../assets/avatar55.webp';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function CreateCardForFollowers({ Suggestions }) {
  const queryClient = useQueryClient();

  function makeFollowAndUnFollow(userId) {
    return axios.put(
      `https://route-posts.routemisr.com/users/${userId}/follow`,
      {},
      {
        headers: {
          token: localStorage.getItem('token'),
        },
      }
    );
  }

  const { mutate: FuncOfFollowing, isPending } = useMutation({
    mutationFn: makeFollowAndUnFollow,
    onSuccess: () => {
      toast.success('Following updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['GetTheProfileOfUser'] });
      queryClient.invalidateQueries({queryKey : ['getAllPosts']})
    },
    onError: () => {
      toast.error('Something went wrong, try again...');
    },
  });

  return (
    <div className='relative parent'>
      {Suggestions?.map((item, index) => (
        <div
          key={item._id || index}
          className={`bg-white py-5 my-4 dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-sm w-[300px] transition-all hover:shadow-indigo-500/50 dark:hover:shadow-blue-900/50 ${
            item._id !== index ? 'following' : ''
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={item.photo || img2}
                alt="User Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-sky-500 circle dark:border-blue-900 transition-transform hover:scale-110"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white callColor">
                {item.name}
              </h2>
              <p className="text-indigo-800 dark:text-blue-400 callColor">
                {item.role || "Product Designer"}
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button
              disabled={isPending}
              onClick={() => FuncOfFollowing(item._id)}
              className="bg-sky-500 cursor-pointer hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-gray-800 disabled:opacity-50"
            >
              {isPending ? 'Loading...' : 'Follow'}
            </button>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              <span className="font-semibold callColor">
                {item.followersCount ?? "1.2k"} Followers
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}