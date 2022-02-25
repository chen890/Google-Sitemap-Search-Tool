import axios from 'axios';
import xml2json from 'xml2js';

class SitemapExtractor {
  static locations;
  static sitemaps;

  static async getLocations(url) {
    const result = await axios.get(url);
    const parsedSitemap = await xml2json.parseStringPromise(result.data);
    SitemapExtractor.locations = parsedSitemap;
  }

  static extractSitemaps() {
    SitemapExtractor.sitemaps = SitemapExtractor.locations.sitemapindex.sitemap;
  }

  static mapAndSortSitemaps() {
    SitemapExtractor.sitemaps = SitemapExtractor.sitemaps.map(record => record.loc[0]);
    SitemapExtractor.sitemaps = SitemapExtractor.sitemaps.sort((a, b) => a.slice(-1) - b.slice(-1));
  }

  static async extract(url) {
    await SitemapExtractor.getLocations(url);
    SitemapExtractor.extractSitemaps();
    SitemapExtractor.mapAndSortSitemaps();
    return this.sitemaps;
  }

  static get Sitemaps() {
    return SitemapExtractor.sitemaps;
  }
}

SitemapExtractor.extract('https://researchrepository.rmit.edu.au/view/google/ResearchAsset/siteindex.xml').then((sitemap) => {
  axios.get(sitemap[0]).then(res => {
    xml2json.parseString(res.data, (err, result) => {
      const shorter = result.urlset.url.map(record => record.loc[0]).map(uri => uri.replace('https://', ''));
      const MMSID = (shorter.map(url => url.split('/').slice(-1)).flat(Infinity)).map(Number);
      console.log(MMSID)
    })
  })
});

