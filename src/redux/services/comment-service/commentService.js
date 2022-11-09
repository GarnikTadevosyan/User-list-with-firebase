import {collection,getDocs,doc,setDoc,query,where,updateDoc,deleteDoc} from 'firebase/firestore';
import {db} from "../firebaseService/firebaseConfig";

const commentCollectionHref = collection(db,'comments');

export const commentService = {
       getUserComments,
       deleteUserComment,
       editUserComment,
       addUserComment,
};

async function getUserComments (postId) {
               const data = [];
               const q = query(commentCollectionHref, where("postId", "==", postId));
               const querySnapshot = await getDocs(q);
               querySnapshot.forEach((doc) => { data.push(doc.data())} );
               return data
}
async function deleteUserComment(toDeleteCommentId) {
               await deleteDoc(doc(commentCollectionHref, toDeleteCommentId))
}

async function editUserComment(toEditComment) {
               const commentnRef = doc(commentCollectionHref, toEditComment.id);
               await updateDoc(commentnRef,{body: toEditComment.body});
}
async function addUserComment(comment) {
               setDoc(doc(commentCollectionHref, comment.id), comment);
}



