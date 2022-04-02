const {getDbAllSocialMedia} = require("../repositories/socialMediaRepositories/socialMediaRepository");
module.exports = {
    getAllSocialMedias:async () => {
    return getDbAllSocialMedia();
    }
}