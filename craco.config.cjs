module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.module.rules.forEach(rule => {
                if (rule.oneOf) {
                    rule.oneOf.forEach(subRule => {
                        if (subRule.test && /\.(png|svg)$/.test(subRule.test.toString())) {
                            subRule.loader = require.resolve('null-loader');
                        }
                    });
                }
            });
            return webpackConfig;
        },
    },
};