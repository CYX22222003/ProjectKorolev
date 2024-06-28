// jest.config.js
module.exports = {
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(.*@mui/x-date-pickers|@babel/runtime))",
    "jest-runner",
    ],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy',
    },
    transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
    },

    "reporters": [
	    "default",
	    ["./node_modules/jest-html-reporter", {
		    "pageTitle": "Test Report"
	    }]
    ]
  };
  