module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": "Last 2 Chrome versions, Firefox ESR",
          "node": "8.9"
        }
      }
    ],
    [
      "@babel/preset-react",
      {
        development: process.env.BABEL_ENV !== 'build',
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    ["module-resolver", {
      "src": ["./src"],
    }]
  ]
}
