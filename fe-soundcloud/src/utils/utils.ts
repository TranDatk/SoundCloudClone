export function calLeft(moment : number){
    const hardCodeDuration = 199;
    const percent = (moment / hardCodeDuration) * 100;
    return `${percent}%`
}

export function extractNumberFromString(str : string): string {
    // Tách chuỗi bằng dấu "=" và lấy phần tử cuối cùng trong mảng kết quả
    const parts = str.split('=');
    const lastPart = parts[parts.length - 1];
    // Chuyển đổi chuỗi số thành số nguyên và trả về
    return lastPart;
}