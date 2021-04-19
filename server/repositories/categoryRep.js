const pool= require('../db.js')

const queryStrings = {
    selectAll: 'SELECT * FROM "type" ORDER BY "id"',
    select: 'SELECT * FROM "type" WHERE "id" = $1',
    insert: 'INSERT INTO "type" (name) VALUES ($1) RETURNING *',
    update: 'UPDATE "type" SET name = $1 WHERE id = $2 RETURNING *',
    delete: 'DELETE FROM "type" WHERE id = $1'
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

async function post(type) {
    const query = await pool.query(
        queryStrings.insert,
        [type.name]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, type) {
    const query = await pool.query(
        queryStrings.update,
        [type.name, id]);
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



module.exports = { getAll, get, post, put, remove}