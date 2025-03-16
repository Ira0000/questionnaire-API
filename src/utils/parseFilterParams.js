const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;

  const isType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isType(type)) return type;
};

const parseisFavourite = (favourite) => {
  const isString = typeof favourite === 'string';
  if (!isString) return;

  const isFavorite = (favourite) => ['true', 'false'].includes(favourite);

  if (isFavorite(favourite)) return favourite;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedFavourite = parseisFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedFavourite,
  };
};
