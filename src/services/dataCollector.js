import { load } from 'cheerio';
import redaxios from 'redaxios'


export async function scrap(direc, id) {
    try {
        const Response = await redaxios.get(direc);
        const $ = load(Response.data);
        const title = $(id);
        console.log("loading")
        return title.html();
    } catch (error) {
        console.log(error);
        return "ocurrio un error";
    }
}