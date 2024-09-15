  "use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Profile
      name={capitalizeFirstLetter(userName)}
      desc={`Welcome to ${capitalizeFirstLetter(userName)}'s personalized profile page. Explore ${capitalizeFirstLetter(userName)}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
      // handleDelete={false}
      // handleEdit={false}
    />
  );
};

export default UserProfile;
