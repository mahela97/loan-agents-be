const {getAllLonsDB, addLoanTypeDB, isLoanTypeExist, updateLoanTypeByLid} = require("../repositories/publicRepository/loanRepository");
const {getFile} = require("./storageService");
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

        if (isLoanExist){
            await updateLoanTypeByLid(isLoanExist.loanId, {archived: false});
            return;
        }
        return  (await addLoanTypeDB(details))[0];
    }
}