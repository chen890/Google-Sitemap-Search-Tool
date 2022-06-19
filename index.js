import axios from 'axios';
import xml2json from 'xml2js';
// Readline 
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output, stdout } from 'node:process';

import SitemapExtractor from './sitemap-extractor.js';

/**
 * @param {string} URL: https://usc-researchmanagement.esploro.exlibrisgroup.com/view/google/ResearchAsset/siteindex.xml
 * @param {string} MMSID: 99449313802621
 */

// const rl = readline.createInterface({ input: process.stdin, output: process.stdout});
// const siteMapURL = await rl.question('Input sitemap URL: ');
// rl.close();
// const rl2 = readline.createInterface({ input: process.stdin, output: process.stdout});
// const MMSID = await rl2.question('Enter MMSID: ');
// rl2.close();
// console.log('Please wait for the search resutls....')

const [siteMapURL, MMSID] = process.argv.slice(2);

async function mapSitemaps(sitemap) {
    const siteMapXML = await SitemapExtractor.fetchSitemapXML(sitemap);
    const parsedXMLSitemap = await xml2json.parseStringPromise(siteMapXML);
    const sitemapRawLOCs = SitemapExtractor.extractLOCs(parsedXMLSitemap);
    const mappedLOCs = sitemapRawLOCs.flatMap(entry => entry.loc);
    const mappedLocsWithAssetID = mappedLOCs.map(loc => ({ loc, assetId: Number(loc.split('/').slice(-1)) }));
    const filteredMappedLocs = mappedLocsWithAssetID.filter(match => match.assetId === Number(MMSID));
    return filteredMappedLocs.length > 0 ? filteredMappedLocs[0].loc : filteredMappedLocs;
}

async function searchMMIDs() {
  try {
    const sitemaps = await SitemapExtractor.extract(siteMapURL);
    const mappedSitemaps = await Promise.all(sitemaps.map(mapSitemaps));
    const results = mappedSitemaps.filter(item => !Array.isArray(item));
    console.log(results)
  } catch (error) {
    console.log({ error });
  }
}

searchMMIDs();