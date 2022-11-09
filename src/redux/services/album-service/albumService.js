import {collection,getDocs,query,where} from 'firebase/firestore';
import {db} from "../firebaseService/firebaseConfig";
const albumCollectionHref = collection(db,'albums');

export const albumService = {
       getUserAlbums,
};

async function getUserAlbums (albumId) {
               const data = [];
               const q = query(albumCollectionHref, where("userId", "==", albumId));
               const querySnapshot = await getDocs(q);
               querySnapshot.forEach((doc) => { data.push( doc.data() )  } );
               return data
}



