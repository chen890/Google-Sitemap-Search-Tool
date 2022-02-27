javascript: void((function() {
    CNAME = prompt('Enter CNAME code (e.g. https://xxxx-researchmanagement.esploro.exlibrisgroup.com):', '');
    MMS_ID = prompt('Enter MMSID code (e.g. 9921970125301340', '');
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

    class SitemapExtractor {
        static locations; // Getting <loc> tags
        static sitemaps;  //The sitemaps
      
        static async getLocations(url) {
          const result = await axios.get(url);
          const parsedSitemap = await xml2json.parseStringPromise(result.data);
          SitemapExtractor.locations = parsedSitemap;
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
          await SitemapExtractor.getLocations(url);
          SitemapExtractor.extractSitemaps();
          SitemapExtractor.mapAndSortSitemaps();
          return this.sitemaps;
        }
      
        static get Sitemaps() {
          return SitemapExtractor.sitemaps;
        }
      }

      
      SitemapExtractor.extract(CNAME).then((sitemap) => {
        axios.get(sitemap[0]).then(res => {
          xml2json.parseString(res.data, (err, result) => {
            const shorter = result.urlset.url.map(record => record.loc[0]).map(uri => uri.replace('https://', ''));     //Removes the HTTPS 
            const MMSID = (shorter.map(url => url.split('/').slice(-1)).flat(Infinity)).map(Number);                    //Pulling the MMSIDs to array
            //console.log(MMSID)
            const findMMS = MMSID.find(element => element==MMS_ID);
      
          })
        })
      });


    window.open(findMMS)
    })());
