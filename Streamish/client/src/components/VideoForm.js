import React, { useState, useEffect } from "react";
import { addVideo } from "../modules/videoManager"

export const VideoForm = ({ getVideos }) => {
    let emptyVideo = {
        title: "",
        description: "",
        url: ""
    }

    const [isLoading, setIsLoading] = useState(false);

    const [video, setVideo] = useState(emptyVideo);

    const handleControlledInputChange = (event) => {

        const newVideo = { ...video }
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newVideo[event.target.id] = selectedVal
        setVideo(newVideo)
    }

    const handleClickSaveVideo = (event) => {
        event.preventDefault()
        setIsLoading(true)

        const title = video.title
        const description = video.description
        const url = video.url

        if (title == "" || url == "") {
            window.alert("Please add a Title and Url")
            setIsLoading(false)
        } else {
            addVideo(video)
                .then(() => getVideos())
                .then(() => setIsLoading(false))
            setVideo(emptyVideo)

        }

    }


    return (
        <>
            {/* <div className="hero is-small is-primary"> */}
            <h2 className="hero-body">
                <p className="title">Create a New Video</p>
            </h2>
            {/* </div> */}


            <fieldset className="field">


            </fieldset>
            <fieldset className="field">
                <label className="label is-medium">Title:</label>
                <div className="control">
                    <input type="text" id="title" onChange={handleControlledInputChange} className="input" placeholder="Title" value={video.title} />
                </div>
            </fieldset>
            <fieldset className="field">
                <label className="label is-medium">Url:</label>
                <div className="control">
                    <input type="text" id="url" onChange={handleControlledInputChange} className="input" placeholder="Url" value={video.url} />
                </div>
            </fieldset>
            <fieldset className="field">
                <label className="label is-medium">Description:</label>
                <div className="control">
                    <textarea type="textarea" id="description" onChange={handleControlledInputChange} className="textarea" placeholder="Description" value={video.description} />
                </div>

            </fieldset>

            <button disabled={isLoading} className="button is-primary"
                onClick={handleClickSaveVideo}>
                Save
            </button>

            {/* <button className="button is-light"
                onClick={handleClickGoBack}>
                Cancel
            </button> */}
        </>
    )
}