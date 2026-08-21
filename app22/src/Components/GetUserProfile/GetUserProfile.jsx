import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

export default function GetUserProfile() {
  const { id } = useParams();
  const query = useQueryClient();
  const { userData } = useContext(AuthContext);

  // 1. Fetch User Profile
  function getUserProfile() {
    return axios.get(`https://route-posts.routemisr.com/users/${id}/profile`, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['GetTheProfileOfUser', id],
    queryFn: getUserProfile,
  });

  // 2. Follow / Unfollow Mutation Function
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
      query.invalidateQueries({ queryKey: ['GetTheProfileOfUser', id] });
    },
    onError: () => {
      toast.error('Something went wrong, try again...');
    },
  });

  const user = data?.data?.data?.user;

  if (isLoading) return <div className="text-center p-10">Loading profile...</div>;
  if (isError) return <div className="text-center p-10 text-red-500">Failed to load profile.</div>;

  return (
    <div className="flex  items-center justify-center min-h-screen p-4 bg-gray-200">
      <div className="max-w-md UserProfile w-full bg-white rounded-2xl overflow-hidden shadow-lg">
        <div className="h-32 UserProfileHx bg-gradient-to-r from-purple-400 to-sky-600 relative">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <img className="h-24 w-24 rounded-full border-4 border-white object-cover" src={user?.photo} alt="Profile picture" />
          </div>
        </div>

        <div className="pt-16 pb-8 px-6 text-center">
          <h3 className="text-xl font-bold text-gray-800">{user?.name}</h3>
          <p className="text-indigo-600 font-medium">Senior Product Designer</p>
          <p className="text-gray-500 mt-2">{user?.email}</p>
          <p className="py-2 font-bold text-gray-500">Gender: {user?.gender}</p>

          <div className="flex justify-center space-x-6 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{user?.followers?.length || 0}</p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{user?.following?.length || 0}</p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-3">
            {userData?.id !== user?._id && (
              <button
                disabled={isPending}
                onClick={() => FuncOfFollowing(id)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out disabled:opacity-50"
              >
                {isPending ? 'Updating...' : 'Follow'}
              </button>
            )}
            <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}