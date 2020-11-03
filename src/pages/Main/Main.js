import React, {useEffect, useState} from 'react'
import {Card, Col, Pagination, Row, Radio} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {fetchByCategory, fetchByCountry, fetchOtherPosts, fetchPosts} from "../../redux/actions/fetch.action";
import {Loader} from "../../components/Loader/Loader";

const Main = ({fetchPosts, posts, fetchOtherPosts, fetchByCountry, fetchByCategory}) => {

    const [news, setNews] = useState(null)
    const [countries] = useState([
        {
            code: 'ru',
            title: 'Россия'
        },
        {
            code: 'us',
            title: 'США'
        },
        {
            code: 'ua',
            title: 'Украина'
        }
    ])
    const [categories] = useState([
        {
            name: 'business',
            title: 'Бизнес'
        },
        {
            name: 'entertainment',
            title: 'Развлечения'
        },
        {
            name: 'general',
            title: 'Основные'
        },
        {
            name: 'health',
            title: 'Здоровье'
        },
        {
            name: 'science',
            title: 'Наука'
        },
        {
            name: 'sports',
            title: 'Спорт'
        },
        {
            name: 'technology',
            title: 'Технологии'
        }
    ])
    const [activeCodeCountry, setActiveCodeCountry] = useState('ru')
    const [activeCategory, setActiveCategory] = useState('')
    const [defaultPagination, setDefaultPagination] = useState(1)

    const localPosts = JSON.parse(localStorage.getItem('posts'))

    useEffect(() => setNews(posts), [posts])
    useEffect(() => fetchPosts(), [])

    const handlePagination = (e) => {
        setDefaultPagination(e)
        fetchOtherPosts(e, activeCodeCountry, activeCategory)
        window.scrollTo(0, 0);
    }

    const handleCodeCountry = (e) => {
        setDefaultPagination(1)
        setActiveCodeCountry(e)
        fetchByCountry(e, activeCategory)
    }

    const handleCategory = (e) => {
        setDefaultPagination(1)
        setActiveCategory(e)
        fetchByCategory(e, activeCodeCountry)
    }

    return (
        <div className='container main'>
            <div className='filters'>
                <h3>Доступные новости стран</h3>
                <Radio.Group onChange={e => handleCodeCountry(e.target.value)} defaultValue={countries[0].code}
                             buttonStyle="solid">
                    {
                        countries.map((country, i) => {
                            return (
                                <Radio.Button key={i} value={country.code}>{country.title}</Radio.Button>
                            )
                        })
                    }
                </Radio.Group>
                <h3>Категории</h3>
                <Radio.Group onChange={e => handleCategory(e.target.value)} buttonStyle="solid">
                    {
                        categories.map((category, i) => {
                            return (
                                <Radio.Button key={i} value={category.name}>{category.title}</Radio.Button>
                            )
                        })
                    }
                </Radio.Group>
            </div>
            <h2>Главные новости</h2>
            {console.log(news)}
            {
                news
                    ?
                    (
                        <Row gutter={30}>
                            {
                                news.map((newPost, i) => {
                                    return (
                                        <Col span={8} key={i}>
                                            <Card title={newPost.title}
                                                  extra={<Link to={`/post/${i}`}>Читать</Link>}>
                                                <div>
                                                    {
                                                        newPost.urlToImage
                                                            ?
                                                            <>
                                                                <img className='postImg'
                                                                     src={newPost.urlToImage}
                                                                     alt='broke'/>
                                                                <div>{newPost.description}</div>
                                                            </>
                                                            :
                                                            (
                                                                newPost.description ? newPost.description : 'Описание отсутствует'
                                                            )
                                                    }
                                                </div>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    )
                    :
                    <Loader/>
            }
            <Pagination onChange={e => handlePagination(e)} current={defaultPagination}
                        defaultCurrent={defaultPagination} total={20}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts
    }
}

const mapDispatchToProps = {
    fetchPosts,
    fetchOtherPosts,
    fetchByCountry,
    fetchByCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)