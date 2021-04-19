const pool= require('../db.js')

const queryStrings = {
    selectAll: 'SELECT * FROM "med_type" ORDER BY "id"',
    select: 'SELECT * FROM "med_type" WHERE "id" = $1',
    selectByTypeId: 'SELECT * FROM "med_type" WHERE "type_id" = $1',
    insert: 'INSERT INTO "med_type" (name, price, description, type_id) VALUES ($1, $2, $3, $4) RETURNING *',
    update: 'UPDATE "med_type" SET name = $1, price = $2, description = $3, type_id=$4 WHERE id = $5 RETURNING *',
    delete: 'DELETE FROM "med_type" WHERE id = $1'
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

async function post(med_type) {
    const query = await pool.query(
        queryStrings.insert,
        [med_type.name, med_type.price, med_type.description, med_type.type_id]);
    if (query.rows.length < 1) {
        return null;
    }
    return query.rows[0];
}

async function put(id, med_type) {
    const query = await pool.query(
        queryStrings.update,
        [med_type.name, med_type.price, med_type.description, med_type.type_id, id]);
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

async function findByTypeId(id)
{
    const query = await pool.query(
        queryStrings.selectByTypeId,
        [id]);
    if (query.rows.length < 1) {
        return [];
    }
    return query.rows;
}


module.exports = { getAll, get, post, put, remove, findByTypeId}