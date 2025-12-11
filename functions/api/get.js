export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/get") {
      const id = url.searchParams.get("id");
      if (!id) {
        return new Response("Missing ID", { status: 400 });
      }

      // Load private links.txt from Pages assets
      const file = await env.ASSETS.fetch("links.txt");

      const text = await file.text();
      const lines = text.split("\n");

      for (let line of lines) {
        line = line.trim();
        if (line.startsWith(id + "=")) {
          const found = line.split("=")[1].trim();
          return new Response(found, {
            status: 200,
            headers: { "Content-Type": "text/plain" }
          });
        }
      }

      return new Response("Not found", { status: 404 });
    }

    return env.ASSETS.fetch(request);
  }
};
