const withTM = require("next-transpile-modules")([]);
const { withAxiom } = require("next-axiom");

const path = require("path");

module.exports = withAxiom(
  withTM({
    reactStrictMode: true,
    transpilePackages: [],
    output: "standalone",
    experimental: {
      outputFileTracingRoot: path.join(__dirname, "../../"),
    },
    images: {
      domains: ["localhost"],
      dangerouslyAllowSVG: true,
    },
  })
);
