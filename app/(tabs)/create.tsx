import { CustomButton, FormField } from "@/components";
import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VideoView, useVideoPlayer } from "expo-video"; // Import the correct component from expo-av
import { icons } from "@/constants";
import * as DocumentPicker from "expo-document-picker";
import { DocumentPickerAsset } from "expo-document-picker";
import { router } from "expo-router";
import { createVideoPost } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const videoSource = "file:///data/user/0/host.exp.exponent/cache/DocumentPicker/296d4da9-d0cf-4e84-82b0-e8540670b885.mp4"
  // "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = React.useState(false);

  const [form, setForm] = React.useState({
    title: "",
    video: null as DocumentPickerAsset | null,
    thumbnail: null as DocumentPickerAsset | null,
    prompt: "",
  });
  const [play, setPlay] = React.useState(false);

  // Initialize video player
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
  });

  const openPicker = async (selectType: string) => {
    // Add logic to open image or video picker
    // and set the form state accordingly
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === "video" ? ["video/*"] : ["image/*"],
    });

    console.log(result);

    if (!result.canceled) {
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
        console.log("video", result.assets[0]);
      } else {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Error", "No file selected", [{ text: "OK" }]);
      }, 100);
    }
  };

  const submit = async () => {

    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      Alert.alert("Error", "Please fill all fields", [{ text: "OK" }]);
      return;
    }

    setUploading(true);

    try {
      // Add logic to upload video to the server
      await createVideoPost({
        ...form, userId: user.id
      })

      Alert.alert("Success", "Video uploaded successfully", [{ text: "OK" }]);
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
    }
    setUploading(false);
  };
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
          <TouchableOpacity onPress={() => openPicker("video")}>
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

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={form.thumbnail}
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View
                className="w-full h-16 px-4 bg-black-100 rounded-2xl 
              justify-center items-center border-2 border-black-200 flex-row space-x-2"
              >
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-gray-100 font-pmedium">
                  Upload Thumbnail
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <FormField
            title="AI Prompt"
            value={form.prompt}
            placeholder="The prompt for the AI to generate a description..."
            handleChangeText={(text) => setForm({ ...form, prompt: text })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Submit & Publish"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={uploading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Create;
