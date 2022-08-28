const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@components": "src/cmps",
    "@assets": "src/assets",
    "@services": "src/services",
    "@actions": "src/store/actions/",
    "@pages": "src/pages"
  })(config);

  return config;
};
