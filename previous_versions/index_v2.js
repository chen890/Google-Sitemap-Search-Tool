import fetchFrom from "../src/http.js";
import { getSitemapsFromIndexURL } from "../src/xml.js";

import xml2json from "xml2js";
// Readline
import * as readline from "node:readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const siteMapURL = await rl.question("Input sitemap URL: ");
rl.close();
const rl1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const sitemapOrProfile = await rl1.question(
  "For MMSID  insert `mmsid` and for Profile insert `profile`? "
);
if (sitemapOrProfile === "mmsid") {
  rl1.close();
  const rl2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const MMSID = await rl2.question("Enter MMSID: ");
  rl2.close();
  console.log("Please wait for the search resutls....");
  async function mapSitemaps(sitemap) {
    try {
      const siteMapXML = await fetchFrom(sitemap);
      const parsedXMLSitemap = await xml2json.parseStringPromise(siteMapXML);
      return parsedXMLSitemap.urlset.url
        .flatMap((entry) => entry.loc)
        .flatMap((loc) => ({
          loc,
          assetId: Number(loc.split("/").pop()),
        }))
        .reduce((acc, currentItem) => {
          if (currentItem.assetId === Number(MMSID)) {
            acc.push({ location: currentItem.loc, sitemap });
          }
          return acc;
        }, []);
    } catch (error) {
      //console.log({error, origin: '[index] fetchFrom(sitemap)', parameters: [{ sitemap, siteMapXML, parsedXMLSitemap }]});
    }
  }

  async function searchMMIDs() {
    try {
      const sitemapsURL = await fetchFrom(siteMapURL);
      const sitemaps = await getSitemapsFromIndexURL(sitemapsURL);
      const mappedSitemaps = await Promise.all(sitemaps.map(mapSitemaps));
      const [result] = mappedSitemaps.flat(Infinity);
      console.log(result);
    } catch (error) {}
  }
  searchMMIDs();
}
if (sitemapOrProfile === "profile") {
  rl1.close();
  const rl2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const researcher_url_identifier = await rl2.question(
    "Enter URL Identifier: "
  );
  rl2.close();
  console.log("Please wait for the search resutls....");
  async function mapSitemaps(sitemap) {
    try {
      const siteMapXML = await fetchFrom(sitemap);
      const parsedXMLSitemap = await xml2json.parseStringPromise(siteMapXML);
      return parsedXMLSitemap.urlset.url
        .flatMap((entry) => entry.loc)
        .flatMap((loc) => ({
          loc,
          parameter_input: loc.split("/").pop(),
        }))
        .reduce((acc, currentItem) => {
          if (currentItem.parameter_input === researcher_url_identifier) {
            acc = [...acc, { location: currentItem.loc, sitemap }];
          }
          return acc;
        }, []);

      // return parsedXMLSitemap.urlset.url
      // 	.flatMap(entry => entry.loc)
      // 	.flatMap(loc => ({
      // 		loc,
      // 		url_identifier: String(loc.split('/').pop()),
      // 	}))
      // 	.reduce((acc, currentItem) => {
      // 		if (currentItem.url_identifier === String(researcher_url_identifier)) {
      // 			acc.push({ location: currentItem.loc, sitemap});
      // 		}
      // 		return acc;
      // 	}, []);
    } catch (error) {
      console.log({
        error,
        origin: "[index] fetchFrom(sitemap)",
        parameters: [{ sitemap, siteMapXML, parsedXMLSitemap }],
      });
    }
  }
  async function searchProfile() {
    try {
      const sitemapsURL = await fetchFrom(siteMapURL);
      const sitemaps = await getSitemapsFromIndexURL(sitemapsURL);
      const mappedSitemaps = await Promise.all(sitemaps.map(mapSitemaps));
      const [result] = mappedSitemaps.flat(Infinity);
      console.log(result);
    } catch (error) {
      //console.log({error, origin: '[index] searchMMIDs()', parameters: undefined});
    }
  }
  searchProfile();
}
