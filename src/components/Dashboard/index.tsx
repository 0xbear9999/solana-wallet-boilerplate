/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import axios from "axios";


import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';

import { visuallyHidden } from '@mui/utils';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {
  useWallet,
} from '@solana/wallet-adapter-react';
import styles from './index.module.css'
import {
  AccountInfo,
  Connection,
  LAMPORTS_PER_SOL,
  PartiallyDecodedInstruction,
  ParsedInstruction,
  PublicKey,
  ParsedConfirmedTransaction,
  ConfirmedSignatureInfo,
  clusterApiUrl,
  TokenBalance
} from "@solana/web3.js";
import {
  DIGITALEYES_DIRECTSELL_PROGRAM_PUBKEY,
  DIGITALEYES_PROGRAM_PUBKEY,
  EXCHANGE_PROGRAM_PUBKEY,
  MAGIC_EDEN_PROGRAM_PUBKEY,
  SOLANART_PROGRAM_PUBKEY,
  SOLANA_MAINNET,
  SOLANA_MAINNET_SERUM,
  TOKEN_METADATA_PROGRAM_ID,
  SOLANA_TRX_FEE, SOLSEA_PROGRAM_PUBKEY,

} from '../config';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { programs } from '@metaplex/js';
const { metadata: { Metadata } } = programs;

interface Data {
  symbol: string;
  amount: number;
  price: number;
  coingeckoId: string;
  logoUrl: string;
}

function createData(
  symbol: string,
  amount: number,
  price: number,
  coingeckoId: string,
  logoUrl: string,
): Data {
  return {
    symbol,
    amount,
    price,
    coingeckoId,
    logoUrl
  };
}

interface Props {
  searchAddress: string,
}

var rows: Array<Data>;// = [createData('Cupcake', 305, 3.7, 67, 4.3)];

