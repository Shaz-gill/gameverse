import Genre from "./Genre";
import Platform from "./Platform";
import Publishers from "./Publishers";

export default interface Game {
  id: number;
  name: string;
  slug: string;
  genres: Genre[];
  publishers: Publishers[];
  description_raw: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
  released?: string;
  website?: string;
  rating?: number;
  ratings_count?: number;
  playtime?: number;
  esrb_rating?: { id: number; name: string } | null;
  developers?: { id: number; name: string }[];
  tags?: { id: number; name: string; language: string }[];
  stores?: { id: number; url?: string; store: { id: number; name: string; domain?: string } }[];
}
