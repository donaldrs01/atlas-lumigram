import { storage } from "@/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

async function upload(uri: string, name: string) {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const imageRef = ref(storage, `images/${name}`);
        console.log("Uploading image to Firebase");
        const result = await uploadBytes(imageRef, blob);
        const downloadUrl = await getDownloadURL(result.ref);
        const metadata = result.metadata;

        return { downloadUrl, metadata };
    } catch (error: any) {
        console.error("Upload failed:", JSON.stringify(error, null, 2)); // Logs full error in readable format
    
        if (error?.customData?.serverResponse) {
            console.error("Server response payload:", error.customData.serverResponse);
        } else if (error?.serverResponse) {
            console.error("Server response:", error.serverResponse);
        } else {
            console.error("Full error object:", error);
        }
    
        throw new Error(error.message || "Unknown Firebase Storage error");
    }
}

export default { upload };