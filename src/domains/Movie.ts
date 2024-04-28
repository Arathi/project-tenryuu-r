import Tag from './Tag';

type Movie = {
  id: string;
  url: string;
  cover: string;
  title: string;
  releaseDate: string;
  tags?: Tag[];
};

export default Movie;
