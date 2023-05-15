let userId = null;
let contentIds = [];
let _id = null;
let _contentId = [];

const setUserId = (id) => {
    userId = id;
};

const getUserId = () => {
    return userId;
};

const setContentIds = (...ids) => {
    contentIds = ids;
};

const getContentIds = () => {
    return contentIds;
};

const setId = (id) => {
    _id = id;
};

const getId = () => {
    return _id;
};

const setContentId = (ids) => {
    _contentId = ids;
};

const getContentId = () => {
    return _contentId;
};

const addContentId = (ids) => {
    contentIds.push(ids);
};


export {
    _id,
    _contentId,
    addContentId,
    setUserId,
    getUserId,
    setContentIds,
    getContentIds,
    contentIds,
    setId,
    getId,
    setContentId,
    getContentId,
};