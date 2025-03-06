import { useState } from "react";
import { usePermissions } from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

export function useImagePicker() {
     const [image, setImage] = useState<string | undefined>(undefined);
     const [status, requestPermission] = usePermissions();

     async function openImagePicker() {
        // Permission request
        if(status === null){
            const permission = await requestPermission();
            if(permission.granted === false){
                alert("You need to grant permission to access your photos")
                return;
            }
        }

        // Once given permission, open image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
        });
        // Validates that user selected an image
        if(!result.canceled){
            setImage(result.assets[0].uri); // Update state variable to use that image
        }
     }

     function reset() {
        // Clear selected image
        setImage(undefined);
     }

     return { image, openImagePicker, reset };
}