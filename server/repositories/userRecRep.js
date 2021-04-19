const pool= require('../db.js')

const queryStrings = {
    selectAll: 'SELECT * FROM "user_record" ORDER BY "id"',
    select: 'SELECT * FROM "user_record" WHERE "id" = $1',
    insert: 'INSERT INTO "user_record" (user_id, doctor_rec_id) VALUES ($1, $2) RETURNING *',
    update: 'UPDATE "user_record" SET user_id = $1, doctor_rec_id = $2 WHERE id = $3 RETURNING *',
    delete: 'DELETE FROM "user_record" WHERE id = $1',
    selectActive: `SELECT "med_type".name, "med_type".description, "med_type".price, to_char("doctor_rec".time, 'YYYY-MM-DD HH24:MI:SS') as time, "doctor".name AS doctor_name, "doctor".surname AS doctor_surname FROM "user_record" 
    JOIN "doctor_rec" ON "doctor_rec".id = "user_record".doctor_rec_id
    JOIN "med_type" ON "med_type".id = "doctor_rec".med_type_id
    JOIN "doctor" ON "doctor_rec".doctor_id = "doctor".id
    WHERE "user_record".user_id = $1 AND "doctor_rec".time > now()`,
    selectArchive: `SELECT "med_type".name, "med_type".description, "med_type".price, to_char("doctor_rec".time, 'YYYY-MM-DD HH24:MI:SS') as time, "doctor".name AS doctor_name, "doctor".surname AS doctor_surname FROM "user_record" 
    JOIN "doctor_rec" ON "doctor_rec".id = "user_record".doctor_rec_id
    JOIN "med_type" ON "med_type".id = "doctor_rec".med_type_id
    JOIN "doctor" ON "doctor_rec".doctor_id = "doctor".id
    WHERE "user_record".user_id = $1 AND "doctor_rec".time < now()`
}

async function getArchive(user_id) {
    const query = await pool.query(
        queryStrings.selectArchive,
        [user_id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows;
}

async function getActive(user_id) {
    const query = await pool.query(
        queryStrings.selectActive,
        [user_id]);
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
        [record.user_id, record.doctor_rec_id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, record) {
    const query = await pool.query(
        queryStrings.update,
        [record.user_id, record.doctor_rec_id, id]);
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




module.exports = { getAll, get, post, put, remove, getArchive, getActive }