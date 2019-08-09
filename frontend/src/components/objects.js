function object(e){
    const post = {};
    e.target.childNodes.forEach((elm) => {
        if(elm.value){
            post[elm.name] = elm.value
        }
        elm.value = null
    });
    return post;
}

module.exports = {object};