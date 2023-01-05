const walletSecretKey = process.env.SOLANA_WALLET_SECRET_KEY;

import {
  Metaplex,
  bundlrStorage,
  keypairIdentity,
} from "@metaplex-foundation/js";
import {
  getOrCreateAssociatedTokenAccount,
  createAssociatedTokenAccount,
  transferChecked,
} from "@solana/spl-token";
import axios from "axios";
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import bs58 from "bs58";
const connection = new Connection(clusterApiUrl("devnet"));
const wallet = Keypair.fromSecretKey(bs58.decode(walletSecretKey));

const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(wallet))
  .use(bundlrStorage({ address: "https://devnet.bundlr.network" }));

async function getMetadata(nfts, i, nftsWithMetadata) {
  const nft = nfts[i];
  // if (nft.uri === "uri") return;
  // console.log(nft.uri,);
  try {
    const data = await axios.get(nft.uri);
    const metadata = data.data;
    nft.metadata = metadata;
    nftsWithMetadata.push(nft);
  } catch (error) {
    console.log(error.message);
  }

  if (i < nfts.length - 1) {
    i++;
    await getMetadata(nfts, i, nftsWithMetadata);
  }
}

class CreateNFTService {
  async airdrop(recipient, amount) {
    const txhash = await connection.requestAirdrop(
      new PublicKey(recipient),
      amount * LAMPORTS_PER_SOL
    );
    return txhash;
  }
  async getNFTsByPublicKey(publicKey) {
    const nftsWithMetadata = [];
    const key = new PublicKey(publicKey);
    const nfts = await metaplex.nfts().findAllByOwner({ owner: key });
    let i = 0;

    // console.log(nfts);
    if (nfts.length > 0) {
      await getMetadata(nfts, i, nftsWithMetadata);
    }
    // console.log(nftsWithMetadata);
    return nftsWithMetadata;
    // nfts.forEach((nft) => {
    //   const nftData = {
    //     name: nft.name,
    //     nftAddress: nft.address.toBase58(),
    //     uri: nft.uri,
    //     symbol: nft.symbol,
    //     sellerFeeBasisPoints: nft.sellerFeeBasisPoints,
    //     creators: nft.creators,
    //   };
    //   console.log(nftData);
    // });
    // return nfts;
  }

  async createMetaData(image, name, description) {
    const { uri } = await metaplex.nfts().uploadMetadata({
      name,
      description,
      image,
    });
    return uri;
  }
  async mintMFTfromMetadata(uri, name, symbol) {
    const { nft } = await metaplex.nfts().create({
      uri,
      name,
      symbol,
      sellerFeeBasisPoints: 1000, // Represents 10.00%.
    });
    return nft;
  }
  async createTokenAccount(mintID, recipient) {
    const to = new PublicKey(recipient);
    mintID = new PublicKey(mintID);

    const ata = await createAssociatedTokenAccount(
      connection, // connection
      wallet, // fee payer
      mintID, // mint
      to // owner,
    );
    // console.log(ata);
    console.log(ata.toBase58(), "ATA");
    return ata;
  }
  async getTokenAccount(mint, owner) {
    owner = owner ? owner : wallet.publicKey.toBase58();

    owner = new PublicKey(owner);

    mint = new PublicKey(mint);
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      mint,
      owner
    );
    return tokenAccount;
  }

  async transferNFT(mintID, from, to) {
    mintID = new PublicKey(mintID);

    const txhash = await transferChecked(
      connection, // connection
      wallet, // payer
      from, // from (should be a token account)
      mintID, // mint
      to, // to (should be a token account)
      wallet, // from's owner
      1, // amount, if your deciamls is 8, send 10^8 for 1 token
      0 // decimals
    );
    return txhash;
  }
}
export default new CreateNFTService();
