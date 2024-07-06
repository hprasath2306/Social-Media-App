import { Image, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../providers/AuthProvider";
import { Cloudinary } from "@cloudinary/url-gen";
import { uploadImage } from "../../lib/cloudinary";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dat8pcpqz",
  },
});

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");

  const user = useAuth();

  useEffect(() => {
    const fetchUsername = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("username,avatar_url")
        .eq("id", user.user?.id);

      if (error) {
        console.error("Error fetching username:", error);
      } else if (data && data.length > 0) {
        setUsername(data[0].username);
        setImage(cld.image(data[0].avatar_url).toURL());
      }
    };

    fetchUsername();
  }, []);

  const updateDetails = async () => {
    if (image) {
      const response = await uploadImage(image);
      const { data, error } = await supabase
        .from("profiles")
        .update({ username: username, avatar_url: response?.public_id })
        .eq("id", user.user?.id)
        .select();

      if (error) {
        console.error("Error updating profile:", error);
      } else {
        console.log("Profile updated:", data);
      }
    } else {
      return;
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="p-3 flex-1">
      <Image
        source={{
          uri: image || "https://i.sstatic.net/l60Hf.png",
        }}
        className="w-52 aspect-square rounded-full self-center bg-slate-300"
      />
      <Text
        onPress={pickImage}
        className="text-blue-500 font-semibold m-5 self-center"
      >
        Change
      </Text>

      <Text className="mb-2 text-gray-400 font-semibold">Username</Text>
      <TextInput
        placeholder="Username"
        className="border border-gray-300 p-3 rounded-md"
        value={username}
        onChangeText={setUsername}
      />

      <View className="gap-2 mt-5">
        <Button title="Update profile" onPress={updateDetails} />
        <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
}
