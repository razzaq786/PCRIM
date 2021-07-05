const HMSTests = artifacts.require("HMSTests");

module.exports = function(deployer) {
  deployer.deploy(HMSTests);
};
