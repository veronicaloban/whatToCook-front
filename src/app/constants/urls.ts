import { environment } from "../../environments/environment";

const { baseURL } = environment;

export const urls = {
    authURL: `${ baseURL }/auth`,
    recipesURL: `${ baseURL }/recipes`
}