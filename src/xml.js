import xml from 'xml2js';

/**
 * @description A function that maps XML URI's from the index URL.
 * @param {string} indexUrl - the index URL that contains XML's representing more sitemaps.
 * @returns {Promise | never} A Promise containing URL's that point to XML's with sitemaps.
 */

export async function getSitemapsFromIndexURL(indexUrl) {
	try {
		const RawLOCs = await xml.parseStringPromise(indexUrl);
    return RawLOCs.sitemapindex.sitemap.flatMap(childSitemap => childSitemap.loc);
	} catch (error) {
		console.log({error, origin: '[xml] getSitemapsFromIndexURL(indexUrl)', parameter: indexUrl});
	}
}