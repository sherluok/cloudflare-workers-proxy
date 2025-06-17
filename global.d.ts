/**
 * Wrangler bundle .html file type with esbuild text loader.
 * - https://developers.cloudflare.com/workers/wrangler/bundling
 * - https://esbuild.github.io/content-types/#text
 */
declare module '*.html' {
  const rawContent: string;
  export default rawContent;
}
