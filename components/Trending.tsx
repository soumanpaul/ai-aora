import React, { useState } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from 'expo';
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  ViewabilityConfig,
  ViewToken,
  StyleSheet
} from "react-native";

import { icons } from "../constants";

interface Post {
  $id: string;
  video: string;
  thumbnail: string;
}

interface TrendingItemProps {
  activeItem: string;
  item: Post;
}

const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1 },
};

const zoomOut = {
  0: { scale: 1 },
  1: { scale: 0.9 },
};

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });


  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (  <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
        // <Video
        //   source={{ uri: item.video }}
        //   className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
        //   resizeMode={ResizeMode.CONTAIN}
        //   useNativeControls
        //   shouldPlay
        //   onPlaybackStatusUpdate={(status) => {
        //     if (status.didJustFinish) {
        //       setPlay(false);
        //     }
        //   }}
        // />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[18px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

interface TrendingProps {
  posts: Post[];
}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]?.$id || "");

  const viewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key as string);
    }
  };

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 70,
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      // contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;


const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});