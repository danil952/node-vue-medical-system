const pool= require('../db.js')

const queryStrings = {
    selectAll: 'SELECT * FROM "doctor" ORDER BY "id"',
    select: 'SELECT * FROM "doctor" WHERE "id" = $1',
    selectByUsername: 'SELECT * FROM "doctor" WHERE "username" = $1',
    insert: 'INSERT INTO "doctor" (name, surname, username, password, type_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    update: 'UPDATE "doctor" SET name = $1, surname = $2, username = $3, password = $4, type_id = $5 WHERE id = $6 RETURNING *',
    delete: 'DELETE FROM "doctor" WHERE id = $1'
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

async function post(doctor) {
    const query = await pool.query(
        queryStrings.insert,
        [doctor.name, doctor.surname, doctor.username, doctor.password, doctor.type_id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, doctor) {
    const query = await pool.query(
        queryStrings.update,
        [doctor.name, doctor.surname, doctor.username, doctor.password, doctor.type_id, id]);
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

async function findByUsername(username)
{
    const query = await pool.query(
        queryStrings.selectByUsername,
        [username]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

module.exports = { getAll, get, post, put, remove, findByUsername}