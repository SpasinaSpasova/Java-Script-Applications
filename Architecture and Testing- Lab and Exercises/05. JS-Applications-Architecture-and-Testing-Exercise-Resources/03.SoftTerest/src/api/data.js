import * as api from './api.js';

const endpoinst = {
    'ideas': '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    'create': '/data/ideas',
    'ideaById': '/data/ideas/'
}
export async function getAllIdeas() {
    return api.get(endpoinst.ideas);
}

export async function createIdea(ideaData){
    return api.post(endpoinst.create,ideaData);
}

export async function getById(id){
    return api.get(endpoinst.ideaById+id);
}
export async function deleteById(id){
    return api.delete(endpoinst.ideaById+id);
}