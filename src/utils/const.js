export const sorts = [
  { title: 'product_featured', query: 'name_asc' },
  { title: 'product_new_arrials', query: 'created_date_asc' },
  { title: 'product_low_to_high', query: 'price_asc' },
  { title: 'product_high_to_low', query: 'price_desc' },
  { title: 'product_top_rated', query: 'star_desc' },
];

export const priceFilters = [
  {
    id: 1,
    priceMin: 0,
    priceMax: 199000,
    label: 'Under 199.000 VND',
  },
  {
    id: 2,
    priceMin: 199000,
    priceMax: 299000,
    label: '199.000 VND - 299.000 VND',
  },
  {
    id: 3,
    priceMin: 299000,
    priceMax: 399000,
    label: '299.000 VND - 399.000 VND',
  },
  {
    id: 4,
    priceMin: 399000,
    priceMax: 499000,
    label: '399.000 VND - 499.000 VND',
  },
  {
    id: 5,
    priceMin: 499000,
    priceMax: 799000,
    label: '499.000 VND - 799.000 VND',
  },
  {
    id: 6,
    priceMin: 799000,
    priceMax: 999000,
    label: '799.000 VND - 999.000 VND',
  },
  {
    id: 7,
    priceMin: 999000,
    priceMax: null,
    label: 'Over 999.000 VND',
  },
];
