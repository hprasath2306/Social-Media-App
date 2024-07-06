import { FlatList } from "react-native";
import PostListItem from "../../components/PostListItem";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function FeedScreen() {
  
  const [posts, setPosts] = useState<null | any[]>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    let { data, error } = await supabase.from("posts").select("*, user:profiles(*)");
    if(error) {
      console.error(error);
    }else{
        setPosts(data);
    }
  };

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      contentContainerStyle={{ gap: 10, maxWidth: 512, width: "100%" }}
      showsVerticalScrollIndicator={false}
    />
  );
}
