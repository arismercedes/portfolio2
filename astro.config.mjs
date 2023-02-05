import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default {
    integrations: [tailwind({
      // Disable injecting a basic `base.css` import on every page.
      config: { applyBaseStyles: false },
    })],
  }
