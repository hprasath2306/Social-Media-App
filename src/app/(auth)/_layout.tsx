import {Redirect, Stack} from "expo-router";
import { useAuth } from "../../providers/AuthProvider";


export default function AuthLayout() {
    const { isAuthenticated } = useAuth();

    if(isAuthenticated){
        return (
            <Redirect href={"/(tabs)"} />
        )
    }

    return <Stack screenOptions={{headerShown:false}} />
}