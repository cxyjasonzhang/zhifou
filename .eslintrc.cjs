module.exports =  {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        // 关闭组件命名规则
        "vue/multi-word-component-names":"off",
        "@typescript-eslint/no-explicit-any": ["off"],
        "@typescript-eslint/ban-types": [
            "error",
            {
              "extendDefaults": true,
              "types": {
                "{}": false
              }
            }
          ]
    }
}
