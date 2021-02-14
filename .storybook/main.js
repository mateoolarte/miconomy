const path = require('path')

module.exports = {
  "stories": [
    // Paths to the story files
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.{js,ts,jsx,tsx}",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}
