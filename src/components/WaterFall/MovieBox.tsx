const classes = ['item', 'masonry-brick'];

type MovieInfo = {
  bango: string;
  url: string;
  cover: string;
  title: string;
  releaseDate: string;
  tags?: Tag[];
};

type Tag = {
  type: ButtonType;
  description: string;
  title: string;
}

enum ButtonType {
  Primary = "primary",
  Success = "success",
}

type Props = {
  movie: MovieInfo;
};

const MovieBox: React.FC<Props> = ({movie}) => {
  const { bango, url, cover, title, releaseDate, tags = [] } = movie;

  const tagNodes: React.ReactNode[] = tags.map(tag => (
    <ItemTag {...tag} />
  ));

  return (
    <div className={classes.join(' ')}>
      <a className="movie-box" href={url}>
        <div className="photo-frame">
          <img
            src={cover}
            title={title}
          />
        </div>
        <div className="photo-info">
          <span>
            {title}
            <br />
            <div className="item-tag">
              { tagNodes }
            </div>
            <date>{bango}</date> / 
            <date>{releaseDate}</date>
          </span>
        </div>
      </a>
    </div>
  );
};

type ItemTagProps = Tag;

const ItemTag: React.FC<ItemTagProps> = ({type, description, title}) => {
  return (
    <button 
      className={['btn', 'btn-xs', `btn-${type}`].join(' ')}
      disabled
      title={description}
    >
      { title }
    </button>
  );
};
