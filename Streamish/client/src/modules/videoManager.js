import { getToken } from "./authManager";

const baseUrl = '/api/video';
const userUrl = '/api/UserProfile';

// export const getAllVideos = () => {
//     return fetch(baseUrl + '/GetWithComments')
//         .then((res) => res.json())
// };

export const getAllVideos = () => {
    return getToken().then((token) => {
        return fetch((baseUrl + '/GetWithComments'), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get videos.");
            }
        });
    });
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

