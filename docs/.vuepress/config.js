module.exports = {
  title: "web3-cmt.js",
  base: "/web3-cmt.js/",
  themeConfig: {
    nav: [
      {
        text: "Quickstart",
        link: "/"
      },
      { text: "API", link: "/api/" }
    ],
    sidebar: [
      "/",
      {
        title: "API Reference",
        collapsable: false,
        children: [
          ["api/", "web3"],
          "api/cmt",
          "api/validator",
          "api/delegator",
          "api/governance"
        ]
      }
    ],
    sidebarDepth: 1,

    repo: "CyberMiles/web3-cmt.js",
    repoLabel: "GitHub"
  }
}
