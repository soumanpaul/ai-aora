import { FormField } from "@/components";
import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VideoView, useVideoPlayer } from "expo-video"; // Import the correct component from expo-av
import { icons } from "@/constants";

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const Create = () => {
  const [uploading, setUploading] = React.useState(false);
  const [form, setForm] = React.useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });
  const [play, setPlay] = React.useState(false);

  // Initialize video player
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
  });

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catch title..."
          handleChangeText={(text) => setForm({ ...form, title: text })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-psemibold">
            Upload Video
          </Text>
          <TouchableOpacity>
            {form.video ? (
              <VideoView player={player} className="w-full h-64 rounded-2xl" />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Thumbnail
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Create;
