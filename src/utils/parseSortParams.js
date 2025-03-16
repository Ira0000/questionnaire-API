const parseSortOrder = (sortOrder) => {
  const isKnownOrder = ['asc', 'desc'].includes(sortOrder);
  if (isKnownOrder) return sortOrder;
  return 'asc';
};

const parseSortBy = (sortBy) => {
  const keysOfQuestionnaire = [
    '_id',
    'name',
    'questionsNumber',
    'completionsNumber',
  ];

  if (keysOfQuestionnaire.includes(sortBy)) {
    return sortBy;
  }

  return '_id';
};

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
