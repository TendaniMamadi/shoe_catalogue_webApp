export default function db_queries(db) {
    async function getAllShoes() {

        try {
            const query = 'SELECT * FROM shoes';
            const result = await db.many(query);
            return result;
        } catch (error) {
            console.log(error);
            return false
        }
    };

    async function getAllShoeSizes(size) {

        try {
            const query = `SELECT * FROM shoes where size = ${size}`;
            const result = await db.manyOrNone(query);
            return result;
        } catch (error) {
            console.log(error);
            return false
        }
    };

    async function getShoeColors(color) {

        try {
            const query = `SELECT * FROM shoes where color = $1`;
            const result = await db.manyOrNone(query, [color]);
            return result;
        } catch (error) {
            console.log(error);
            return false
        }

    };

    async function shoeBrandName(brandname) {

        try {
            const query = `SELECT * FROM shoes where brandname = $1`;
            const result = await db.manyOrNone(query, [brandname]);
            return result;
        } catch (error) {
            console.log(error);
            return false
        }
    };

    async function shoeBrandNameAndSize(brandname,size) {

        try {
            const query = `SELECT * FROM shoes WHERE brandname = $1 AND size = $2`;
            const result = await db.manyOrNone(query, [brandname,size]);
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
            return false
        }
    };

    return {
        getAllShoes,
        getAllShoeSizes,
        getShoeColors,
        shoeBrandName,
        shoeBrandNameAndSize
    }
}