import { ALL_PERSONS } from "../queries";

export const addPersonToCache = (cache, personToAdd) => {
  cache.updateQuery({ query: ALL_PERSONS }, (data) => {
    if (!data) {
      return;
    }

    const personExists = data.allPersons.some(
      (person) => person.id === personToAdd.id,
    );

    if (personExists) {
      return { allPersons: data.allPersons };
    }

    return {
      allPersons: data.allPersons.concat(personToAdd),
    };
  });
};
