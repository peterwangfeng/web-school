import {Application, helpers, isHttpError, Router, Status,} from "https://deno.land/x/oak@v11.1.0/mod.ts";
import {CORS} from "https://deno.land/x/oak_cors@v0.1.1/mod.ts";

const PORT = 8888
const WHITE_LIST = ['软件组', 'wf', '测试组']
const app = new Application();
app.use(CORS());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if (isHttpError(err)) {
            switch (err.status) {
                case Status.NotFound:
                    ctx.response.body = {code: Status.NotFound, message: err.message}
                    break;
                default:
                    ctx.response.body = {code: Status.InternalServerError, message: err.message}
                    break
            }
        } else {
            // rethrow if you can't handle the error
            ctx.response.body = {code: -1, message: err.message}
        }
    }
});


app.addEventListener('listen', ({hostname, port, serverType}) => {
    console.log(`${serverType} server running at http://${hostname}:${port}`)
})

app.addEventListener("error", (evt) => {
    // Will log the thrown error to the console.
    // ctx.response.body = {code: -1, message: evt.message}
    console.log(evt.error);
});

// const cert = Deno.readTextFileSync('www.test.com.pem')
// const key = Deno.readTextFileSync('www.test.com-key.pem')

await app.listen({
    // hostname: 'www.test.com',
    port: PORT,
    secure: true,
    // cert,
    // key,
    // alpnProtocols: ["h2", "http/1.1"],
});