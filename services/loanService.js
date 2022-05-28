const {getAllLonsDB, addLoanTypeDB, isLoanTypeExist, updateLoanTypeByLid, getLoanById} = require("../repositories/publicRepository/loanRepository");
const {getFile, deleteFile} = require("./storageService");
const {STORAGE, LOAN_TYPE_TABLE} = require("../constants/const");
module.exports = {

    getAllLoans:async()=>{
        const loanTypes = await getAllLonsDB();
        const updatedLoans = await Promise.all(
            loanTypes.map(async loan=>{
                const loanIcon = await getFile(STORAGE.LOCATIONS.LOAN_ICONS,loan[LOAN_TYPE_TABLE.LOAN_ID]);
                if (loanIcon) {
                    loan.icon = loanIcon
                }
                return loan
            })
        );
        return updatedLoans
    },

    addLoanType: async (details)=>{
        const isLoanExist = await isLoanTypeExist(details.loanName);

        if (isLoanExist && isLoanExist.archived){
            await updateLoanTypeByLid(isLoanExist.loanId, {archived: false});
            await deleteFile(STORAGE.LOCATIONS.LOAN_ICONS,details.loanId)
            return isLoanExist.loanId
        }
        return  (await addLoanTypeDB(details))[0];
    },

    deleteLoan:async (id)=>{

        const isLoanExist = await getLoanById(id);
        if (!isLoanExist.archived){
            await updateLoanTypeByLid(id, {archived: true});
            await deleteFile(STORAGE.LOCATIONS.LOAN_ICONS, id)
        }
    }
}
