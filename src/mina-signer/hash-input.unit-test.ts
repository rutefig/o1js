import { expect } from 'expect';
import { isReady } from '../snarky.js';
import { PublicKey as PublicKeySnarky } from '../lib/signature.js';
import { PublicKey } from '../provable/curve-bigint.js';
import { AccountUpdate, Json } from '../provable/gen/transaction-bigint.js';

await isReady;

let publicKeyBase58 = 'B62qmfmZrxjfRHfnx1QJLHUyStQxSkqao9civMXPaymkknX5PCiZT7J';

let pkSnarky = PublicKeySnarky.fromBase58(
  'B62qmfmZrxjfRHfnx1QJLHUyStQxSkqao9civMXPaymkknX5PCiZT7J'
);

let pk = PublicKey.fromJSON(publicKeyBase58);
expect(pk.x).toEqual(pkSnarky.x.toBigInt());
expect(pk.isOdd).toEqual(pkSnarky.isOdd.toField().toBigInt());
expect(PublicKey.toJSON(pk)).toEqual(publicKeyBase58);

let accountUpdateJsonString =
  '{"body":{"publicKey":"B62qmfmZrxjfRHfnx1QJLHUyStQxSkqao9civMXPaymkknX5PCiZT7J","tokenId":"yEWUTZqtT8PmCFU32EXwCwudK4gtxCWkjcAC7eTwj2riWhCV8M","update":{"appState":["9",null,null,null,null,null,null,null],"delegate":"B62qrja1a2wu3ciKygrqNiNoDZUsHCcE1VfF4LZQtQkzszWhogpWN9i","verificationKey":null,"permissions":{"editState":"Proof","send":"Signature","receive":"Proof","setDelegate":"Signature","setPermissions":"None","setVerificationKey":"None","setZkappUri":"Signature","editSequenceState":"Proof","setTokenSymbol":"Signature","incrementNonce":"Signature","setVotingFor":"Signature"},"zkappUri":null,"tokenSymbol":"BLABLA","timing":{"initialMinimumBalance":"1","cliffTime":"0","cliffAmount":"0","vestingPeriod":"1","vestingIncrement":"2"},"votingFor":null},"balanceChange":{"magnitude":"14197832","sgn":"Negative"},"incrementNonce":true,"events":[["0"],["1"]],"sequenceEvents":[["0"],["1"]],"callData":"6743900749438632952963252074409706338210982229126682817949490928992849119219","callDepth":1,"preconditions":{"network":{"snarkedLedgerHash":null,"timestamp":null,"blockchainLength":null,"minWindowDensity":null,"totalCurrency":null,"globalSlotSinceHardFork":null,"globalSlotSinceGenesis":null,"stakingEpochData":{"ledger":{"hash":"4295928848099762379149452702606274128891023958431976727769309015818325653869","totalCurrency":null},"seed":null,"startCheckpoint":null,"lockCheckpoint":null,"epochLength":null},"nextEpochData":{"ledger":{"hash":null,"totalCurrency":null},"seed":null,"startCheckpoint":null,"lockCheckpoint":"16957731668585847663441468154039306422576952181094510426739468515732343321592","epochLength":null}},"account":{"balance":{"lower":"1000000000","upper":"1000000000"},"nonce":null,"receiptChainHash":null,"delegate":"B62qrja1a2wu3ciKygrqNiNoDZUsHCcE1VfF4LZQtQkzszWhogpWN9i","state":["9",null,null,null,null,null,null,null],"sequenceState":null,"provedState":null,"isNew":true}},"useFullCommitment":false,"caller":"yEWUTZqtT8PmCFU32EXwCwudK4gtxCWkjcAC7eTwj2riWhCV8M","authorizationKind":"None_given"},"authorization":{"proof":null,"signature":null}}';
let accountUpdateJson: Json.AccountUpdate = JSON.parse(accountUpdateJsonString);

let accountUpdate = AccountUpdate.fromJSON(accountUpdateJson);

// JSON roundtrip
expect(JSON.stringify(AccountUpdate.toJSON(accountUpdate))).toEqual(
  accountUpdateJsonString
);
