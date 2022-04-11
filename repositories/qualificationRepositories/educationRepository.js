const knex = require("../../db/db-config");
const {EDUCATION_TABLE} = require("../../constants/const");
module.exports = {

    addEducationToDB:async (educationDetails)=>{
        return knex(EDUCATION_TABLE.NAME).insert(educationDetails);
    },

    updateEducationInDB:async (eid, educationDetails)=>{
        return knex(EDUCATION_TABLE.NAME).update(educationDetails).where(EDUCATION_TABLE.EDUCATION_ID, eid);
    },

    deleteEducationInDB:async (eid)=>{
        return knex(EDUCATION_TABLE.NAME).delete().where(EDUCATION_TABLE.EDUCATION_ID, eid);
    }
}