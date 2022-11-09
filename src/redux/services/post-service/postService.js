import {nanoid} from "nanoid";

import {collection,getDocs,doc,setDoc,query,where} from 'firebase/firestore';
import {db} from "../firebaseService/firebaseConfig";

const postCollectionHref = collection(db,'posts');

export const postService = {
       getUserPosts,
       addUserPost,
};

async function getUserPosts (userId) {
                const data = [];
                const q = query(collection(db, "posts"), where("userId", "==", userId));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => { data.push( doc.data() ) } );
                return data
}
async function addUserPost (post) {
                let randomPath = nanoid(20);
                post.id = randomPath;
                setDoc(doc(postCollectionHref, randomPath), post);
}


