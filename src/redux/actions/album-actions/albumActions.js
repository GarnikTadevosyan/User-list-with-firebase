import {userAlbumsConstants} from "../../constants/album-Constant/albumActionTypes";
import {albumService} from "../../services";

export const albumActions = {
       getUserAlbums
};

function getUserAlbums(id) {
  return dispatch => {
    dispatch(request());
    return albumService.getUserAlbums(id)
    .then(response => {
      dispatch(success(response));
    })
    .catch(function (error) {
      dispatch(failure(error.response));
    })
  };

  function request() { return { type: userAlbumsConstants.GET_ALBUMS_REQUEST } }
  function success(albums) { return { type: userAlbumsConstants.GET_ALBUMS_SUCCESS, albums } }
  function failure(error) { return { type: userAlbumsConstants.GET_ALBUMS_FAILURE, error } }
}

