import puppeteer from 'puppeteer';

async function traerImagen(url,nI) {
  let browser, page;

  try {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 500 });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForSelector('div.x1nhvcw1', {timeout: 6000});

    const image = await page.evaluate(() => {
      const getImage = document.querySelector('.x1nhvcw1 > img').getAttribute('src');
      return getImage
    });

    console.log(image);
  } catch (error) {
    console.log(error.message);
  } finally {
    if (browser) {
      await browser.close();
      console.log("closing browser");
    }
  }
}

  traerImagen('https://www.facebook.com/Americadecalisad/photos/?ref=page_internal',3);

  export default traerImagen