function getImageURL(name){
    return new URL(`../assets/images/avatars/${name}`, import.meta.url).href
}

export {getImageURL}