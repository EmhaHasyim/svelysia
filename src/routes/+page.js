// Hero page is fully static; all interactivity (theme, parallax, eden health
// check) runs client-side. Prerender it so the main route is served from
// Workers Assets and never wakes the SSR Worker.
export const prerender = true
