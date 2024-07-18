import { createHmac } from "crypto";

function sortObjDataByKey(object) {
    const orderedObject = Object.keys(object)
        .sort()
        .reduce((obj, key) => {
            obj[key] = object[key];
            return obj;
        }, {});
    return orderedObject;
}

function convertObjToQueryStr(object) {
    return Object.keys(object)
        .filter((key) => object[key] !== undefined)
        .map((key) => {
            let value = object[key];
            // Sort nested object
            if (value && Array.isArray(value)) {
                value = JSON.stringify(value.map((val) => sortObjDataByKey(val)));
            }
            // Set empty string if null
            if ([null, undefined, "undefined", "null"].includes(value)) {
                value = "";
            }

            return `${key}=${value}`;
        })
        .join("&");
}

export function isValidData(data, currentSignature, checksumKey) {
    const sortedDataByKey = sortObjDataByKey(data);
    const dataQueryStr = convertObjToQueryStr(sortedDataByKey);
    const dataToSignature = createHmac("sha256", checksumKey)
        .update(dataQueryStr)
        .digest("hex");
    return dataToSignature == currentSignature;
}

export function generateOrderCode(): number {
    const timestamp = new Date().getTime().toString();
    const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // 4 chữ số ngẫu nhiên
    const orderCode = timestamp.slice(-6) + randomPart; // Lấy 6 chữ số cuối của timestamp và 4 chữ số ngẫu nhiên
    return Number(orderCode);
}