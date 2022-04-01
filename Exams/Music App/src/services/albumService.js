import * as request from '../services/requester.js';


const baseUrl = 'http://localhost:3030/data/albums';

export const getAll = () =>
    request.get(`${baseUrl}?sortBy=_createdOn%20desc&distinct=name`);

export const getOne = (albumId) => request.get(`${baseUrl}/${albumId}`);

export const create = (albumData) =>
    request.post(baseUrl, albumData);

export const edit = (albumId, albumData) => 
    request.put(`${baseUrl}/${albumId}`, albumData);


export const remove = (albumId) => request.del(`${baseUrl}/${albumId}`);

export const search = (search) => {
    let query = encodeURIComponent(`name LIKE "${search}"`);
    return request.get(`${baseUrl}?where=${query}`);
}