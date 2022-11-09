import axios from "axios";
import {collection,getDocs,addDoc,doc,setDoc,query,where} from 'firebase/firestore';
import {db} from "../firebaseService/firebaseConfig";
/* ID generator*/
import { nanoid } from 'nanoid'
/////////////////////////////////////
const userCollectionHref = collection(db,'users');

export const userService = {
      getUserList,
      addUserInUserList,
};

/*----------------------------------------------------USER CALLS-------------------------------------------*/

function getUserList ()  {
         return getDocs(userCollectionHref)
        .then( (users) => {
            return  {data:users.docs.map( (doc) => ({...doc.data()}) ) }
        });
}

function addUserInUserList(user) {
         return setDoc(doc(userCollectionHref, user.id), user)
                 .then( (user) => {
                     return  {data:user}
                 }).catch( err => console.log('service',err));
}


