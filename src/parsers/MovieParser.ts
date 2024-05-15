import { GM_xmlhttpRequest, unsafeWindow } from "$";
import Movie from "@/domains/Movie";
import MovieDetails from "@/domains/MovieDetails";
import Tag from "@/domains/Tag";

const SELECTOR = "div.masonry#waterfall div.item.masonry-brick a.movie-box";

class MovieParser {
  async parseMovies(): Promise<Movie[]> {
    const movies: Movie[] = [];
    const movieBoxes: NodeListOf<HTMLAnchorElement> = unsafeWindow.document.querySelectorAll(SELECTOR);
    movieBoxes.forEach(box => {
      const url = box.href;
      
      const frameElement: HTMLImageElement | null = box.querySelector('div.photo-frame img');
      if (frameElement == null) {
        return;
      }
      const cover = frameElement.src;
      const title = frameElement.title;

      const infoElement: HTMLSpanElement | null = box.querySelector('div.photo-info span');
      if (infoElement == null) {
        return;
      }

      const buttons: NodeListOf<HTMLButtonElement> = infoElement.querySelectorAll("div.item-tag button");
      const tags: Tag[] = [];
      buttons.forEach(btn => {
        const types = btn.className;
        const typeList = types.split(" ");
        let type = '';
        if (typeList.length >= 3) {
          type = typeList[2].substring(4);
        }
        const description = btn.title;
        const title = btn.innerText;
        tags.push({
          type,
          description,
          title,
        });
      });

      const dates: NodeListOf<HTMLElement> = infoElement.querySelectorAll("date");

      const id = dates[0].innerText;
      const releaseDate = dates[1].innerText;

      const movie = {
        id,
        url,
        cover,
        title,
        releaseDate,
        tags,
      };
      movies.push(movie);
    });
    return movies;
  }

  async parseMovieDetailsFromDocument(id: string, doc: Document): Promise<MovieDetails | null> {
    const coverElement: HTMLImageElement | null = doc.querySelector('.screencap a img');
    if (coverElement == null) return null;
    const details: MovieDetails = {
      id,
      cover: coverElement.src,
    };
    
    const infoParagraphs: NodeListOf<HTMLParagraphElement> = doc.querySelectorAll(".info p")
    infoParagraphs.forEach(p => {
      const headerNode: HTMLSpanElement | null = p.querySelector('span.header');
      if (p.className == '' && headerNode != null) {
        const header = headerNode.innerText;
        const nextSibling: Element | null = headerNode.nextElementSibling;
        // @ts-ignore
        const nextSiblingText = nextSibling?.innerText;
        switch (header) {
          case '識別碼:':
          case 'ID:':
            break;
          case '發行日期:':
          case 'Release Date:':
            break;
          case '長度:':
          case 'Length:':
            // @ts-ignore
            const length = p.childNodes[1].nodeValue?.trim();
            console.info("读取到影片长度：", length);
            details.length = length;
            break;
          case '製作商:':
          case 'Studio:':
            console.info("读取到制作商（studio）：", nextSiblingText);
            details.studio = nextSiblingText;
            break;
          case '發行商:':
            console.info("读取到发行商（publisher）：", nextSiblingText);
            details.publisher = nextSiblingText;
            break;
          case '系列:':
          case 'Series:':
            console.info("读取到系列（series）：", nextSiblingText);
            details.series = nextSiblingText;
            break;
          case '導演:':
            console.info("读取到导演（director）：", nextSiblingText);
            details.director = nextSiblingText;
            break;
          default:
            console.warn(`读取到未识别header：${header}`);
            break;
        }
      }
      
      if (p.className === 'header' && p.innerText === '類別:') {
        console.info("读取到类别（genre）");
      }

      if (p.className === 'star-show' && p.innerText === '演員:') {
        console.info("读取到演员（actress）");
      }
    });

    return details;
  }

  async parseMovieDetails(id: string, url: string): Promise<MovieDetails | null> {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest<unknown, 'document'>({
        method: 'get',
        url,
        responseType: 'document',
        onload: (event) => {
          const doc = event.response;
          console.info(`获取到 ${url} 页面文档`, doc);
          const details = this.parseMovieDetailsFromDocument(id, doc);
          resolve(details);
        },
      });
    });
  }
}

export default MovieParser;

export const movieParser = new MovieParser();
