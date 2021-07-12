import React, { useEffect, useState } from "react";
import Video from './Video';
import { getAllUserVideos } from "../modules/videoManager";
import { useParams } from "react-router-dom";

const UserVideos = () => {

    const [user, setUser] = useState({});
    const { id } = useParams();


    const getUserVideos = () => {
        getAllUserVideos(id).then(userVideos => setUser(userVideos));

    }

    useEffect(() => {
        getUserVideos();
    }, []);

    return (
        <>
            <div className="container">
                {/* <div >
                    <input type='text' className="search" required onChange={handleSearch} id="search_box" placeholder="Search" />
                </div> */}

                <div className="row justify-content-center">
                    {user?.videos?.map((video) => (
                        <Video video={video} name={user.name} key={video.id} />
                    ))}
                </div>
            </div>
        </>
    );
}
export default UserVideos;