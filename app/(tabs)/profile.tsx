import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";

import { icons, images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts, getUserPosts, searchPosts, signOut } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";
import { router, useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import InfoBox from "@/components/InfoBox";

interface Post {
  $id: string;
  title: string;
  thumbnail: string;
  video: string;
  creator: {
    username: string;
    avatar: string;
  };
}


const Profile = () => {
  // const { query } = useLocalSearchParams();
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const { data: posts, refetch } = useAppwrite(() =>getUserPosts(user.$id));
//   const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  console.log("data", posts)

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const logOut = async () => {
    setUser(null)
    setIsLoggedIn(false)
    router.push('/sign-in')
    await signOut()
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item?.title}
            thumbnail={item?.thumbnail}
            video={item?.video}
            creator={item?.creator?.username}
            avatar={item?.creator?.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4 ">
            <TouchableOpacity className="w-full items-end mb-10"
              onPress={logOut}
            >
              <Image 
                source={icons.logout} 
                resizeMode="contain" 
                className="w-6 h-6" 
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image className="w-[90%] h-[90%]" source={{ uri: user?.avatar }} resizeMode="cover" />
            </View>
            <InfoBox
              title={user?.username}
              containerStyle='mt-5'
              titleStyle="text-lg"
            />
            <View className="mt-5 flex-row">
            <InfoBox
              title={posts.length || 0}
              subtitle="Posts"
              containerStyle='mr-10'
              titleStyle="text-xl"
            />
            <InfoBox
              title="1.2k"
              subtitle="Followers"
              containerStyle=''
              titleStyle="text-xl"
            />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
