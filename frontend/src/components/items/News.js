import React from "react";

const News = ({ dataNews }) => {
    return (
        <article className="news-item wrp-effect-scale wrp-effect-boxshadow">
            <div className="inner-image ">
                <div className="ratio-3-2">
                    <a href="#">
                        <img className="img-fluid" src={dataNews.news_image} alt="image"/>
                    </a>
                </div>
            </div>
            <div className="news-content">
                <h4 className="news-item--title wrp-effect-color">
                    <a href="#">
                        {dataNews.news_title}
                    </a>
                </h4>
                <div className="news-item--date">
                    {dataNews.news_date}
                </div>
                <div className="news-item--description">
                    {dataNews.news_description}
                </div>
            </div>
        </article>
    )
}

export default News