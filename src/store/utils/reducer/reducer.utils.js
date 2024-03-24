export const createAction = (type, payload) => ({type, payload});

export const updateEntities = (entities, entityToUpdate) => {
    return entities.map(entity => {
        if(entity.id === entityToUpdate.id) {
            return entityToUpdate;
        } else {
            return entity;
        }
    })
}