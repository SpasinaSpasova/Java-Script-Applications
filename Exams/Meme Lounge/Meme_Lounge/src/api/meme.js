import { nothing } from '../../node_modules/lit-html/lit-html.js';
import * as api from './api.js';

const endpoints = {
    memes: '/data/memes?sortBy=_createdOn%20desc',
    create: '/data/memes',
    getById: '/data/memes/',
    delById: '/data/memes/',
    edit: '/data/memes/:id',
    recent: (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
}

export async function getAll() {
    return api.get(endpoints.memes);
}
export async function getAllforUser() {
    let something=`${localStorage.getItem('user')}`;
    if (something) {
        return api.get(endpoints.recent(JSON.parse(something)._id))
    }
    return nothing;
}

export async function create(data) {
    return api.post(endpoints.create, data);
}

export async function getById(id) {
    return api.get(endpoints.getById + id);
}

export async function deleteById(id) {
    return api.del(endpoints.delById + id);
}

export async function edit(id, data) {
    return api.put(endpoints.edit + id, data);
}