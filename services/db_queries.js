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

    async function shoeBrandNameAndSize(brandname, size) {

        try {
            const query = `SELECT * FROM shoes WHERE brandname = $1 AND size = $2`;
            const result = await db.manyOrNone(query, [brandname, size]);
            return result;
        } catch (error) {
            console.log(error);
            return false
        }
    };

    async function update_sold_shoes(shoe_id){

        try{
            const query =`UPDATE shoes SET in_stock = in_stock - 1 WHERE shoe_id = $1`;
            const result =  await db.manyOrNone(query, [shoe_id]);
            return result;
        }catch(error){
            console.log(error);
            return false
        }
    };


    async function insert_shoes(name,brand,size,color,price,in_stock,image_url){
        try{
            const query = `INSERT INTO shoes (name,brand,size,color,price,in_stock,image_url` +
            `VALUES ($1, $2, $3, $4, $5, $6, $7)`;
            const result = await db.one(query,[name,brand,size,color,price,in_stock,image_url])
            return result;
        }catch(error){
            console.log(error);
            return false
        }
    };


    return {
        getAllShoes,
        getAllShoeSizes,
        getShoeColors,
        shoeBrandName,
        shoeBrandNameAndSize,
        update_sold_shoes,
        insert_shoes
    }
}