const handleFirebase =(error)=>{
    switch (error.errorInfo.code){
        case "auth/email-already-exists":
            return getErrorObject("User already exist.","email")
        case "auth/claims-too-large":
        case "auth/id-token-expired	The provided":
        case "auth/id-token-revoked":
        case "auth/insufficient-permission":
        case "auth/internal-error":
        case "auth/invalid-argument":
        case "auth/invalid-claims":
        case "auth/invalid-continue-uri":
        case "auth/invalid-creation-time":
        case "auth/invalid-credential":
        case "auth/invalid-disabled-field":
        case "auth/invalid-display-name":
        case "auth/invalid-dynamic-link-domain":
        case "auth/invalid-email":
        case "auth/invalid-email-verified":
        case "auth/invalid-hash-algorithm":
        case "auth/invalid-hash-block-size":
        case "auth/invalid-hash-derived-key-length":
        case "auth/invalid-hash-key":
        case "auth/invalid-hash-memory-cost":
        case "auth/invalid-hash-parallelization":
        case "auth/invalid-hash-rounds":
        case "auth/invalid-hash-salt-separator":
        case "auth/invalid-id-token":
        case "auth/invalid-last-sign-in-time":
        case "auth/invalid-page-token":
        case "auth/invalid-password":
        case "auth/invalid-password-hash":
        case "auth/invalid-password-salt":
        case "auth/invalid-phone-number":
        case "auth/invalid-photo-url":
        case "auth/invalid-provider-data":
        case "auth/invalid-provider-id":
        case "auth/invalid-oauth-responsetype":
        case "auth/invalid-session-cookie-duration":
        case "auth/invalid-uid":
        case "auth/invalid-user-import":
        case "auth/maximum-user-count-exceeded":
        case "auth/missing-android-pkg-name":
        case "auth/missing-continue-uri":
        case "auth/missing-hash-algorithm":
        case "auth/missing-ios-bundle-id":
        case "auth/missing-uid":
        case "auth/missing-oauth-client-secret":
        case "auth/operation-not-allowed":
        case "auth/phone-number-already-exists":
        case "auth/project-not-found":
        case "auth/reserved-claims":
        case "auth/session-cookie-expired":
        case "auth/session-cookie-revoked":
        case "auth/uid-already-exists":
        case "auth/unauthorized-continue-uri":
        case "auth/user-not-found":
            return getErrorObject("Error occurred","error")
    }
}

const getErrorObject = (message,fieldName)=>{
    return {message:[{message:message,path:[fieldName]}]}
}

module.exports = handleFirebase;