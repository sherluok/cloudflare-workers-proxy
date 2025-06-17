import fallbackHTML from './fallback.html';

export default {
  async fetch(request): Promise<Response> {
    const method = request.method.toUpperCase();

    // [OPTIONS] CORS for request from browser
    if (method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Headers': '*',
        },
      });
    }

    const target = request.url.slice(new URL(request.url).origin.length + 1);
    const headers = new Headers(request.headers);

    // Respond fallback.html if the pathname is not a valid URL
    try {
      new URL(target);
    } catch {
      return new Response(fallbackHTML, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    }

    // [GET, HEAD]
    if (!request.body) {
      return fetch(target, { method, headers });
    }

    // [POST, PUT, DELETE]
    const stream = new TransformStream();
    request.body.pipeTo(stream.writable);
    return fetch(target, { method, headers, body: stream.readable });
  },
} satisfies ExportedHandler<Env>;
