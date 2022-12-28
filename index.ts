import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import {
  viewEngine,
  ejsEngine,
  oakAdapter,
} from "https://deno.land/x/view_engine@v10.5.1/mod.ts";

const router = new Router();
const colors = [];

const app = new Application();

app.use(
  viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views",
  })
);

router
  .post("/", async (ctx) => {
    const body = ctx.request.body({ type: "form" });
    const value = body.value;
    const mycolor = (await value).get("color");
    colors.push(mycolor);
    ctx.response.redirect("/")
  })
  .get("/", (ctx) => {
    ctx.render("main.ejs", { colors });
  });

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });