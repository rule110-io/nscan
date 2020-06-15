module.exports = {
  extends: ["stylelint-config-airbnb",
            "stylelint-config-rational-order",
            "stylelint-prettier/recommended"],
  plugins: ["stylelint-order", "stylelint-scss"],
  rules: {
     "max-nesting-depth": null,
  }
};
