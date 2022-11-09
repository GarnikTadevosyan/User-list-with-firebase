import axios from "axios";
import { collection,getDocs,query,where } from 'firebase/firestore';
import { db } from "../firebaseService/firebaseConfig";

const photoCollectionHref = collection(db,'photos');

export const photoService = {
       getUserPhotos,
       deleteUserPhoto,
};

async function getUserPhotos (albumId) {
               const data = [];
               const q = query(photoCollectionHref, where("albumId", "==", albumId));
               const querySnapshot = await getDocs(q);
               querySnapshot.forEach((doc) => { data.push( doc.data() )  } );
               return data
}

async function deleteUserPhoto (photoId) {
    return axios.delete(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
        .then(res => res)
}

