const baseUrl = '/api/video';
const userUrl = '/api/UserProfile';

export const getAllVideos = () => {
    return fetch(baseUrl + '/GetWithComments')
        .then((res) => res.json())
};

export const getAllUserVideos = (userId) => {
    return fetch(userUrl + `/GetUserByIdWithVideos/${userId}`)
        .then((res) => res.json())
};

export const getVideo = (id) => {
    return fetch(`${baseUrl}/${id}`).then((res) => res.json());
};

export const addVideo = (video) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(video),
    });
};

export const searchVideos = (string) => {
    return fetch(baseUrl + '/search?q=' + string)
        .then((res) => res.json())
};

