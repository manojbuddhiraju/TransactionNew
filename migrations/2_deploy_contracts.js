const Token = artifacts.require("Token");
const Transactions = artifacts.require("Transactions");

module.exports = async function(deployer) {
    // deploy token
  await deployer.deploy(Token);
  const token = await Token.deployed()

  //deploy transactions
  await deployer.deploy(Transactions,token.address);
  const transaction = await Transactions.deployed()

  await token.transfer(transaction.address,'1000000000000000000000000')
};