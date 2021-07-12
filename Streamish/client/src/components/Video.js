import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Video = ({ video, name }) => {
    return (
        <Card >
            {video.userProfile != undefined ? <Link to={`/users/${video.userProfile.id}`}   ><p className="text-left px-2">Posted by: {video.userProfile.name}</p></Link> : <p className="text-left px-2">Posted by: {name}</p>}

            <CardBody>
                <iframe className="video"
                    src={video.url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen />

                <p>
                    <Link to={`/videos/${video.id}`}>
                        <strong>{video.title}</strong>
                    </Link>
                </p>

                <p>{video.description}</p>
                {video.comments?.map(comment => {
                    return <p>{comment.message}</p>
                })}
            </CardBody>
        </Card>
    );
};

export default Video;
