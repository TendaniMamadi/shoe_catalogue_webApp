import assert from 'assert';
import db_queries from '../services/db_queries.js';
import pgPromise from 'pg-promise';
import 'dotenv/config';

const pgp = pgPromise({});
const connectionString = process.env.DATABASE_URL_TEST;

const db = pgp(connectionString);
let dbQueries = db_queries(db);

// Test cases
describe('Database test', function () {
    this.timeout(20000);

    it('should be able to get all shoes', async function () {
        // Write test logic for getAllShoes function
        const result = await dbQueries.getCredentials('Mary', 'password456');
        assert.strictEqual(false, result.admin);
    });

    it('should be able to get brand name', async function () {
        // Write test logic for getBrandName function
        const result = await dbQueries.getCredentials('Mike', 'password000');
        assert.strictEqual(true, result.admin);
    });


    it('should be able to get shoe sizes', async function () {
        // Write test logic for getShoeSizes function
        const result = await dbQueries.getWaiterId('Mary');
        assert.strictEqual(1, result);
    });

    it('sshould be able to get shoe color', async function () {
        // Write test logic for  getShoeColors function
        const result = await dbQueries.showAllDays();
        assert.deepStrictEqual(
            [
                {
                    "day_id": 1
                    , "day_name": "Monday"
                },
                 {
                    "day_id": 2
                        ,"day_name": "Tuesday"
                },
                      {
                    "day_id": 3
                       , "day_name": "Wednesday"
                },
                      {
                    "day_id": 4
                       , "day_name": "Thursday"
                },
                      {
                    "day_id": 5
                       , "day_name": "Friday"
                },
                      {
                    "day_id": 6
                       , "day_name": "Saturday"
                },
                      {
                    "day_id": 7
                        ,"day_name": "Sunday"
                }


            ], result);
    });

    it('should get brand name and shoe size', async function () {
        // Write test logic for getBrandNameAndSize function
        const result = await dbQueries.getDayId('brandName','size');
        assert.strictEqual(1, result);
    });

    it('should be able to insert new shoes', async function () {
        // Write test logic for insertNewShoes function
        const result = await dbQueries.getSelectedDays('Monday', 'Tuesday');
        assert.deepStrictEqual([], result);
    });

    it('should be able to update when shoe is sold', async function () {
        // Write test logic for updateSoldStock function
        const result = await dbQueries.insertWaiterAndDayIdIntoShiftTable('Mary', ['Monday', 'Tuesday']);
        assert.strictEqual(true, result);
    });

    after(function () {
        db.$pool.end(); // Close the pool after all tests are finished
    });
});
