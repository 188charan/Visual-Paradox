/**
 * GROQ queries. Image fields are projected with their alt/caption/orientation/
 * order so `toGalleryImage` can map them. Category references are dereferenced
 * to their slug so the frontend's Project.category (a slug string) is preserved.
 */

const IMAGE = `{ asset, alt, caption, orientation, order }`;

export const categoriesQuery = `*[_type == "category"] | order(order asc){
  name,
  "slug": slug.current,
  description,
  heroImage ${IMAGE},
  hoverImage ${IMAGE},
  featured,
  order,
  seoTitle,
  seoDescription
}`;

export const categoryQuery = `*[_type == "category" && slug.current == $slug][0]{
  name,
  "slug": slug.current,
  description,
  heroImage ${IMAGE},
  hoverImage ${IMAGE},
  featured,
  order,
  seoTitle,
  seoDescription
}`;

const PROJECT_PROJECTION = `{
  title,
  "slug": slug.current,
  "category": category->slug.current,
  description,
  location,
  year,
  coverImage ${IMAGE},
  gallery[] ${IMAGE},
  tags,
  featured,
  order,
  seoTitle,
  seoDescription
}`;

export const projectsQuery = `*[_type == "project"] | order(order asc) ${PROJECT_PROJECTION}`;

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(order asc) ${PROJECT_PROJECTION}`;

export const projectsByCategoryQuery = `*[_type == "project" && category->slug.current == $slug] | order(order asc) ${PROJECT_PROJECTION}`;

export const projectQuery = `*[_type == "project" && category->slug.current == $category && slug.current == $project][0] ${PROJECT_PROJECTION}`;
