export const albumIsInvalid = (albumData) => {
    const fields = [
        'name',
        'imgUrl',
        'price',
        'releaseDate',
        'artist',
        'genre',
        'description'
    ];

    return fields.some(x => !albumData[x]);
}