import { useState } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { icons } from "../constants";

interface VideoCardProps {
  title: string;
  creator: string;
  avatar: string;
  thumbnail: string;
  video: string;
}

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const VideoCard: React.FC<VideoCardProps> = ({ title, creator, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState(false);

  // Initialize video player
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
  });

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      {/* Header */}
      <View className="flex flex-row gap-3 items-center w-full">
        <View className="w-12 h-12 rounded-lg border border-gray-300 flex justify-center items-center">
          <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode="cover" />
        </View>

        <View className="flex flex-1 justify-center">
          <Text className="text-white font-semibold text-sm" numberOfLines={1}>{title}</Text>
          <Text className="text-gray-400 text-xs" numberOfLines={1}>{creator}</Text>
        </View>

        <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
      </View>

      {/* Video or Thumbnail */}
      {play ? (
        <VideoView
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          style={styles.video}
          
        />
      ) : (
        <TouchableOpacity activeOpacity={0.7} onPress={() => setPlay(true)} className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center">
          <Image source={{ uri: thumbnail }} className="w-full h-full rounded-xl" resizeMode="cover" />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 240,
    borderRadius: 10,
    marginTop: 10,
  },
});
