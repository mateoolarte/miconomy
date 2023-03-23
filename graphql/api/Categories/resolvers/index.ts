import { categoriesResolver } from './categories';
import { updateCategoryResolver } from './updateCategory';
import { createCategoryResolver } from './createCategory';

export const Category = {
  getCategories: categoriesResolver,
  updateCategory: updateCategoryResolver,
  createCategory: createCategoryResolver,
};
