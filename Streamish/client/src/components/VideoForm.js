import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { addVideo } from "../modules/videoManager";
import { useHistory } from "react-router";

const VideoForm = () => {
    let emptyVideo = {
        title: "",
        description: "",
        url: ""
    }

    const history = useHistory();
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
            addVideo(video).then((p) => {
                // Navigate the user back to the home route
                history.push("/");
            });

        }
    }





    return (
        <Form>
            <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" name="title" id="title" placeholder="video title"
                    value={video.title}
                    onChange={handleControlledInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="url">URL</Label>
                <Input type="text" name="url" id="url" placeholder="video link"
                    value={video.url}
                    onChange={handleControlledInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" id="description"
                    value={video.description}
                    onChange={handleControlledInputChange} />
            </FormGroup>
            <Button className="btn btn-primary" onClick={handleClickSaveVideo}>Submit</Button>
        </Form>
    )

}
export default VideoForm;