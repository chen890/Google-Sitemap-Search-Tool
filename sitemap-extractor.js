import axios from 'axios';
import xml2json from 'xml2js';

export default class SitemapExtractor {
	static locations; // Getting <loc> tags
	static sitemaps; //The sitemaps

	static async getLocations(url) {
		try {
			const result = await axios.get(url);
			const parsedSitemap = await xml2json.parseStringPromise(result.data);
			SitemapExtractor.locations = parsedSitemap;
		} catch (error) {
			console.log({error, context: 'getLocations'});
		}
	}

	static extractSitemaps() {
		SitemapExtractor.sitemaps = SitemapExtractor.locations.sitemapindex.sitemap;
	}

	//Reorder the sitemaps in ASC sorting
	static mapAndSortSitemaps() {
		SitemapExtractor.sitemaps = SitemapExtractor.sitemaps.map(record => record.loc[0]);
		SitemapExtractor.sitemaps = SitemapExtractor.sitemaps.sort((a, b) => a.slice(-1) - b.slice(-1));
	}

	//Extract the sitemaps URL from the <loc> tags.
	static async extract(url) {
		try {
			await SitemapExtractor.getLocations(url);
			SitemapExtractor.extractSitemaps();
			SitemapExtractor.mapAndSortSitemaps();
			return this.sitemaps;
		} catch (error) {
      console.log({error, context: 'extract'})
    }
	}

	static async fetchSitemapXML(sitemapURL) {
		try {
      const response = await axios.get(sitemapURL);
      return response.data;
		} catch (error) {
			console.log({error, context: 'fetcSitemapXML'});
		}
	}

  static extractLOCs(sitemapURL) {
    return sitemapURL.urlset.url;
  }

  static extractLocMMSID(locURLs) {
    return locURLs.map(loc => ({ loc, assetId: Number(loc.split('/').slice(-1)) }));
  }

  static filterResults(locs, target) {
    return locs.filter(match => match.assetId === Number(target))
  }
 
	static get Sitemaps() {
		return SitemapExtractor.sitemaps;
	}
}
