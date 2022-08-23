import { isAsFields } from 'dist/server/lib/proof_system';
import {
  Bool,
  CircuitValue,
  Field,
  prop,
  PublicKey,
  UInt64,
  Experimental,
  Token,
} from 'snarkyjs';
import { VotingMerkleTree } from './run';

export class Member extends CircuitValue {
  private static count = 0;

  @prop publicKey: PublicKey;
  @prop tokenId: Field;
  @prop balance: UInt64;
  @prop accountId: Field;

  // will need this to keep track of votes for candidates
  @prop votes: Field;
  @prop isCandidate: Bool;

  // just to avoid double voting, but we can also ignore this for now
  @prop hashVoted: Bool;

  @prop witness: VotingMerkleTree;

  private constructor(
    publicKey: PublicKey,
    tokenId: Field,
    balance: UInt64,
    accountId: Field
  ) {
    super();
    this.publicKey = publicKey;
    this.tokenId = tokenId;
    this.balance = balance;
    this.hashVoted = Bool(false);
    this.accountId = accountId;
    this.isCandidate = Bool(false);
    this.votes = Field.zero;
    let w = {
      isLeft: false,
      sibling: Field.zero,
    };
    this.witness = new VotingMerkleTree(
      Array.from(Array(VotingMerkleTree.height).keys()).map(() => w)
    );
  }

  // I am defining a custom toFields method here because some things arent important when e.g. hashing
  toFields(): Field[] {
    return this.publicKey
      .toFields()
      .concat(this.tokenId.toFields())
      .concat(this.balance.toFields())
      .concat(this.accountId.toFields())
      .concat(this.votes.toFields())
      .concat(this.isCandidate.toFields())
      .concat(this.hashVoted.toFields());
  }

  addVote(): Member {
    this.votes = this.votes.add(1);
    return this;
  }

  static empty() {
    return new Member(PublicKey.empty(), Field.zero, UInt64.zero, Field.zero);
  }

  // TODO: ofFields(xs: Field[])

  static from(publicKey: PublicKey, tokenId: Field, balance: UInt64) {
    this.count++;
    return new Member(
      publicKey,
      tokenId,
      balance,
      Field.fromNumber(this.count)
    );
  }
}
