export const mapArrayToQueryParams = (key, array) => {
    if (!array) return "";
    return array
        .map(o => {
            return typeof o !== "undefined" && o !== "undefined" ? key + "=" + o : "";
        })
        .join("&");
}

export const mapQueryParams = (params) => {
    if (!params) {
        return "";
    }
    let queryParam = "?";
    Object.keys(params).forEach(key => {
        const value = String(params[key]);
        if (key !== "id" && value !== "" && typeof params[key] !== "undefined" && value !== "undefined" && value !== 'null') {
            if (Array.isArray(params[key])) {
                let arrayStr = mapArrayToQueryParams(key, params[key]);
                queryParam += arrayStr ? arrayStr + "&" : "";
            } else {
                queryParam += key + "=" + value + "&";
            }
        }
    });
    return queryParam.slice(0, -1);
}