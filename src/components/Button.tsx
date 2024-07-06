import { Pressable, Text } from "react-native";

export default function Button({title, onPress}: {title: string, onPress?: () => void}) {
  return (
    <Pressable onPress={onPress} className="bg-blue-500 w-full p-3 rounded-md items-center">
      <Text className="text-white font-semibold">{title}</Text>
    </Pressable>
  );
}
