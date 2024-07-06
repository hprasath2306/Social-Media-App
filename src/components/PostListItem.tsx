
import { View, Text, Image, useWindowDimensions } from 'react-native';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";

// Create a Cloudinary instance and set your cloud name.
const cld = new Cloudinary({
    cloud: {
        cloudName: 'dat8pcpqz'
    }
});

interface PostListItemProps {
    post: {
        image: string;
        user: {
            image_url: string;
            username: string;
            avatar_url: string;
        };
        image_url: string;
    };
}

export default function PostListItem({ post }: PostListItemProps) {
    const {width} = useWindowDimensions();
    const image = cld.image(post.image);
    const avatar = cld.image(post.user.avatar_url);
    avatar.resize(thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face())))
    return (
        <View className="bg-white">
            <View className="p-3 flex-row items-center gap-2">
                <Image
                    source={{uri: avatar.toURL()} || "https://ui-avatars.com/api/?name=No+name&size=128"}
                    className="w-12 aspect-square rounded-full"
                />
                <Text className="font-semibold">{post.user.username || "No name"}</Text>
            </View>
            <Image
                source={{uri: image.toURL()}}
                className="w-full aspect-[4/3]"
            />
            <View className="flex-row gap-3 p-3">
                <AntDesign name="hearto" size={20}/>
                <Ionicons name="chatbubble-outline" size={20}/>
                <Feather name="send" size={20}/>

                <Feather name="bookmark" size={20} className="ml-auto"/>
            </View>
        </View>
    )
}