import JSEncrypt from "jsencrypt";

export const createGetSign = (url = '', paramStr = '') => {
    let privateKey = `-----BEGIN RSA PRIVATE KEY-----\n${privateKey}-----END RSA PRIVATE KEY-----\n`

    let temp = Date.now() / 1000;
    let method = 'GET';
    let signStr = '';
    if (paramStr) {
        signStr = `${method}&${url}&${temp.toFixed(0)}&`;
    } else {
        signStr = `${method}&${url}&${temp.toFixed(0)}&&${encodeURIComponent(paramStr)}`;
    }
    var encrypt = new JSEncrypt();
    encrypt.setPrivateKey(privateKey);
    var sign = encrypt.sign(signStr, CryptoJS.SHA256, "sha256");

    let signHeader = `t=${temp.toFixed(0)},v=${sign}`;

    return signHeader;
}

export const createPostSign = (url = '', paramBody = {}) => {
    let privateKey = `-----BEGIN RSA PRIVATE KEY-----\n${privateKey}-----END RSA PRIVATE KEY-----\n`

    let temp = Date.now() / 1000;
    let method = 'POST';
    let signStr = `${method}&${url}&${temp.toFixed(0)}&${JSON.stringify(paramBody)}`;
    var encrypt = new JSEncrypt();
    encrypt.setPrivateKey(privateKey);
    var sign = encrypt.sign(signStr, CryptoJS.SHA256, "sha256");

    let signHeader = `t=${temp.toFixed(0)},v=${sign}`;

    return signHeader;
}
const signGetHeader = createGetSign('/gateway/v1/ew-balances', '');
const body = {
    "bp_order_id": "testBpOrderId",
    "transaction_id": "23162345423",
    "pay_amount": "23.65",
    "pay_currency": "USD"
};
const signPostHeader = createPostSign('/gateway/v1/ew-payouts', body);

