import dayjs from "dayjs";

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

export const convertReservationDatesToDayjs = (reservations) => {
    return reservations.map(reservation => {
        return {...reservation, expi: dayjs(reservation.expi), expo: dayjs(reservation.expo)}
    })
}