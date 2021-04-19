const pool= require('../db.js')

const queryStrings = {
    selectAll: 'SELECT * FROM "user" ORDER BY "id"',
    select: 'SELECT * FROM "user" WHERE "id" = $1',
    selectByUsername: 'SELECT * FROM "user" WHERE "username" = $1',
    insert: 'INSERT INTO "user" (name, surname, username, password, age) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    update: 'UPDATE "user" SET name = $1, surname = $2, username = $3, password = $4, age = $5 WHERE id = $6 RETURNING *',
    delete: 'DELETE FROM "user" WHERE id = $1',
    selectByIdArr: 'SELECT * FROM "user" WHERE "id" = ANY ($1)'
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

async function post(user) {
    const query = await pool.query(
        queryStrings.insert,
        [user.name, user.surname, user.username, user.password, user.age]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, user) {
    const query = await pool.query(
        queryStrings.update,
        [user.name, user.surname, user.username, user.password, user.age, id]);
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

async function getByIdArr(arr)
{
    const query = await pool.query(
        queryStrings.selectByIdArr,
        [arr]);
    if (query.rows.length < 1) {
        return [];
    }
    return query.rows;
}

module.exports = { getAll, get, post, put, remove, findByUsername, getByIdArr }