import * as dotenv from 'dotenv';
dotenv.config();
import jsonServer from "json-server";
import { routes } from './routes';
import { JsonValueType, JsonObjectType } from './models/json.type';

const jsonServerRoutes: { [k: string]: JsonValueType | JsonObjectType } = {};
for (const key in routes) {
    const urlKey = key.replace('/', '').replace(/\//g, '-')
    jsonServerRoutes[urlKey] = routes[key];
}

const server = jsonServer.create();
const router = jsonServer.router(jsonServerRoutes);
const middleware = jsonServer.defaults();
server.use(jsonServer.bodyParser)
server.use(middleware);
server.use(
    jsonServer.rewriter(
        Object.keys(routes)?.filter(i => i?.slice(1)?.includes('/'))?.reduce((p, c) => ({ ...p, ['/' + c.replace('/', '')]: '/' + c.replace('/', '').replace(/\//g, '-') }), {})
    )
);
server.use((req, res, next) => {
    const {
        url,
        // body,
        // query
    } = req
    const [baseUrl, id] = [url?.split('-')[0]?.replace('/', ''), url?.split('-')[1]?.split('?')[0]]
    let data: any
    if (!isNaN(+id)) {
        data = (jsonServerRoutes?.[baseUrl] as any[])?.find(i => i?.id == id)
        if (!!data) {
            return res.status(200).jsonp(data)
        } else {
            return res.status(404).jsonp({
                status: 404,
                message: 'not found',
            })
        }
    }
    next()
})

server.use(router);
const port = process.env.PORT
server.listen(port, () => {
    console.log(`JSON Server is running on http://localhost:${port}`);
})