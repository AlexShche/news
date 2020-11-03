import React, {useState} from 'react'
import {connect} from "react-redux";
import {Link, useLocation} from 'react-router-dom'
import {Button} from "antd";

const PostShow = ({posts}) => {

    const location =  useLocation()
    const [news] = useState(posts)
    const post = news[location.pathname.replace(/[^+\d]/g, '')]

    localStorage.setItem('posts', JSON.stringify(posts))

    return(
        <div className='contentPost container'>
            <Button>
                <Link to='/'>На главную</Link>
            </Button>
            {
                post.urlToImage
                &&
                <div>
                    <img className='postImg' src={post.urlToImage} alt="postImg"/>
                </div>
            }
            <h2>{post.title}</h2>
            <p>
                {
                    post.description
                }
            </p>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        posts: state.posts.posts
    }
}

export default connect(mapStateToProps, null)(PostShow)