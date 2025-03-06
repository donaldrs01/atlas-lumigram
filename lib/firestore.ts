import { doc, collection, addDoc, deleteDoc, query, orderBy, where, limit, getDocs, startAfter } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { getAuth } from "firebase/auth";

export type Post = {
    caption: string;
    image: string;
    createdAt: Date;
    createdBy: string;
    id: string;
}

const postsRef = collection(db, 'posts');
const favoritesRef = collection(db, 'favorites');

// Add post 
async function addPost(post: Omit<Post, "id">) {
    const docRef = await addDoc(postsRef, post);
    return { id: docRef.id, ...post };
}

// Fetch posts in desc order while paginating
// lastDoc is the last document from the previous batch for pagination
async function fetchPosts(lastDoc: any = null, pageSize: number = 10) {

    const postQuery = lastDoc
        ? query(postsRef, orderBy("createdAt", "desc"), startAfter(lastDoc), limit(pageSize))
        : query(postsRef, orderBy("createdAt", "desc"), limit(pageSize));

    const snapshot = await getDocs(postQuery);

    return {
        posts: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        lastDoc: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null,
    };
}

async function addToFavorites(post: Post) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    // Check if post already favorited
    const q = query(favoritesRef, where("userId", "==", user.uid), where("postId", "==", post.id));
    const snapshot = await getDocs(q);
    // Add to favorites if not already there
    if (snapshot.empty) {
        await addDoc(favoritesRef, {
            userId: user.uid,
            postId: post.id,
            image: post.image,
            caption: post.caption,
            createdAt: post.createdAt,
            createdBy: post.createdBy
        });
        console.log("Added to favorites");
    } else {
        console.log("Already in favorites");
    }
}

async function removeFromFavorites(postId: string) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;
    // Find favorited post in collection and put into snapshot
    const q = query(favoritesRef, where("userId", "==", user.uid), where("postId", "==", postId));
    const snapshot = await getDocs(q);

    snapshot.forEach(async (fave) => {
        await deleteDoc(doc(db, "favorites", fave.id));
        console.log("Removed from favorites");
    });
}

async function getUserFavorites() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return [];

    const q = query(favoritesRef, where("userId", "==", user.uid));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => doc.data().postId);
}
// Using a post's postID, queries the posts collection to retrieve full post data (caption, image URL, etc) to display on favorites page
async function getFavoritePosts(postIds: string[]) {
    if (postIds.length === 0) return [];

    const chunkSize = 10;
    const chunks = [];

    // Split postIds into chunks of 10
    for (let i = 0; i < postIds.length; i += chunkSize) {
        chunks.push(postIds.slice(i, i + chunkSize));
    }

    let allPosts: Post[] = [];

    for (const chunk of chunks) {
        const q = query(postsRef, where("__name__", "in", chunk));
        const snapshot = await getDocs(q);

        const posts = snapshot.docs.map((doc) => ({
            id: doc.id,
            createdAt: doc.data().createdAt || new Date(),
            ...doc.data(),
        })) as Post[];

        allPosts = [...allPosts, ...posts];
    }

    return allPosts;
}

export default {
    addToFavorites,
    getUserFavorites,
    addPost,
    fetchPosts,
    removeFromFavorites,
    getFavoritePosts,
}