import * as React from 'react';
import './UserPosts.css';
import {postActions} from "../../../redux/actions";
import {commentActions} from "../../../redux/actions";
import {connect} from "react-redux";
import {useEffect, useState} from 'react';
import PostComments from "./PostComments/PostComments";
import {useParams} from 'react-router-dom';
import Swal from "sweetalert2";
import Alert_Modal from "../../Modals/sweetalert2 ";
import {nanoid} from "nanoid";
/*-------------------Components------------------*/
import Addpost from "./AddPost/AddPost";
import AddEditCommentComp from './AddEditCommentComp/AddEditCommentComp'
/*------------------MUI imports-----------------*/
import {Accordion, AccordionSummary, AccordionDetails} from "../../MUI-Styles/MUI-Accordion/MUI_Accordion";
import Typography from '@mui/material/Typography';


function UserPosts({posts, getPosts, getComments, comments, deleteComment, editComment, addComment}) {

    const {id} = useParams();

    const [activePostId, setActivePostId] = useState('');
    const [activeComment, setActiveComment] = useState({});
    const [commentValue, setCommentValue] = useState('');

    useEffect(() => {
        getPosts(id);
    }, []);

    function panelChange(id) {
        if (activePostId === id) {
            setActivePostId('')
        }else{
            getComments(id)
                .then(() => { setActivePostId(id) });
        }
    }

    function commentDeleter(id) {
        return (
            Alert_Modal(id)
                .then((result) => {
                    if (result.isConfirmed) {
                        deleteComment(id).then(() => {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        })
                    }
                })
        )
    }

    function commentEditer(comment) {
        setActiveComment(comment);
        setCommentValue(comment.body);
    }

    function addOrEditComment() {
        if (activeComment && activeComment.id) {
            editComment(activeComment)
        } else {
            const toAddcommentObj = {
                postId: activePostId,
                id: nanoid(20),
                name: 'Orinak Orinakyan',
                email: 'Orinak@mail.com',
                body: commentValue
            };
            addComment(toAddcommentObj);
        }
        setActiveComment({});
        setCommentValue('');
    }

    function handleChange(e) {
        let value = e.target.value;
        setCommentValue(value);
        setActiveComment((prev) => ({...prev, body: value}));
    }

    return (
        <div className='posts_wrapper'>
            <div className='posts_container'>
                {posts.length ?
                    <div className='add_post_box'>
                        <Addpost
                            id={id}
                        />
                    </div> : null}
                {posts.map((post) => {
                    return (
                        <div className='post_item' key={post.id}>
                            <>
                                <Accordion
                                    expanded={activePostId === post.id}
                                    onChange={() => panelChange(post.id)}>
                                    <AccordionSummary>
                                        <Typography>
                                            <b>{post.title}</b>
                                            <br/>
                                            {post.body}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {(comments.length && activePostId === post.id) &&
                                        <PostComments
                                            comments={comments}
                                            commentEditer={commentEditer}
                                            commentDeleter={commentDeleter}
                                        /> }
                                    </AccordionDetails>
                                </Accordion>
                            </>
                        </div>
                    )
                })
                }
                {activePostId && <div className='comment_adding_container'>
                    <AddEditCommentComp
                        key={activeComment.id}
                        activeComment={activeComment}
                        commentValue={commentValue}
                        handleChange={handleChange}
                        addOrEditComment={addOrEditComment}
                    />
                </div>}
            </div>
        </div>
    )
}
//id-in poxel nano ID
const mapStateToProps = state => {
    return {
        posts: state.postReducer.posts,
        comments: state.commentReducer.comments
    };
};

const mapDispatchToProps = dispatch => ({
    getPosts: (id) => dispatch(postActions.getUserPosts(id)),
    getComments: (id) => dispatch(commentActions.getUserComments(id)),
    deleteComment: (id) => dispatch(commentActions.deleteUserComment(id)),
    editComment: (comment) => dispatch(commentActions.editUserComment(comment)),
    addComment: (comment) => dispatch(commentActions.addUserComment(comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);