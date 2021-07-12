import React, { useEffect, useState } from "react";
import Video from './Video';
import { getAllVideos, searchVideos } from "../modules/videoManager";
import { VideoForm } from "./VideoForm";

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [search, setSearch] = useState("")

    const getVideos = () => {
        if (search == "") {
            getAllVideos().then(videos => setVideos(videos));
        } else {
            searchVideos(search).then(videos => setVideos(videos));
        }
    };

    const handleSearch = (evt) => {
        evt.preventDefault()
        let searchInput = evt.target.value
        setSearch(searchInput)
    };


    useEffect(() => {
        getVideos();
    }, [search]);

    return (
        <>
            <div className="container">
                <div >
                    <input type='text' className="search" required onChange={handleSearch} id="search_box" placeholder="Search" />
                </div>

                <VideoForm getVideos={getVideos} />

                <div className="row justify-content-center">
                    {videos.map((video) => (
                        <Video video={video} key={video.id} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default VideoList;
