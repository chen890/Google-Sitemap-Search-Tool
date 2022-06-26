#  Google Sitemap Search Tool
// Extract and find MMSID in customers sitemaps



This is a Google Sitemap Search Tool for publishing Esploro assets and researchers profiles sitemaps to Google Scholar.

Note: You should have Node.JS installed. Node JS official site: https://nodejs.org/en/
<br>Run<br>
npm install <br>
npm start <br>
<br>
Follow the CLI instructions:<br>
* The URL should be https://XXXXXX.exploro.exlibrisgroup.com/view/google/ResearchAsset/siteindex.xml. <br>
* Identifier (Asset ID or Researcher URL identifier)

![image](https://user-images.githubusercontent.com/53993504/175809165-f561574c-238c-4273-a676-f56a6d1ec007.png)<br>
The script will check if the MMSID is found in the sitemap of the institution.

NOTE: the sitemap is refreshing every week. Therefore, you can get undefined or no results, and the MMSID was already published.

