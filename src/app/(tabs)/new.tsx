import { Text, View, Image, TextInput, Pressable, ToastAndroid } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Button from "../../components/Button";
import { uploadImage } from "../../lib/cloudinary";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../providers/AuthProvider";
import { useRouter } from "expo-router";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const router = useRouter();

  const { session } = useAuth();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const createPost = async () => {
    if (!image) {
      ToastAndroid.show("Please select an image", ToastAndroid.SHORT);
      return;
    }if (!caption) {
      ToastAndroid.show("Please enter a caption", ToastAndroid.SHORT);
      return;
    }
    const response = await uploadImage(image);

    const { data, error } = await supabase
      .from("posts")
      .insert([
        { caption, image: response?.public_id, user_id: session?.user.id },
      ])
      .select();

      console.log(data)

      router.push("/(tabs)");
  };

  return (
    <View className="p-3 items-center flex-1">
      <Image
        source={{
          uri:
            image ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Grey_background.jpg/1200px-Grey_background.jpg",
        }}
        className="w-52 aspect-[3/4] rounded-lg bg-slate-300"
      />
      <Text onPress={pickImage} className="text-blue-500 font-semibold m-5">
        Change
      </Text>

      <TextInput
        placeholder="What is on your mind"
        className="w-full p-3"
        value={caption}
        onChangeText={setCaption}
      />
      <View className="mt-auto w-full">
        <Button title="Share" onPress={createPost} />
      </View>
    </View>
  );
}
