import { environment } from "src/environments/environment";

const { baseURL } = environment;

export const urls = {
    authURL: `${ baseURL }/auth`,
}