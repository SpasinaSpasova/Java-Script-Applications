import * as api from './api.js';

const endpoints = {

    animals: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    create: '/data/pets',
    getById: '/data/pets/',
    delById: '/data/pets/',
    edit: '/data/pets/',
    donate: '/data/donation',
    count: (petId) => `/data/donation?where=petId%3D%22$${petId}%22&distinct=_ownerId&count`,

}

export async function getAll() {
    return api.get(endpoints.animals);
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

export async function donate(data) {
    return api.post(endpoints.donate, data);
}

export async function donateCount(petId) {
    return api.get(endpoints.count(petId));
}
