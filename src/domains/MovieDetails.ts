type MovieDetails = {
  id: string;
  cover: string;
  length?: string;
  studio?: string;
  publisher?: string;
  series?: string;
  director?: string;
  genreList?: Genre[];
  actressList?: Actress[];
};

type Genre = {
  name: string;
  url: string;
};

type Actress = {
  name: string;
  url: string;
};

export default MovieDetails;
