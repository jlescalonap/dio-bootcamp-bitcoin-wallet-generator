const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// Network selection
const network = bitcoin.networks.testnet;

// HD Wallets derivation
const path = `m/49'/1'/0'/0`;

// Seed generation
const mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Deterministic HD wallet root geration
let root = bip32.fromSeed(seed, network);

// Wallet account creation
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2pkh({
  pubkey: node.publicKey,
  network: network,
}).address;

console.log(`Generated wallet: 
Address: ${btcAddress}
Private Key: ${node.toWIF()}
Seed: ${mnemonic}
`);
