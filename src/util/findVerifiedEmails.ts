import axios from 'axios';

const makeEmailList = (firstName: string, lastName: string, domain: string) => {
    return [
        `${firstName}@${domain}`,
        `${lastName}@${domain}`,
        `${firstName}.${lastName}@${domain}`,
        `${firstName}_${lastName}@${domain}`,
        `${firstName}_${lastName[0]}@${domain}`,
        `${firstName}${lastName}@${domain}`,
        `${firstName}.${lastName[0]}@${domain}`,
        `${firstName}${lastName[0]}@${domain}`,
        `${firstName[0]}${lastName}@${domain}`,
        `${firstName[0]}.${lastName}@${domain}`,
    ]
}

export interface VerificationResult {
    email: string;
    verified: boolean;
}

const verifyEmail = async (email: string) => {
    const response = (await axios.get(`https://emailverification.whoisxmlapi.com/api/v1?apiKey=${process.env.REACT_APP_EMAILVERIFICATION_KEY}&emailAddress=${email}`)).data;
    return { email, verified: JSON.parse(response.smtpCheck) };
}

const findVerifiedEmails = async (
    firstName: string,
    lastName: string,
    domain: string): Promise<VerificationResult[]> => {

    if (!firstName || !lastName || !domain) { return [] };
    const emailList = makeEmailList(
        firstName.toLowerCase(),
        lastName.toLowerCase(),
        domain.toLowerCase()
    );
    const results = await Promise.all(emailList.map(verifyEmail));

    const verifiedResults = results.filter(result => result.verified);
    const unVerifiedResults = results.filter(result => !result.verified);
    return [...verifiedResults, ...unVerifiedResults];
}

export default findVerifiedEmails;