export const Dashboard = (props: Props) => {
  //
  //clusterApiUrl('devnet')
  const getTestData = async () => {
    var result = [];
    var price = 0;
    var address = 'AuVHHaKWu7jUmeNP1eJn25ogbY3CQ1gxe9T9neMkhTTU';
    const datahubRPC = "https://solana--mainnet.datahub.figment.io/apikey/ba11960d832a6415baeb2ae7e5f6acd3";
    var connection = new Connection(datahubRPC, "confirmed");
    var tpubKeys = await connection.getConfirmedSignaturesForAddress2(new PublicKey(address), { limit: 100 }, 'confirmed');
    var sigs: any = [];
    for (let tpubkey of tpubKeys) {
      sigs.push(tpubkey.signature);
    }
    connection = new Connection(clusterApiUrl('devnet'), "confirmed");
    let testtrx = await connection.getParsedTransaction('31wNaf2nWQ8NPxK3rL25ZKH3LA1X26wDpSgdeykkSzhGzwkqDuJxgekc6CyH5qWLjDvWbvE2XCZhbi7dHPdTN7ZD', 'confirmed');
    console.log('nft transfer sent : ', testtrx);
    testtrx = await connection.getParsedTransaction('3u6fJsXirFmo2UzRctkF5Zin7k7i28QZaCJBn5abMZXLSvofg9svNV5JCjQZFfQzsTba29XTguWY5K65ppn4u6WM', 'confirmed');
    console.log('token transfer sent : ', testtrx);

    //
    connection = new Connection(datahubRPC, "confirmed");
    // testtrx = await connection.getParsedTransaction('2eJU3n5uNJTPbwUriLkEkp9mh8VS7ruwMe1oBrdfdNoj9AtLKLXtMWcEFTzyfiAv1bf5X1rV7zAL1SK8xk4V9WuL', 'confirmed');
    // console.log('failed transaction :', testtrx);
    // testtrx = await connection.getParsedTransaction('PViBBdCjcvrVts6wLsAQQ7Xg1HbmwYekXVDoCksr2S1AuLNzTdUJXKU62MKhGbwnQhR17LhUZfzBn9xxPTXgUgj', 'confirmed');
    // console.log('nft tranfer received :', testtrx);
    // // let testtxs = await connection.getParsedTransactions(sigs, 'confirmed');
    // testtrx = await connection.getParsedTransaction('5zQGn12Jq3RR4crYXe7Yabp7geVW1sCEJVWWoREDvaLMVpphvvAkxw5VpYrxj16KnBtPumKtasQYuJr2Rap4NYt2', 'confirmed');
    // console.log('nft sold : ', testtrx);
    // testtrx = await connection.getParsedTransaction('4NS8iYuoxeMu1kduvGY1vkSpf71qHiapKoTnhDHsSPxBNR4ZZ5hK5g61MChHt4TvyJa4CZTkAbgtD8sLZKU233TN', 'confirmed');
    // console.log('nft bought unknown : ', testtrx);
    // testtrx = await connection.getParsedTransaction('3ASN7prZh2PGGZjp3WB5jjrgEnyzg9h8LcfmyQgU8dmsa4mvAU1L5cQH7uKbvpxHawoMvcuWPsFYAMPz5Mj5mUHv', 'confirmed');
    // console.log('nft uncaught bought :', testtrx);
    // testtrx = await connection.getParsedTransaction('3y5qgzgDzmJVa2VwS4bm8sTswka6Zesj8Giopv21E5PMtfoGPZvwYhuDjGCQqh2Q5fmn87oMaFnDVrD3Co3Vdtvs', 'confirmed');
    // console.log('nft mint : ', testtrx);

    // testtrx = await connection.getParsedTransaction('gJC8j3V3DdjYnPwVJMawLFfoygnrvMHyfyTFSTCBKTQgt2vEkG7pUzjC791LrkJFhnQNXsUogUAG7i3JtqNwrAZ', 'confirmed');
    // console.log('sol tranfer  :', testtrx);
    // testtrx = await connection.getParsedTransaction('43RpXrsYsXVqoMEQ7aSBgrw8raedKWynvt5CUGAasR4W3oAGmP8NFgGnigsh6NuUeFgHrFdFxE386Khr488yrXv2', 'confirmed');
    // console.log('sol tranfer  :', testtrx);
    // testtrx = await connection.getParsedTransaction('jeenRhw6JQ6rcau8wjjjRzr6DeVfemuGQqjKrtJq7JditXumE759P5hXydWYNUiAVeYSZ2yJQDPP6p7cquELxa4', 'confirmed');
    // console.log('unknown nft tranfer  :', testtrx);

    // testtrx = await connection.getParsedTransaction('5iH7vGXm5cTi5Bd3kdKFRMm8trVzd3fdWs2AnW535Zw75iD7FAXELyUS8Uu3kAynrsk1CeuC1D4szxx1hS7TikzF', 'confirmed');
    // console.log('unknown transaction( puff transfer-1 )  :', testtrx);
    // testtrx = await connection.getParsedTransaction('6wDc6SYXQExVTGj9vydxCChHZzp49W93qUyoRCgh5XJUA6Mfym4pWpVyCKTkKGP88ipd9AmbLmLJVYr9Q8BJwJf', 'confirmed');
    // console.log('unknown transaction( puff transfer-2)  :', testtrx);

    // testtrx = await connection.getParsedTransaction('2mF5FPRzueyHmnBahdcoBMAz6kRYSvFDJYiUa6r2WQ44xHypx5FYiASRhCAmHrqr8QKg9mbBZJZpELJgXw2tkyU4', 'confirmed');
    // console.log('unknown transaction( 1safu transfer)  :', testtrx);
    // testtrx = await connection.getParsedTransaction('4va9XNybuDF1BRLRHNEf5Qh3DhXky3L3mDxFsEo55TLu3Ft8X1gMafX1oQMesX4YLUpLtWeW9bQWJXQnSZt4xMA5', 'confirmed');
    // console.log('unknown transaction( safu <-> usdc swap transaction)  :', testtrx);
    // testtrx = await connection.getParsedTransaction('29JAQBJt1upWRU3HntAD9y8sTwQF5f5Z4xXg2TF8KiXqTWB87MimKrtjmkdbgTVDn7QF6d8R2tCzoE9Aig1cDghd', 'confirmed');
    // console.log('unknown transaction( pay funds on serum program)  :', testtrx);


    // testtrx = await connection.getParsedTransaction('5CPAr2D7SuKvt6tqdz9B27QxHGugsDjjarBAnMfpxWgupDruZyTikwrPaiQUjyeKJTnqJyX5aCwsRuS7yEZoz4ej', 'confirmed');
    // console.log('unknown transaction(multiple token transfer )  :', testtrx);

    // testtrx = await connection.getParsedTransaction('3W2XakkyYBBywQWjahnj4bnuxc3jfvbETEa37xxt1TYZr4ryTxP4DG7uRdHF8hKP8zg1Xxu3tmXG7LJEaxG9pgTs', 'confirmed');
    // console.log('swap transaction  :', testtrx);

    // testtrx = await connection.getParsedTransaction('4pYWqFHKzowocqdmUMM5LH2jTNUPq2NTQiey2Zdrc7pUrF4BVaxKLjYoAbN8tRAwRpE2oH4UkpR6rvWcJh9sR3V5', 'confirmed');
    // console.log('extra token received  :', testtrx);

    // testtrx = await connection.getParsedTransaction('43qCnb3jvh8Nv5B7jShkEPcK722SGtbmjkue9NbaXWAKTRFNQhuu2iZqeJcUZwEPgnAFQcEoKpY77muvgWxxnKTB', 'confirmed');
    // console.log('extra token sent   :', testtrx);

    // testtrx = await connection.getParsedTransaction('57MxmaxGKYz1eBYbYwBhZ9AdwynZxRxqyJuGQ4TeML2cAMzwNM7asnNe7KtNULjpdBz5P8TXfPr1Gjpb35mjx3ES', 'confirmed');
    // console.log('nft sold uncaught   :', testtrx);

    // testtrx = await connection.getParsedTransaction('3Y7yi3YjnnBpBQdr8d7koZET5tAexmckL5Af2Xxv67pn1U1EsdXnTpC9Uf2ztB58cp1Nmetv4J37BbyApdf2rWJX', 'confirmed');
    // console.log('sol transfer received uncaught   :', testtrx);

    // testtrx = await connection.getParsedTransaction('xd9rfrmavcyW4JAdqWdGvFf5w3ajDZRV1DbyvECHfYUWzJkHRe7GTw1TXzjzJofRYWvcU16ieEaVVbC8pd72LPL', 'confirmed');
    // console.log('nft transfer received uncaught   :', testtrx);
    // testtrx = await connection.getParsedTransaction('4eiLcg4ja1AV9gKvPBtMRSP5mbWVp1YuGi3PXeX7tDU6GzZLayDK39Gy7gD8ZRvCWccrofyX1YJRgEV19W8zqLf9', 'confirmed');
    // console.log('nft  uncuaught 1 :', testtrx);
    // testtrx = await connection.getParsedTransaction('5TjHs8C1QCUyCtofgnqYkeSQnMVuDfmmEtVCQNakgVaBbjQDxTaxNCc3xqaDd9FnbECoQeQAdoVTginahTncLnkh', 'confirmed');
    // console.log('nft  uncuaught 2  :', testtrx);
    // testtrx = await connection.getParsedTransaction('2iYEgpeUDYNJWCubkLuMmDxaRV6RsNrLrP9QcsnjyohxJ95hGPPbAuBK8tPQBxTTMpWP1AHaxurn1psHjyP9Dviq', 'confirmed');
    // console.log('sol transfer amount caught as 0  :', testtrx);
    // testtrx = await connection.getParsedTransaction('28Z9tzPiuqusBcqQEs9VMk9jdNtQQFreb2aVfy9KRrMTf62jXK3vdk9fRBWBDCqAikmPCA8zNovBFrunDrGd5CzE', 'confirmed');
    // console.log('sol transfer amount caught as 0  :', testtrx);
    // testtrx = await connection.getParsedTransaction('5XjqBGYRKgQ8JmCqHzighWLHgEkJY3nuGNFqrx3B1TpPDoRn5eoXz1vZ9TLZNuWqi9VczUfEMe8tnuryDuXcb8bN', 'confirmed');
    // console.log('sol transfer amount caught as 0  :', testtrx);
    // testtrx = await connection.getParsedTransaction('43S2Va1hFLUuyvA4espJK5nrn8Gr6uNRSX7EyhCf4HnnfbdRxT9NZXcfbx3vLpZo4whsTv6EF3j3bcYkZeVxQ3un', 'confirmed');
    // console.log('sol transfer amount caught as 0  :', testtrx);

    // testtrx = await connection.getParsedTransaction('651hnJnzjYFq4VBgS7j6tkhDdGAmevRquEWcshmLakZ66Z3RUTmgvFWNP81PGTxp5yCXQ2ce7yn5x2eegHejVg4z', 'confirmed');
    // console.log('nft transfer unknown (receive or sent by me??)  :', testtrx);

    // testtrx = await connection.getParsedTransaction('4N1q69p8Gm2tX5WW7GdQZa6LSd7ZbfH6S4RFmDFEcHCockNVB65cmSebfp9qP3kuddD3kYb8R3nJyPDXKVFrLM7D', 'confirmed');
    // console.log('nft mint uncaught 1 :', testtrx);
    // testtrx = await connection.getParsedTransaction('5yL1vFndFAqaRxD9p7zBkoMxyUBWojD7pdhZdZADVvBL1zmksvYXidu8sCZHDMvjwWToBz4nhbGw8bihMKZHsohx', 'confirmed');
    // console.log('nft mint uncaught 2 :', testtrx);

    // testtrx = await connection.getParsedTransaction('666VPNdqDbCmzTaEPPpTNWaS75ZusAGui9R8jdAFRPczjSGAZuHgJtiFj2ZRodcf2XQ8s8yCqrTbDtcFseyxmXhh', 'confirmed');
    // console.log('unknown transaction (its categoried to nft  bought with price 0) :', testtrx);
    // testtrx = await connection.getParsedTransaction('3wcZist4AvbYjGXmdcrLVLfMurzjJJGdLkkkyJq8oRuuu7pfJJA25hrYbMXVzUakLRb7mVshSehKZuvwHkVFo4QV', 'confirmed');
    // console.log('unknown transaction (its categoried to nft  sold with price 0 [ sign by me, my sol up, nft not sent or received]) :', testtrx);
    // testtrx = await connection.getParsedTransaction('3X8Dizo5NVoqGZUE9ASAddiFNoKAoxW91oaRniZnLoFbTdfeaB6WnRazMLE2aEN886erj69bTEbiXLox4NDCsucJ', 'confirmed');
    // console.log('unknown transaction (its categoried to nft  sold with price 0 [ sign by me, my sol up, nft not sent or received]) :', testtrx);
    // testtrx = await connection.getParsedTransaction('4uY7xnRNg89Cbb2i27aboSxocEz9TDD2o24Ch73J8zxirL47i4XeVtZya4DqKjUzoPhYx3bkMDKgzT2zuw45QVbe', 'confirmed');
    // console.log('unknown transaction (its categoried to nft  sold with price 0 [ sign by me, my sol up, nft not sent or received] in solanart) :', testtrx);

    // testtrx = await connection.getParsedTransaction('2TfGq1fE62M6KGFqhw7DC1Cs2jEq6ubmkfx75rG54YeZcoXZbARKfeYTMu2QNGEQYua9EMwD7uofDrcPixPPMmna', 'confirmed');
    // console.log('unknown transaction (its categoried to nft  bought with price 0 [ sign by me, my sol up, nft not sent from 2 to 3] in digitaleye) :', testtrx);

    // testtrx = await connection.getParsedTransaction('XQUiYdKpVBgcAYMLKd9akUoh7cwKKM1AtJjUJXd2NBBuH7wr2finjnfAGSi8tM3AwTSYSt6t1DDuDhpDagD6anF', 'confirmed');
    // console.log('miscategory  (to nft sold with price 0 in solanart):', testtrx);
    // testtrx = await connection.getParsedTransaction('GPNCYiwbXJLctYuFYPoxZUD4V9GRSnpD4KKD6ahf8TJypCcjZohm84tiRTy9fCcpFX222Z4T8GByKMLE8qafwmx', 'confirmed');
    // console.log('miscategory  (to nft sold with price 0 in solanart--category to nft unstake[ sol up, transfer nft to me ]):', testtrx);
    // testtrx = await connection.getParsedTransaction('5NQKKhEAds5qKv84RHG4Tv42x6jBDnAamJTUGiqtJ2Runwh5F3ygS9WYMET74fH9JwnE9pb1hW4sce39rGkzgQuz', 'confirmed');
    // console.log('miscategory  (to nft sold with price 0 in solanart--category to nft unstake[ sol up, transfer nft to me ]):', testtrx);

    // testtrx = await connection.getParsedTransaction('66ZuLHqY43ScP8NurDQhjrxQ2cJaN7r6UWHKjvwoRVgV5beoUvvYFNeAVX4suVms5cvThe5WQSLQgW7mvVqa28ru', 'confirmed');
    // console.log(' uncaught nft sold transaction (with ME 3.69sol):', testtrx);
    // testtrx = await connection.getParsedTransaction('2hEP9zBEB49riJmz1KqkdHTMJP8coCMEpHkW6Db8dXoBVeve7pVu5eSMPcqbi5XyNYZ7A7Hhpr46AiZmxvnT8puG', 'confirmed');
    // console.log(' uncaught nft sold transaction (with ME ):', testtrx);
    // testtrx = await connection.getParsedTransaction('3FNgmJXXjm1tVhv8zhyjADeYcGv4woVfAG9be68LGrj9z84aV2W8UHXbBNhmjZVpgAXinysmH9zJSRWVBWxYYocv', 'confirmed');
    // console.log(' uncaught nft sold transaction (with ME ):', testtrx);

    // testtrx = await connection.getParsedTransaction('4rMGMVxNnBeLNHm9wLT9BR97hjcCHgkudGyTHhqKnfHME629bAYRFTuqD7EQpU7AzFKcvPgqbPm58DCPzwH1dm6R', 'confirmed');
    // console.log(' uncaught nft bought transaction (could be mint ):', testtrx);

    // testtrx = await connection.getParsedTransaction('3Lq7ZzgjpNnvXDZCfBQL7nxpuxZopYV74dGE8fFf3yD2zcKCb37bMwPYwVo4qBsCW8JYoECtewQk45U3mxHsL2YA', 'confirmed');
    // console.log('unstake transaction in digitaleye :', testtrx);
    // testtrx = await connection.getParsedTransaction('LXp8YKkLdj6oTHvEW94q9PxV7N6q87KV7HfCDkrbEx6sox2DmzZHAUzRd1rynnbMsjYn486coY3y1bRC8x65mrv', 'confirmed');
    // console.log('unstake transaction in digitaleye :', testtrx);
    // testtrx = await connection.getParsedTransaction('5Zy2BGwYzGntLEfGFpmE3jjNacM5iWunFUoXYMCoGzgBXjgWkFsHnRa6E9gyWKHM2nuS39WMVqscLRgN24CDEDGF', 'confirmed');
    // console.log('unstake transaction in digitaleye :', testtrx);
    // testtrx = await connection.getParsedTransaction('3LyoSowTfsuQCUwv1eeAQtFvW8AzYtnhLTfTAeVLPfVVesiiGnuPTwEx7NXSKzHgL1mw7qAExvfYvqruuCmL6ENz', 'confirmed');
    // console.log('unstake transaction in solanart :', testtrx);
    // testtrx = await connection.getParsedTransaction('4XHHcns54W959GfXPdLR3hq2wT7Hro1uiErUUHuDPYbgmdxkBuo2DgV12aN51wwgrb94DadxVX9SdsciX3tBy1wD', 'confirmed');
    // console.log('unknown transaction in solanart ( sign by me, transfer nft to other, my sol up ) [currently category to nft  sold] :', testtrx);

    // testtrx = await connection.getParsedTransaction('482CjAFErTwXVmEGtDBVe32KitEcAUETzsmmzjEfEBJPhTfiT5qw2vRbbmDbH37fQd9nnETTcLnMxYr7HyPF3FYQ', 'confirmed');
    // console.log('exchange transaction in digitaleye :', testtrx);
    // testtrx = await connection.getParsedTransaction('5RHsjVDmyWhJ6QU3ND2rp3vrZRp5PiUi98kJxJLY9271j5HJowWdi7Ji3PBS7DSTFL6v2hwk7uBEMm8ip7x76KXh', 'confirmed');
    // console.log('exchange transaction in digitaleye --- sign by me, my sol up(miscategory to nft bought with price 0):', testtrx);

    // testtrx = await connection.getParsedTransaction('m3SVrJvCf362BNcGP5Ja147H2AW2uKk6i9DUXHd4TMoKRUah1MHx1YNZmCLAewSN85DeRnTUpne27TW6zZ56J4t', 'confirmed');
    // console.log('correct mft receive transaction', testtrx);

    // with ME v2
    testtrx = await connection.getParsedTransaction('21SQcYsucw7pNoYSZmTJCvWxn7tGfVbDef1oQfUb593V4SAgyaC1JiwZiH8KwoCXciTpDPdSRmKmCkEnGUqTqBFR', 'confirmed');
    console.log('-----cancel listing on MEv2', testtrx);
    testtrx = await connection.getParsedTransaction('39Wd951hvoMWHc9CZa8G4jgXmHG5vvpcrhn8jQPkYKcvZd4JEshfQzoihdKD7pSATmToQbNVvEpQp3rk817HrD7Q', 'confirmed');
    console.log('-----sale NFT on MEv2--2', testtrx);
    testtrx = await connection.getParsedTransaction('5fwuNDPjLWzaNMktLQZFizsDPcCZ2BXepWJQicLbiH9NUyvqmad38LTukiCEb7NDwz4NxPpnXV4fyyD8p2qhkQyj', 'confirmed');
    console.log('-----sale NFT on MEv2--1', testtrx);
    testtrx = await connection.getParsedTransaction('FNbLN3ggzjpratDdVDCjjJfxKJfMiXHFRVGgSKnnV2Cq8MDbzBcV741Y5axrgLTVEnoybhyyNHZd3AxPh9zgPB2', 'confirmed');
    console.log('-----listing NFT on MEv2 with set authority', testtrx);
    testtrx = await connection.getParsedTransaction('4fwpbKwbRUnKTpZKV9jCMGBaBN57ago6A4HsuwSJV4SiCJpMgNK8XpoiyCT7kki7FQcYu889oupXyTG3u383tSM2', 'confirmed');
    console.log('-----update price NFT on MEv2', testtrx);
    console.log('-----program address', (testtrx?.transaction.message.instructions[0] as PartiallyDecodedInstruction).programId.toBase58());

    testtrx = await connection.getParsedTransaction('5M8VxsvQYPNSFw5mAPBuc756aPpKbx5e5aCJ25zoAAZ7UAyT8iwMXq7nDTXpqKAqsNqdKhuuAaSCTVorkk4GwdeG', 'confirmed');
    console.log('-----uncaught nft bought on MEv2', testtrx);
    console.log('-----program address', (testtrx?.transaction.message.instructions[0] as PartiallyDecodedInstruction).programId.toBase58());

    testtrx = await connection.getParsedTransaction('2DcCtUQ9xJ8gGgoCyBPJ42Cd4TtYSDNUmk8hZmYQvPunfoGisvCtgYnAJVbGe9yJjuKx8819s3hcTAQFjDikSJwv', 'confirmed');
    console.log('-----uncaught nft bought--2 on MEv2', testtrx);
    testtrx = await connection.getParsedTransaction('2k2EtYchEmcytBdEBgbSrjspRpXkdhHu6pj1BVY9HyrhoE2V8n9kfwc3oCjDDjzx57UGF8YU4srDsw5AbFZpczTr', 'confirmed');
    console.log('-----uncaught nft bought--3 on MEv2', testtrx);
    console.log('-----program address', (testtrx?.transaction.message.instructions[0] as PartiallyDecodedInstruction).programId.toBase58());
    //newly uncaught
    testtrx = await connection.getParsedTransaction('3bUekuY5oKbXBBUGTKVU5zbeBuDKdSd3EmB9mNAMXTRuSRTeCQRXbbVfSwku7chghPZ1AvYvEnPvgBxUGc3D4YXn', 'confirmed');
    console.log('GXGkbf6CmWga8FbEW6aoqzbFgfvHRU8fEE5UgodUr1UG-----newly uncatched on MEv2', testtrx);
    console.log('-----program address', (testtrx?.transaction.message.instructions[0] as PartiallyDecodedInstruction).programId.toBase58());
    testtrx = await connection.getParsedTransaction('2Bn1bgGPpGynPD3zCMxcXw8DBsf5LCxYYWsE1GMveXKBQxSaogvGsCH4WDRPFhZV58P6vGXenrawTQTGruvZRsW8', 'confirmed');
    console.log('GXGkbf6CmWga8FbEW6aoqzbFgfvHRU8fEE5UgodUr1UG-----newly uncatched on MEv2', testtrx);
    console.log('-----program address', (testtrx?.transaction.message.instructions[0] as PartiallyDecodedInstruction).programId.toBase58());
    testtrx = await connection.getParsedTransaction('4ud6Sx29eoqHJrddwiUYBaLGZKSoJ2ximAjjJAGMHsF8BA2qNb24ajTbXTTsWFPSgTnAcK2odqu2h6jwPrrhxUAt', 'confirmed');
    console.log('4pKfWqGiVns69J6zS4zKJk5T4TCh5N7BH8AQWoqZy4GZ-----newly uncatched on MEv2', testtrx);
    console.log('-----program address', (testtrx?.transaction.message.instructions[0] as PartiallyDecodedInstruction).programId.toBase58());
    testtrx = await connection.getParsedTransaction('4vGcsJVPWBecjah3BpFee5LAeTVfbxhkwmPS2H2kbyLadf3Ex3mBjfPGNTMQzWyHLN65y2FKpv7PmTeQiDU4jMvQ', 'confirmed');
    console.log('4pKfWqGiVns69J6zS4zKJk5T4TCh5N7BH8AQWoqZy4GZ-----newly uncatched on MEv2', testtrx);
    console.log('-----program address', (testtrx?.transaction.message.instructions[0] as PartiallyDecodedInstruction).programId.toBase58());

    //uncatght sell
    testtrx = await connection.getParsedTransaction('49cA76ffEhdz5JXgPzTyBKSSVNxA8Mpwp8ptDzWQWuai9WFZRW5LwygLddqBuFNGWtWvp62CtDVL7MGw6SPL5JQU', 'confirmed');
    console.log('49cA76ffEhdz5JXgPzTyBKSSVNxA8Mpwp8ptDzWQWuai9WFZRW5LwygLddqBuFNGWtWvp62CtDVL7MGw6SPL5JQU-----newly uncatched sell on MEv2', testtrx);
    console.log('-----program address', (testtrx?.transaction.message.instructions[0] as PartiallyDecodedInstruction).programId.toBase58());
    testtrx = await connection.getParsedTransaction('4psmawS3YeL3C5ah7PpwW9NNMUVktcRtqucvpFdB6MkNe464srcUUXRjT6gqYaKRLzDhRfYrtAt1UHmJ9oztaB6D', 'confirmed');
    console.log('4psmawS3YeL3C5ah7PpwW9NNMUVktcRtqucvpFdB6MkNe464srcUUXRjT6gqYaKRLzDhRfYrtAt1UHmJ9oztaB6D-----newly uncatched sell on MEv2', testtrx);
    console.log('-----program address', (testtrx?.transaction.message.instructions[0] as PartiallyDecodedInstruction).programId.toBase58());
    //spl token transfer 
    connection = new Connection(clusterApiUrl('devnet'), "confirmed");
    testtrx = await connection.getParsedTransaction('5ArHawsEq8wcVKF7c5ZtCPA5NZkrMXRubk1AVychKNwYQsMyexEeEaYQJg9mbpfJRyhVB1qfMuJHn73jjLZKDwav', 'confirmed');
    console.log('spl-token transfer1 :', testtrx);
    console.log('spl-token transfer1 programID:', (testtrx?.transaction.message.instructions[0] as PartiallyDecodedInstruction).programId.toBase58());

    testtrx = await connection.getParsedTransaction('4mkthQA2ujXhE5S3UmYstrnfmxzeU5JCYU3Jz3MijaZ1Us8AxSXwBViWTAZxPBFRRUqUuod5vRJkUp4eSnjijpQP', 'confirmed');
    console.log('spl-token transfer2 :', testtrx);
    console.log('spl-token transfer2 programID:', (testtrx?.transaction.message.instructions[0] as PartiallyDecodedInstruction).programId.toBase58());

    //dice game won transaction
    testtrx = await connection.getParsedTransaction('4mkthQA2ujXhE5S3UmYstrnfmxzeU5JCYU3Jz3MijaZ1Us8AxSXwBViWTAZxPBFRRUqUuod5vRJkUp4eSnjijpQP', 'confirmed');
    console.log('dice game user won (0.05):', testtrx);
    console.log('dice game user won (0.05):', (testtrx?.transaction.message.instructions[0] as PartiallyDecodedInstruction).programId.toBase58());
    testtrx = await connection.getParsedTransaction('GdhddLfLAFwCmMLcvydf83f4msphL5meQoy5fK168jqRM5wxnK7KkkvPsKGCHKipcKcmtYSS1AaewhM52bGrnjR', 'confirmed');
    console.log('dice game user won (0.1):', testtrx);
    console.log('dice game user won (0.1):', (testtrx?.transaction.message.instructions[0] as PartiallyDecodedInstruction).programId.toBase58());
    testtrx = await connection.getParsedTransaction('2viUXQP1XZzwXh6Mep2MZJHYErtsGyDeJUk2qDgnsf9ynCu3zcV5J8FFp58AwGFbQzZFJ6Voe94W5RaDE3gE8Ydx', 'confirmed');
    console.log('dice game user lost (0.1):', testtrx);
    console.log('dice game user lost (0.1):', (testtrx?.transaction.message.instructions[0] as PartiallyDecodedInstruction).programId.toBase58());
    console.log('trx signer : ', testtrx?.transaction.message.accountKeys[0].pubkey.toBase58())

    //with ME v1
    // testtrx = await connection.getParsedTransaction('36L7bMSJ2gvgxki42zx8tm2BmP3kxJ1EW1HzGvjTUjMJUoFYHLHDNEBvejCK9NpG7rGCfMPky4duFf3weTka1qwW', 'confirmed');
    // console.log('-----sold NFT on MEv1', testtrx);
    // testtrx = await connection.getParsedTransaction('LFnxTShwNgMhU68G2knvMquHB9HL1YeSyzW1Ls7P8nZGX5Db1W8oZGcz9pKmr9ERwfE8N9hDQoQ3gJEvM8Q5ZjL', 'confirmed');
    // console.log('-----only listed NFT on MEv1 not sold--2', testtrx);
    // testtrx = await connection.getParsedTransaction('2cAECvFYZYZYtiPwEmAP4Y58qZ1GnW1Cn4xNssDu2cKo7XkK6i7BYwy9QmF6r8YeZ5N6SNDxbRStZBN2cs7LnYfH', 'confirmed');
    // console.log('-----only listed NFT on MEv1 not sold--1', testtrx);
    // testtrx = await connection.getParsedTransaction('3SkqRBJRJEcwQGHknr9Jw2JfWqrwDg1ofQnQXPYAVvd21VvS6mreCeSqrAth8MWq4s3eN7CfhMQJWZ5gKq6b9zaD', 'confirmed');
    // console.log('-----cancel listing NFT on MEv1', testtrx);
    // console.log('-----program address', (testtrx?.transaction.message.instructions[0] as PartiallyDecodedInstruction).programId.toBase58());

    // ME auction sale (could be with MEv2)
    //
    // testtrx = await connection.getParsedTransaction('4yThcBB92crBvyCqb1MmczGWLJdFHDU5xK5b2eNAjT3CPaZCsYcbZ9FyDpxhdnTRy8GDAt9ucKfdNqogyuFUjano', 'confirmed');
    // console.log('-----ME[v2] auction sale-2', testtrx);
    // testtrx = await connection.getParsedTransaction('BCPeW1K2nKDNjgxGQAyV5YbgycGGw4s1BX3dJLFAui3uHUbK7V9Ju4aEfD6cm5DzqWsw51fguT5pD4iWLswiBnc', 'confirmed');
    // console.log('-----ME[v2] auction sale-1', testtrx);
    // console.log('-----program address', (testtrx?.transaction.message.instructions[0] as PartiallyDecodedInstruction).programId.toBase58());

    //with solanart 
    // testtrx = await connection.getParsedTransaction('4Qu2qaecv8ShxFrPapfrvjxpEkaRQETEgMgmtUJToCckvtwYKwzSc3M3vXFZYLd39An1EuWZRUffqctvbGro1eM5', 'confirmed');
    // console.log('----- listing NFT on solanart--1', testtrx);
    // testtrx = await connection.getParsedTransaction('59p3js7B6xSrARszfjqwDKUiQcnz98DFHfvC3B8cLiiwfFUxQstSxrsxirvZyhw3yL34ujZRVW2VoonR9BZgCdQM', 'confirmed');
    // console.log('----- listing NFT on solanart--2', testtrx);
    // testtrx = await connection.getParsedTransaction('2zjYS5fiofqZBESrc57SpAKkRyzNbqKrTdcs2xBAyxqDrQDW2LZVx89RZjwGWQcqjBbuXVWBCX6Sr1gKR2xLXC9q', 'confirmed');
    // console.log('----- listing NFT on solanart--3', testtrx);
    // testtrx = await connection.getParsedTransaction('4kBJf7iX9y2eXFL43PeU4yRD4KAQDxB3Kj1rEhhHcMbQ353UmGcTswTKhw2tDj1jCANip6hE3E33BhRFKNQ3NdJU', 'confirmed');
    // console.log('----- buy NFT on solanart--1', testtrx);
    // testtrx = await connection.getParsedTransaction('2oVvWWBRsqyJNmURyg3QvSjEKaABA8DmsHRsAQP61m7oMW26dzmnS7nDNnpfM1ii6tFP8J5mrtaoD7axf6qQXVjn', 'confirmed');
    // console.log('----- buy NFT on solanart--2', testtrx);
    // testtrx = await connection.getParsedTransaction('5wQSogw5v9wzPAwxcZV4sMGNyAt7yZ15ah3uTgeKVDAJBTHJL2hc5THB68FQDNT9pARAa4nXBJ5mwokebr3aPyAT', 'confirmed');
    // console.log('----- update price on solanart', testtrx);

    //with digitaleyes
    // testtrx = await connection.getParsedTransaction('21Tbte6Z1eiJKGZr78XrwuJyfozXF11kcfZjD1rKKE6ztrfzsTByScC7EhZHA8g6CqsToQtUgD31SMF1W6mD78Tr', 'confirmed');
    // console.log('----- sold on digitaleyes', testtrx);

    let testtxs = await connection.getParsedTransactions(sigs, 'finalized');
    var time = '';

    console.log('transaction length : ', testtxs.length);
    for (testtrx of testtxs) {


      var signer = testtrx?.transaction.message.accountKeys[0].pubkey.toBase58();

      if (!testtrx?.meta || testtrx.meta.err) continue;

      let prebalance = testtrx?.meta?.preBalances[0] as number;
      let postBalances = testtrx?.meta?.postBalances[0] as number;

      var preTokenBalances = testtrx?.meta?.preTokenBalances as TokenBalance[];
      var postTokenBalances = testtrx?.meta?.postTokenBalances as TokenBalance[];
      //added
      var trxFee = testtrx?.meta.fee;

      if ((prebalance - postBalances - trxFee) / LAMPORTS_PER_SOL >= 0.005) price = (prebalance - postBalances - trxFee) / LAMPORTS_PER_SOL;

      time = (new Date((testtrx.blockTime ?? 0) * 1000)).toLocaleString();

      var instructionlength = testtrx?.transaction.message.instructions.length as number;
      // if( testtrx.transaction.signatures[0]==='3orwgrm3N9RwL3HEfJncn7o25xo4ciGXMGFxV7g34QPSV6x9uZ8scKh6qG2bwiCmDBCuCLZgxAz6PMuacqVYN8fw' ){
      //   console.log('XXXXXXXXXXXXXXXXXXXXXXX')
      // }


      for (let k = 0; k < instructionlength; k++) {
        var partiallyDecodedInstruction = testtrx?.transaction.message.instructions[k] as PartiallyDecodedInstruction;

        // if (testtrx.transaction.signatures[0] === "PViBBdCjcvrVts6wLsAQQ7Xg1HbmwYekXVDoCksr2S1AuLNzTdUJXKU62MKhGbwnQhR17LhUZfzBn9xxPTXgUgj") {
        //   console.log('-------------------------------');
        // }

        if (!partiallyDecodedInstruction.data && !partiallyDecodedInstruction.accounts) {

          var parsedInstruction = testtrx?.transaction.message.instructions[k] as ParsedInstruction;



          // if (testtrx.transaction.signatures[0] == "PViBBdCjcvrVts6wLsAQQ7Xg1HbmwYekXVDoCksr2S1AuLNzTdUJXKU62MKhGbwnQhR17LhUZfzBn9xxPTXgUgj") {
          //   console.log('this parsed instruction');
          //   console.log('parsedInstruction', parsedInstruction);
          // }

          if (parsedInstruction.program == 'system' && parsedInstruction.parsed.type == "transfer") {
            continue;
            //
            if (signer != address) {
              result.push({ 'transaction': testtrx?.transaction.signatures, 'type': 'sol transfer deposit', 'time': time, 'balance': parseFloat(price.toFixed(2)) });
            }
            else {
              result.push({ 'transaction': testtrx?.transaction.signatures, 'type': 'sol transfer withdrew', 'time': time, 'balance': -price.toFixed(2) });
            }
            break;
          } else if (parsedInstruction.program == 'spl-token' && parsedInstruction.parsed.type == 'transferChecked' && parsedInstruction.parsed.info.tokenAmount.decimals == 0) {
            continue;
            //get nft transfer transaction info and push it to result array


            var mintInfo = {
              'mint': postTokenBalances[0].mint,
              'name': '',
              'symbol': '',
              'uri': ''
            }
            try {
              let metadataAccount = await Metadata.getPDA(postTokenBalances[0].mint);
              var ownedMetadata = await Metadata.load(connection, metadataAccount);
              mintInfo = {
                'mint': postTokenBalances[0].mint,
                'name': ownedMetadata?.data.data.name,
                'symbol': ownedMetadata?.data.data.symbol,
                'uri': ownedMetadata?.data.data.uri
              }

              console.log(postTokenBalances[0].mint, ownedMetadata);
            } catch {

              console.log(postTokenBalances[0].mint, 'Failed to fetch metadata');
            }

            if (signer == address) {
              result.push({
                'transaction': testtrx?.transaction.signatures,
                'type': 'nft transfer sent',
                'time': time,
                'mintInfo': {
                  'mint': mintInfo.mint,
                  'name': mintInfo.name,
                  'symbol': mintInfo.symbol,
                  'uri': mintInfo.uri,
                }
              })
            }
            else {
              result.push({
                'transaction': testtrx?.transaction.signatures,
                'type': 'nft transfer received',
                'time': time,
                'mintInfo': {
                  'mint': mintInfo.mint,
                  'name': mintInfo.name,
                  'symbol': mintInfo.symbol,
                  'uri': mintInfo.uri,
                }
              })
            }
            break;

          } else if (parsedInstruction.program == 'spl-token' && parsedInstruction.parsed.type == 'mintTo' && signer == address) {

            // continue;
            // get nft detail info from mint address
            var mintInfo = {
              'mint': postTokenBalances[0].mint,
              'name': '',
              'symbol': '',
              'uri': ''
            }
            try {
              let metadataAccount = await Metadata.getPDA(postTokenBalances[0].mint);
              var ownedMetadata = await Metadata.load(connection, metadataAccount);
              mintInfo = {
                'mint': postTokenBalances[0].mint,
                'name': ownedMetadata?.data.data.name,
                'symbol': ownedMetadata?.data.data.symbol,
                'uri': ownedMetadata?.data.data.uri
              }

              console.log(postTokenBalances[0].mint, ownedMetadata);
            } catch {

              console.log(postTokenBalances[0].mint, 'Failed to fetch metadata');
            }

            //push nft mint transaction info to result array
            console.log('nft mint transaction-------------', testtrx);
            if (preTokenBalances.length == 0 && postTokenBalances.length != 0 && postTokenBalances[0].uiTokenAmount.decimals == 0)
              result.push({
                'transaction': testtrx?.transaction.signatures,
                'type': 'nft mint',
                'time': time,
                'balance': -price.toFixed(2),
                'nftInfo': mintInfo
              });
            break;
          }

        } else {
          continue;
          if (!partiallyDecodedInstruction || !partiallyDecodedInstruction.data) continue;
          const program = partiallyDecodedInstruction.programId.toBase58();

          // if( testtrx.transaction.signatures[0]==='3orwgrm3N9RwL3HEfJncn7o25xo4ciGXMGFxV7g34QPSV6x9uZ8scKh6qG2bwiCmDBCuCLZgxAz6PMuacqVYN8fw' ){
          //   console.log('inner XXXXXXXXXXXXXXXXXXXXXXX program : ', program)
          // }


          if ((program == SOLANART_PROGRAM_PUBKEY.toBase58() && (partiallyDecodedInstruction.data.indexOf('54') == 0 || partiallyDecodedInstruction.data.indexOf('4h') == 0)) ||
            (program == MAGIC_EDEN_PROGRAM_PUBKEY.toBase58() && partiallyDecodedInstruction.data.indexOf('3UjL') == 0) ||
            (program == DIGITALEYES_PROGRAM_PUBKEY.toBase58() && partiallyDecodedInstruction.data.indexOf('jz') == 0) ||
            (program == DIGITALEYES_DIRECTSELL_PROGRAM_PUBKEY.toBase58() && partiallyDecodedInstruction.data.indexOf('xc') == 0) ||
            (program == EXCHANGE_PROGRAM_PUBKEY.toBase58() && partiallyDecodedInstruction.data.indexOf('jzD') == 0) ||
            (program == SOLSEA_PROGRAM_PUBKEY.toBase58() && parseInt(partiallyDecodedInstruction.data, 16) > 234)
          ) {
            var mintInfo = {
              'mint': postTokenBalances[0].mint,
              'name': '',
              'symbol': '',
              'uri': ''
            }
            try {
              let metadataAccount = await Metadata.getPDA(postTokenBalances[0].mint);
              var ownedMetadata = await Metadata.load(connection, metadataAccount);
              mintInfo = {
                'mint': postTokenBalances[0].mint,
                'name': ownedMetadata?.data.data.name,
                'symbol': ownedMetadata?.data.data.symbol,
                'uri': ownedMetadata?.data.data.uri
              }

              console.log(postTokenBalances[0].mint, ownedMetadata);
            } catch {

              console.log(postTokenBalances[0].mint, 'Failed to fetch metadata');
            }


            if (signer != address) {

              result.push({
                'transaction': testtrx?.transaction.signatures,
                'type': 'nft sold',
                'time': time,
                'balance': parseFloat(price.toFixed(2)),
                'mintInfo': {
                  'mint': mintInfo.mint,
                  'name': mintInfo.name,
                  'symbol': mintInfo.symbol,
                  'uri': mintInfo.uri,
                }
              })
            } else {

              result.push({
                'transaction': testtrx?.transaction.signatures,
                'type': 'nft bought',
                'time': time,
                'balance': -price.toFixed(2),
                'mintInfo': {
                  'mint': mintInfo.mint,
                  'name': mintInfo.name,
                  'symbol': mintInfo.symbol,
                  'uri': mintInfo.uri,
                }
              })
            }
            break;
          }
        }


      }
    }
    console.log('+++++++++++++++++++++++++++++++++++++++++')
    console.log(result);
    console.log('+++++++++++++++++++++++++++++++++++++++++')
  }




  React.useEffect(() => {
    getTestData();

  }, []);

  var baseUrl = "http://92.38.130.111:443/wallet-tokens/";
  const [loading, setLoading] = React.useState(false);
  const [color, setColor] = React.useState("#333333");
  let tB = 0;
  const wallet = useWallet();
  let walletAddress = "";
  if (wallet.connected && wallet.publicKey) {
    // 
    walletAddress = wallet.publicKey.toString();
  }

  let walletData: Array<Data>;
  const [apiData, setApidata] = React.useState([])

  const [rowData, setrowData] = React.useState([] as Data[])
  // if (walletAddress !== '') baseUrl = "http://92.38.130.111:443/wallet-tokens/".concat(walletAddress);

  const getData = async () => {
    console.log(props.searchAddress);
    setLoading(true);
    if (props.searchAddress === '' && walletAddress === '') {
      setrowData([]);
      setLoading(false);
      return;
    }
    let burl = '';
    if (props.searchAddress !== '') {
      burl = baseUrl + props.searchAddress;
    } else if (wallet.connected) {
      burl = baseUrl + walletAddress;
    }
    console.log(burl);
    console.log("start loading")
    try {
      await axios.get(burl).then((response) => {
        setrowData(response.data);

      }).catch(function (error) {
        console.log(error);
      }).then(function () {

        console.log("get walltdata function  executed");
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    console.log("start end!")
    return;
  }

  React.useEffect(() => {
    getData();

  }, [props.searchAddress, walletAddress]);

  //
  const [orderBy, setOrderBy] = React.useState<keyof Data>('price');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <h3>Net Worth</h3>
      <h4>
        {(walletAddress === '' && props.searchAddress === '') && "$0.00"}
        {(walletAddress !== '' || props.searchAddress !== '') && rowData.length === 0 && "$0.00"}
        {
          (walletAddress !== '' || props.searchAddress !== '') &&
          rowData.length > 0 &&
          rowData.map((row, index) => {
            tB += row.amount * row.price;
            if (index === rowData.length - 1) return "$" + (tB.toFixed(2));
          })
        }
      </h4>
      <h4>
        {walletAddress.slice(0, 6)}...{walletAddress.slice(-6)}
      </h4>
      <div >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>History</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.panelSubTitle}>
              <div>
                <span className={styles.totalBalance} >
                  $0.00
                </span>
                <span className={styles.priceChangePercent}>
                  &nbsp;&nbsp; - 0%
                </span>
              </div>
              <div>
                <ButtonGroup variant="outlined" color='inherit' aria-label="outlined button group">
                  <Button size="small">1D</Button>
                  <Button>1W</Button>
                  <Button>1M</Button>
                  <Button>1Y</Button>
                  <Button>ALL</Button>
                </ButtonGroup>
              </div>
            </div>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            {/* <Typography>Accordion 2</Typography> */}
            <div className={styles.panelSubTitle}>
              <span>
                Tokens
              </span>
              <span>
                {(walletAddress === '' && props.searchAddress === '') && "$0.00"}
                {(walletAddress !== '' || props.searchAddress !== '') && rowData.length === 0 && "$0.00"}
                {
                  (walletAddress !== '' || props.searchAddress !== '') &&
                  rowData.length > 0 &&
                  rowData.map((row, index) => {
                    tB += row.amount * row.price;
                    if (index === rowData.length - 1) return "$" + tB.toFixed(2);
                  })
                }
              </span>
            </div>
          </AccordionSummary>
          <AccordionDetails >
            <Paper sx={{ width: '95%', mb: 2 }} className="sweet-loading">

              <TableContainer>
                <Table
                  sx={{ maxWidth: "100%" }}
                  aria-labelledby="tableTitle"
                  size={dense ? 'small' : 'medium'}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">

                      </TableCell>

                      <TableCell
                        align={'left'}
                        padding={'normal'}
                      >
                        Symbol
                        <TableSortLabel>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        align={'right'}
                        padding={'normal'}
                      >
                        Balance
                        <TableSortLabel>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        align={'right'}
                        padding={'normal'}
                      >
                        Price
                        <TableSortLabel>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        align={'right'}
                        padding={'normal'}
                      >
                        Value
                        <TableSortLabel>
                        </TableSortLabel>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <p>

                    </p>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with: rows.slice().sort(getComparator(order, orderBy)) */}
                    {walletAddress !== '' && rowData.length > 0 && rowData.map((row, index) => {
                      // const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={row.symbol}
                        >
                          <TableCell padding="checkbox">

                          </TableCell>
                          <TableCell

                            scope="row"
                            align={'left'}
                            padding={'none'}
                          >
                            <div style={{ display: 'inline-flex', height: '100%' }}>
                              <img src={row.logoUrl} className={styles.logoUrl}></img>
                              <div style={{ display: 'inline-block' }}><p> {row.symbol}</p></div>
                            </div>

                          </TableCell>

                          <TableCell
                            align={'right'}
                            padding={'none'}>
                            {row.amount !== 0 ? row.amount.toFixed(6) === '0.000000' ? "<0.000001" : row.amount.toFixed(6) : '-'}
                          </TableCell>
                          <TableCell
                            align={'right'}
                            padding={'none'}
                          >
                            {"$" + (row.price)}
                          </TableCell>
                          <TableCell
                            align={'right'}
                            padding={'none'}
                          >
                            {row.amount !== 0 ? "$" + (row.amount * row.price).toFixed(2) : '-'}
                          </TableCell>
                        </TableRow>
                      );
                    })
                    }

                  </TableBody>
                </Table>
              </TableContainer>

              <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '60px' }}>
                <ClipLoader color={color} loading={loading} size={50} />
              </div>
            </Paper>
          </AccordionDetails>

        </Accordion>


      </div>


    </>
  );
}