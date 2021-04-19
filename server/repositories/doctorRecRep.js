const pool= require('../db.js')

const queryStrings = {
    selectAll: 'SELECT * FROM "doctor_rec" ORDER BY "time"',
    select: 'SELECT * FROM "doctor_rec" WHERE "id" = $1',
    insert: 'INSERT INTO "doctor_rec" (doctor_id, med_type_id, time, busy) VALUES ($1, $2, $3, $4) RETURNING *',
    update: 'UPDATE "doctor_rec" SET doctor_id = $1, med_type_id = $2, time = $3, busy = $4 WHERE id = $5 RETURNING *',
    delete: 'DELETE FROM "doctor_rec" WHERE id = $1',
    selectFreeRecordsByType: `SELECT "doctor_rec".id, "med_type".name, "med_type".description, "med_type".price, to_char("doctor_rec".time, 'YYYY-MM-DD HH24:MI:SS') as time, "doctor".name AS doctor_name, "doctor".surname AS doctor_surname FROM "doctor_rec" 
    JOIN "med_type" ON "med_type".id = "doctor_rec".med_type_id
    JOIN "doctor" ON "doctor_rec".doctor_id = "doctor".id
    WHERE "doctor_rec".busy = $1 and "med_type".type_id = $2 and "doctor_rec".time > now()`,
    selectBusy: `SELECT "med_type".name, "med_type".description, "med_type".price, to_char("doctor_rec".time, 'YYYY-MM-DD HH24:MI:SS') as time, "user".name AS user_name, "user".surname AS user_surname FROM "doctor_rec" 
    JOIN "med_type" ON "med_type".id = "doctor_rec".med_type_id
    JOIN "user_record" ON "user_record".doctor_rec_id = "doctor_rec".id
    JOIN "user" ON "user_record".user_id = "user".id
    WHERE "doctor_rec".busy = $1 and "doctor_rec".doctor_id = $2 and "doctor_rec".time > now()`,
    selectArchive:`SELECT "med_type".name, "med_type".description, "med_type".price, to_char("doctor_rec".time, 'YYYY-MM-DD HH24:MI:SS') as time, "user".name AS user_name, "user".surname AS user_surname FROM "doctor_rec" 
    JOIN "med_type" ON "med_type".id = "doctor_rec".med_type_id
    JOIN "user_record" ON "user_record".doctor_rec_id = "doctor_rec".id
    JOIN "user" ON "user_record".user_id = "user".id
    WHERE "doctor_rec".doctor_id = $1 and "doctor_rec".time < now()`,
    selectFree: `SELECT "doctor_rec".id, "med_type".name, "med_type".description, "med_type".price, to_char("doctor_rec".time, 'YYYY-MM-DD HH24:MI:SS') as time FROM "doctor_rec" 
    JOIN "med_type" ON "med_type".id = "doctor_rec".med_type_id
    WHERE "doctor_rec".doctor_id = $1 and "doctor_rec".busy= $2 and "doctor_rec".time > now()`
}

async function getArchive(doctor_id) {
    const query = await pool.query(
        queryStrings.selectArchive,
        [doctor_id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows;
}

async function getBusy(doctor_id) {
    const query = await pool.query(
        queryStrings.selectBusy,
        ['true',doctor_id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows;
}

async function getFree(doctor_id) {
    const query = await pool.query(
        queryStrings.selectFree,
        [doctor_id, 'false']);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows;
}

async function getFreeByType(type_id) {
    const query = await pool.query(
        queryStrings.selectFreeRecordsByType,
        ['false',type_id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows;
}

async function getAll() {
    const query = await pool.query(queryStrings.selectAll);
    return query.rows;
}

async function get(id) {
    const query = await pool.query(
        queryStrings.select,
        [id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function post(record) {
    const query = await pool.query(
        queryStrings.insert,
        [record.doctor_id, record.med_type_id, record.time, record.busy]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, record) {
    const query = await pool.query(
        queryStrings.update,
        [record.doctor_id, record.med_type_id, record.time, record.busy, id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function remove(id) {

    const query= await pool.query(
        queryStrings.delete, [id]
    );
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}




module.exports = { getAll, get, post, put, remove, getFreeByType, getFree, getBusy,getArchive }